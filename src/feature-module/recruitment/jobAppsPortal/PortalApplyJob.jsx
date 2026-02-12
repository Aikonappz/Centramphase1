import React from "react";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import "./PortalApplyJob.scss";
import { useLocation } from "react-router-dom";
import { fetchPostedJobDetails } from '../../../core/data/redux/actions/postJobActions'
import { useAppDispatch } from '../../../core/data/redux/store'
import JobPostAlertModal from '../../../core/modals/postJobAlertModal'

export default function PortalApplyJob() {
    const isClickScrolling = useRef(false);
    const location = useLocation();
    const jobId = location.state?.jobId;
    const jobTitle = location.state?.jobTitle;
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const dispatch = useAppDispatch();

    const sections = [
        { id: "import", label: "Import Your Profile" },
        { id: "general", label: "General Information" },
        { id: "gender", label: "Gender and Marital Status" },
        { id: "address", label: "Address" },
        { id: "disability", label: "Disability Information" },
        { id: "questions", label: "Application Questions" },
        { id: "work", label: "Work and Education History" },
        { id: "licenses", label: "Licenses and Certificates" },
        { id: "languages", label: "Languages" },
        { id: "documents", label: "Supporting Documents and URLs" },
        { id: "source", label: "Source of Hire Information" },
        { id: "signature", label: "E-Signature" },
    ];


    const [active, setActive] = useState("import");
    const formRef = useRef(null);

    // useEffect(() => {
    //     const container = formRef.current;
    //     if (!container) return;

    //     const observer = new IntersectionObserver(
    //         (entries) => {
    //             entries.forEach((entry) => {
    //                 // if (entry.isIntersecting) {
    //                 if (entry.isIntersecting && !isClickScrolling.current) {
    //                     setActive(entry.target.id);
    //                 }
    //             });
    //         },
    //         {
    //             root: container,
    //             threshold: 0.4,
    //         }
    //     );

    //     sections.forEach((s) => {
    //         const el = document.getElementById(s.id);
    //         if (el) observer.observe(el);
    //     });

    //     // 🔥 FIX: bottom scroll detection
    //     const handleScroll = () => {
    //         const { scrollTop, scrollHeight, clientHeight } = container;

    //         if (scrollTop + clientHeight >= scrollHeight - 5) {
    //             setActive("signature"); // last section id
    //         }
    //     };

    //     container.addEventListener("scroll", handleScroll);

    //     return () => {
    //         observer.disconnect();
    //         container.removeEventListener("scroll", handleScroll);
    //     };
    // }, []);


    // const scrollToSection = (id) => {
    //     const el = document.getElementById(id);
    //     if (!el || !formRef.current) return;

    //     formRef.current.scrollTo({
    //         top: el.offsetTop - 20,
    //         behavior: "smooth",
    //     });

    //     setActive(id);
    // };
    useEffect(() => {
        const container = formRef.current;
        if (!container) return;

        const handleScroll = () => {
            if (isClickScrolling.current) return;

            let closestSection = null;
            let closestDistance = Infinity;

            sections.forEach(({ id }) => {
                const el = document.getElementById(id);
                if (!el) return;

                const distance = Math.abs(el.offsetTop - container.scrollTop);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestSection = id;
                }
            });

            if (closestSection) {
                setActive(closestSection);
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (!el || !formRef.current) return;

        isClickScrolling.current = true; // 🔒 lock observer
        setActive(id);                  // 🎯 force highlight

        formRef.current.scrollTo({
            top: el.offsetTop - 20,
            behavior: "smooth",
        });

        // 🔓 unlock observer after scroll ends
        setTimeout(() => {
            isClickScrolling.current = false;
        }, 500);
    };

    const [answers, setAnswers] = useState({
        declaration: null,
        workPermit: null,
    });

    const handleToggle = (field, value) => {
        setAnswers(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const [resume, setResume] = useState([]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const maxSize = 5 * 1024 * 1024; // 5MB

        if (file.size > maxSize) {
            // alert("Resume size must be under 5 MB");
            setAlertMessage("Resume size must be under 5 MB.");
            setShowAlertModal(true);
            e.target.value = "";
            return;
        }

        setResume([file]);
    };


    return (
        <div className="apply-wrapper">
            {/* LEFT CONTENT */}
            <div className="apply-form" ref={formRef}>
                <div className="form-inner">
                    <div className="job-header">
                        <h1>{jobTitle}</h1>
                        <p>Job ID: JOB-2024-001</p>
                    </div>
                    <section id="import">
                        <h2>Import Your Profile</h2>
                        <div className="upload-box">
                            <input type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                            />
                            <p>Upload Resume (PDF)</p>
                        </div>
                    </section>

                    <section id="general">
                        <h2>General Information</h2>
                        <div className="portal_applyjob_row">
                            <label>First Name</label>
                            <input placeholder="First Name *" />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>Middle Name</label>
                            <input placeholder="Middle Name *" />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>Last Name</label>
                            <input placeholder="Last Name" />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>Email Address</label>
                            <input placeholder="Email Address" />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>Phone Number</label>
                            <input placeholder="Phone Number *" />
                        </div>
                    </section>

                    <section id="gender">
                        <h2>Gender and Marital Status</h2>
                        <div className="portal_applyjob_row">
                            <label>Gender</label>
                            <select>
                                <option>--Select--</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="portal_applyjob_row">
                            <label>Marital Status</label>
                            <select>
                                <option>--Select--</option>
                                <option>Single</option>
                                <option>Married</option>
                                <option>Separated</option>
                                <option>Divorced</option>
                                <option>Widowed</option>
                                <option>Do not wish to disclose</option>
                            </select>
                        </div>
                    </section>

                    <section id="address">
                        <h2>Address</h2>
                        <div className="portal_applyjob_row">
                            <label>Country</label>
                            <select>
                                <option>--Select--</option>
                                <option>India</option>
                            </select>
                        </div>
                        <div className="portal_applyjob_row">
                            <label>Address Line 1</label>
                            <input placeholder="Address" />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>Address Line 2</label>
                            <input placeholder="Address" />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>City or Town</label>
                            <input placeholder="City or Town" />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>Pin Code</label>
                            <input placeholder="Pin Code" />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>State</label>
                            <input placeholder="State" />
                        </div>
                    </section>

                    <section id="disability">
                        <h2>Disability Information</h2>
                        <div className="portal_applyjob_row">
                            <label>Category</label>
                            <select>
                                <option>--Select--</option>
                                <option>Locomotor disability - Leprosy cured person</option>
                                <option>Locomotor disability - Muscular dystrophy</option>
                                <option>Disabilities from blood disorder - Sickle cell disease</option>
                            </select>
                        </div>
                    </section>

                    <section id="questions">
                        <h2>Application Questions</h2>
                        <div className="portal_applyjob_row">
                            <label>I hereby declare that I have accurately updated all my education history and my professional experience(s) and I understand that this will reflect in my records. </label>
                            <div className="toggle-group">
                                {["Yes", "No"].map(option => (
                                    <button
                                        key={option}
                                        type="button"
                                        className={`toggle-btn ${answers.declaration === option ? "active" : ""
                                            }`}
                                        onClick={() => handleToggle("declaration", option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="portal_applyjob_row">
                            <label>Do you have permit to work in India. </label>
                            <div className="toggle-group">
                                {["Yes", "No"].map(option => (
                                    <button
                                        key={option}
                                        type="button"
                                        className={`toggle-btn ${answers.workPermit === option ? "active" : ""
                                            }`}
                                        onClick={() => handleToggle("workPermit", option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="portal_applyjob_row">
                            <label>What is your Preferred Location(s), in order as per preference.</label>
                            <input />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>What is your Current Location?</label>
                            <input />
                        </div>
                    </section>

                    <section id="work">
                        <h2>Work and Education History</h2>
                        <div className="portal_applyjob_row">
                            <label>Degree</label>
                            <select>
                                <option>--Select--</option>
                                <option>Bachelor Of Engineering</option>
                                <option>Bachelor of Business</option>
                                <option>Bachelor in Accounting and Finance</option>
                            </select>
                        </div>
                        <div className="portal_applyjob_row">
                            <label>Major</label>
                            <input />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>School Name</label>
                            <input />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>End Date</label>
                            <input type="Date" />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>Education Level</label>
                            <select>
                                <option>--Select--</option>
                                <option>Graduation</option>
                                <option>Post Graduation</option>
                                <option>Others</option>
                            </select>
                        </div>
                    </section>

                    <section id="licenses">
                        <h2>Licenses and Certificates</h2>
                        <div className="portal_applyjob_row">
                            <label>Degree</label>
                            <select>
                                <option>--Select--</option>
                                <option>Bachelor Of Engineering</option>
                                <option>Bachelor of Business</option>
                                <option>Bachelor in Accounting and Finance</option>
                            </select>
                        </div>
                        <div className="portal_applyjob_row">
                            <label>Major</label>
                            <input />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>School Name</label>
                            <input />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>End Date</label>
                            <input type="Date" />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>Education Level</label>
                            <select>
                                <option>--Select--</option>
                                <option>Graduation</option>
                                <option>Post Graduation</option>
                                <option>Others</option>
                            </select>
                        </div>
                    </section>

                    <section id="languages">
                        <h2>Languages</h2>
                        <div className="portal_applyjob_row">
                            <label>Degree</label>
                            <select>
                                <option>--Select--</option>
                                <option>Bachelor Of Engineering</option>
                                <option>Bachelor of Business</option>
                                <option>Bachelor in Accounting and Finance</option>
                            </select>
                        </div>
                        <div className="portal_applyjob_row">
                            <label>Major</label>
                            <input />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>School Name</label>
                            <input />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>End Date</label>
                            <input type="Date" />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>Education Level</label>
                            <select>
                                <option>--Select--</option>
                                <option>Graduation</option>
                                <option>Post Graduation</option>
                                <option>Others</option>
                            </select>
                        </div>
                    </section>

                    <section id="documents">
                        <h2>Supporting Documents and URLs</h2>
                        <div className="portal_applyjob_row">
                            <label>Degree</label>
                            <select>
                                <option>--Select--</option>
                                <option>Bachelor Of Engineering</option>
                                <option>Bachelor of Business</option>
                                <option>Bachelor in Accounting and Finance</option>
                            </select>
                        </div>
                        <div className="portal_applyjob_row">
                            <label>Major</label>
                            <input />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>School Name</label>
                            <input />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>End Date</label>
                            <input type="Date" />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>Education Level</label>
                            <select>
                                <option>--Select--</option>
                                <option>Graduation</option>
                                <option>Post Graduation</option>
                                <option>Others</option>
                            </select>
                        </div>
                    </section>

                    <section id="source">
                        <h2>Source of Hire Information</h2>
                        <div className="portal_applyjob_row">
                            <label>Degree</label>
                            <select>
                                <option>--Select--</option>
                                <option>Bachelor Of Engineering</option>
                                <option>Bachelor of Business</option>
                                <option>Bachelor in Accounting and Finance</option>
                            </select>
                        </div>
                        <div className="portal_applyjob_row">
                            <label>Major</label>
                            <input />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>School Name</label>
                            <input />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>End Date</label>
                            <input type="Date" />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>Education Level</label>
                            <select>
                                <option>--Select--</option>
                                <option>Graduation</option>
                                <option>Post Graduation</option>
                                <option>Others</option>
                            </select>
                        </div>
                    </section>

                    <section id="signature">
                        <h2>E-Signature</h2>
                        <input placeholder="Type your full name" />
                        <div className="portal_applyjob_row">
                            <label>Degree</label>
                            <select>
                                <option>--Select--</option>
                                <option>Bachelor Of Engineering</option>
                                <option>Bachelor of Business</option>
                                <option>Bachelor in Accounting and Finance</option>
                            </select>
                        </div>
                        <div className="portal_applyjob_row">
                            <label>Major</label>
                            <input />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>School Name</label>
                            <input />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>End Date</label>
                            <input type="Date" />
                        </div>
                        <div className="portal_applyjob_row">
                            <label>Education Level</label>
                            <select>
                                <option>--Select--</option>
                                <option>Graduation</option>
                                <option>Post Graduation</option>
                                <option>Others</option>
                            </select>
                        </div>
                    </section>

                    <button className="apply-btn">Submit Application</button>
                </div>
            </div>

            {/* RIGHT SIDE STEPS */}
            <div className="apply-steps">
                <ul>
                    {sections.map(s => (
                        <li
                            key={s.id}
                            className={active === s.id ? "active" : ""}
                            onClick={() => scrollToSection(s.id)}
                        >
                            {s.label}
                        </li>
                    ))}
                </ul>
            </div>

            {showAlertModal && (
                <JobPostAlertModal
                    message={alertMessage}
                    onClose={() => setShowAlertModal(false)}
                />
            )}
        </div>
    );
}
