import React from "react";

type Props = {
    onClose: () => void;
    job: {
        title: string;
        locations: string[];
        refCode: string;
        postedOn: string;
        experienceLevel: string;
        contractType: string;
        businessUnit: string;
        brand: string;
        description: string;
        profile: string[];
        preferred: string[];
        perks: string[];
        aboutCompany: string;
    };
};

const JobPreviewModal: React.FC<Props> = ({ onClose, job }) => {
    return (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
            <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content bg-dark text-light rounded-4">

                    {/* Header */}
                    <div className="modal-header border-secondary">
                        <div>
                            <h3 className="mb-1 text-info fw-semibold">
                                {job.title}
                            </h3>
                            <small className="text-muted">
                                {job.locations.join(", ")}
                            </small>
                        </div>
                        <button className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>

                    {/* Body */}
                    <div className="modal-body">
                        <div className="row">

                            {/* LEFT CONTENT */}
                            <div
                                className="col-md-8 pe-md-4"
                                style={{
                                    maxHeight: "70vh",
                                    overflowY: "auto",
                                    paddingRight: "12px"
                                }}
                            >
                                <section className="mb-5">
                                    <h5 className="text-info">Job Description</h5>
                                    <p>{job.description}</p>
                                </section>

                                <section className="mb-5">
                                    <h5 className="text-info">Your Profile</h5>
                                    <ul>
                                        {job.profile.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </section>

                                <section className="mb-5">
                                    <h5 className="text-info">Preferred Skills</h5>
                                    <ul>
                                        {job.preferred.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </section>

                                <section className="mb-5">
                                    <h5 className="text-info">What You’ll Love Here</h5>
                                    <ul>
                                        {job.perks.map((perk, i) => (
                                            <li key={i}>{perk}</li>
                                        ))}
                                    </ul>
                                </section>

                                <section>
                                    <h5 className="text-info">About {job.brand}</h5>
                                    <p>{job.aboutCompany}</p>
                                </section>
                            </div>

                            {/* RIGHT SIDEBAR */}
                            <div className="col-md-4">
                                <div className="bg-secondary bg-opacity-10 rounded-3 p-3 sticky-top" style={{ top: 20 }}>
                                    <p><strong>Ref Code:</strong> {job.refCode}</p>
                                    <p><strong>Posted On:</strong> {job.postedOn}</p>
                                    <p><strong>Experience:</strong> {job.experienceLevel}</p>
                                    <p><strong>Contract:</strong> {job.contractType}</p>
                                    <p><strong>Business Unit:</strong> {job.businessUnit}</p>
                                    <p><strong>Brand:</strong> {job.brand}</p>

                                    {/* <button className="btn btn-primary w-100 mt-3">
                                        Apply Now →
                                    </button> */}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Footer */}
                    <div className="modal-footer border-secondary">
                        <button className="btn btn-outline-light" onClick={onClose}>
                            Close Preview
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default JobPreviewModal;
