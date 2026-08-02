import React, { useEffect, useRef } from 'react'
import { all_routes } from '../../router/all_routes'
import { Link } from 'react-router-dom'
import PredefinedDateRanges from '../../../core/common/datePicker'
import ImageWithBasePath from '../../../core/common/imageWithBasePath'
import { DatePicker } from "antd";
import CommonSelect from '../../../core/common/commonSelect'
import CollapseHeader from '../../../core/common/collapse-header/collapse-header'
import { RootState, useAppDispatch } from '../../../core/data/redux/store'
import { getBusinessUnit, getDepartmentLists, getDivision, getJobLists, getPositions, postJob, resetJobById } from '../../../core/data/redux/actions/requisitionActions'
import { postJobportal, fetchPostedJobDetails, updateJobportal } from '../../../core/data/redux/actions/postJobActions'
import { useSelector } from 'react-redux'
import { transformArrayToLabelValue } from '../../../utils/misc'
import PostJobModal from '../create/CreateRequisition';
import CardGridSkeleton from '../../../components/CardGridSkeleton';
import { useNavigate } from "react-router";
import JobPostingModal from "../../../core/modals/postJobModal";
import PostJobMainModal from '../../../core/modals/postJobMainModal';
import moment from "moment";
import JobPostAlertModal from '../../../core/modals/postJobAlertModal'
import PostingReviewModal from '../../../core/modals/PostingReviewModal'

type PostJobData = {
    jobPortalCareerSite: string;
    jobPortalPostingStartDate: string;
    jobPortalPostingEndDate: string;
    repostAfterExpiration: boolean;
};

const JobGrid = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = React.useState(false);
    const [selectedJobId, setSelectedJobId] = React.useState(null);
    const [showPostJobMainModal, setShowPostJobMainModal] = React.useState(false);
    const [postJobMode, setPostJobMode] = React.useState<"CREATE" | "EDIT">("CREATE");
    const [postJobInitialData, setPostJobInitialData] = React.useState<any>(null);
    const [showAlertModal, setShowAlertModal] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    const [showPostingReview, setShowPostingReview] = React.useState(false);
    const [showJobPreview, setShowJobPreview] = React.useState(false);
    const [selectedPostType, setSelectedPostType] =
        React.useState<"INTERNAL" | "EXTERNAL" | "AGENT" | null>(null);



    const jobs: any = useSelector((state: RootState) => state.jobs) || [];

    const [isLoading, setIsLoading] = React.useState<any>(jobs.loading);
    const [jobData, setJobData] = React.useState<any>({});

    useEffect(() => {
        getJobs();
        dispatch(resetJobById());
    }, [dispatch]);

    const getJobs = async () => {
        setIsLoading(true);
        await dispatch(getJobLists());
        setIsLoading(false);
    }

    const handleJobDetails = (jobId: any) => {
        localStorage.setItem('requisitionId', jobId);
    }

    const handleClick = (e: React.MouseEvent, jobId: any) => {
        e.preventDefault();

        setSelectedJobId(jobId);
        setShowModal(true);
    };

    const handlePostJob = async () => {
        setShowModal(false);
        try {
            const response: any = await dispatch(
                fetchPostedJobDetails(Number(selectedJobId))
            );
            const postingStatus = response?.data.postingStatus;
            // 🚫 BLOCK if already posted
            if (postingStatus === "POSTED") {
                setAlertMessage(
                    "This job has already been posted. Please edit the posting if changes are required."
                );
                setShowAlertModal(true);
                return;
            }
            // ✅ ALLOW post job modal
            setPostJobMode("CREATE");
            setPostJobInitialData(null);
            setShowPostJobMainModal(true);
        } catch (error) {
            // ✅ No existing post → allow create
            setPostJobMode("CREATE");
            setPostJobInitialData(null);
            setShowPostJobMainModal(true);
        }
    };

    const mapApiToFormData = (data: any) => {
        return {
            jobPortalCareerSite: data.jobPortalCareerSite ?? "",
            jobPortalPostingStartDate: data.jobPortalPostingStartDate
                ? moment(data.jobPortalPostingStartDate).format("YYYY-MM-DD")
                : "",
            jobPortalPostingEndDate: data.jobPortalPostingEndDate
                ? moment(data.jobPortalPostingEndDate).format("YYYY-MM-DD")
                : "",
            repostAfterExpiration: data.repostAfterExpiration ?? false,
        };
    };


    const handleEditJob = async () => {
        setShowModal(false);

        try {
            const response = await dispatch(fetchPostedJobDetails(Number(selectedJobId)));
            const postingStatus = response?.data.postingStatus;
            // 🚫 BLOCK if already posted
            if (postingStatus === "POSTED") {
                setPostJobMode("EDIT");
                setShowPostJobMainModal(true);
                const mappedData = mapApiToFormData(response.data);
                setPostJobInitialData(mappedData);
            } else if (postingStatus !== "POSTED") {
                setAlertMessage(
                    "Job was not posted yet. Please post the job first."
                );
                setShowAlertModal(true);
                return;
            }
        } catch (error) {
            alert("Failed to load job posting details");
        }
    };

    const handlePreviewJob = async () => {
        setShowPostingReview(true);
    };


    const handlePostJobSubmit = async (formData: PostJobData) => {
        try {
            const payload = {
                requisitionId: Number(selectedJobId),
                jobPortalCareerSite: formData.jobPortalCareerSite,
                jobPortalPostingStartDate: formData.jobPortalPostingStartDate
                    ? moment(formData.jobPortalPostingStartDate).format("YYYY-MM-DD")
                    : moment().format("YYYY-MM-DD"),
                jobPortalPostingEndDate: formData.jobPortalPostingEndDate
                    ? moment(formData.jobPortalPostingEndDate).format("YYYY-MM-DD")
                    : moment().format("YYYY-MM-DD"),
                repostAfterExpiration: formData.repostAfterExpiration,
            };

            const update_payload = {
                requisitionId: Number(selectedJobId),
                postingBoard: formData.jobPortalCareerSite,
                postingStartDate: formData.jobPortalPostingStartDate,
                postingEndDate: formData.jobPortalPostingEndDate,
                repostAfterExpiry: formData.repostAfterExpiration,
            };

            let response: any;
            let response_update: any;

            if (postJobMode === "CREATE") {
                response = await dispatch(postJobportal(payload));
            } else {
                // response = await dispatch(updateJobportal(payload));
                response_update = await dispatch(updateJobportal(payload));
            }

            // ✅ success check (safer)
            if (response && (response.status === 200 || response.data)) {
                setShowPostJobMainModal(false);
                window.open("/job-portal");
            }
            if (response_update.status === 200) {
                setShowPostJobMainModal(false);
                window.open("/job-portal");
            }
        } catch (error: any) {
            // const apiMessage =
            //     error?.response?.data?.message ||
            //     "Job already posted for this requisition";
            // alert(apiMessage);
        }
    };



    // const existingPostJobData = {
    //     careerSite: "Internal Portal",
    //     startDate: "2026-02-01",
    //     endDate: "2026-02-28",
    //     repostAfterExpiry: true,
    // };


    const postJobDetails = async (jobId: number) => {
        try {
            const response: any = await dispatch(postJobportal(jobId));
            if (response.status === 200) {
                setTimeout(() => {
                    window.open("/job-portal");
                }, 700);
            }
        } catch (error: any) {
            const apiMessage =
                error?.response?.data?.message ||
                "Job already posted for this requisition";
            alert(apiMessage); // ✅ BOOTSTRAP ALERT
        }
    };

    const loginRole = sessionStorage.getItem("login_role");

    return (
        <>
            {/* Page Wrapper */}
            <div className="page-wrapper">
                <div className="content">
                    {/* Breadcrumb */}
                    <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                        <div className="my-auto mb-2">
                            <h2 className="mb-1">Jobs</h2>
                            <nav>
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        <Link to={all_routes.adminDashboard}>
                                            <i className="ti ti-smart-home" />
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item">Administration</li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Jobs
                                    </li>
                                </ol>
                            </nav>
                        </div>
                        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap ">
                            <div className="me-2 mb-2">
                                <div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
                                    <Link to={all_routes.joblist} className="btn btn-icon btn-sm me-1">
                                        <i className="ti ti-list-tree" />
                                    </Link>
                                    <Link
                                        to={all_routes.jobgrid}
                                        className="btn btn-icon btn-sm active bg-primary text-white"
                                    >
                                        <i className="ti ti-layout-grid" />
                                    </Link>
                                </div>
                            </div>
                            <div className="me-2 mb-2">
                                <div className="dropdown">
                                    <Link
                                        to="#"
                                        className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                        data-bs-toggle="dropdown"
                                    >
                                        <i className="ti ti-file-export me-1" />
                                        Export
                                    </Link>
                                    <ul className="dropdown-menu  dropdown-menu-end p-3">
                                        <li>
                                            <Link
                                                to="#"
                                                className="dropdown-item rounded-1"
                                            >
                                                <i className="ti ti-file-type-pdf me-1" />
                                                Export as PDF
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="#"
                                                className="dropdown-item rounded-1"
                                            >
                                                <i className="ti ti-file-type-xls me-1" />
                                                Export as Excel{" "}
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* <div className="mb-2"> */}
                            <Link
                                to="/create/job-requisition"
                                className="btn btn-primary d-flex align-items-center btn-space"
                            >
                                <i className="ti ti-circle-plus me-2" />
                                Create via Position
                            </Link>
                            <Link
                                to="/create/job-blank-requisition"
                                className="btn btn-secondary-light d-flex align-items-center btn-space"
                            >
                                <i className="ti ti-circle-plus me-2" />
                                Create via blank template
                            </Link>
                            {/* <Link
                                to="/post/job-portal"
                                className="btn btn-job-portal d-flex align-items-center btn-space"
                            >
                                <i className="ti ti-bell-share me-2" />
                                Post to Job Portals
                            </Link> */}
                            <Link
                                to="/create/job-portal"
                                className="btn bg-info d-flex align-items-center"
                            >
                                Job Application Portal
                            </Link>
                            {/* </div> */}
                            <div className="head-icons ms-2">
                                <CollapseHeader />
                            </div>
                        </div>
                    </div>
                    {/* /Breadcrumb */}
                    <div className="card">
                        <div className="card-body p-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <h5>Requisition</h5>
                                <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                    <div className="me-3">
                                        <div className="input-icon-end position-relative">
                                            <PredefinedDateRanges />
                                            <span className="input-icon-addon">
                                                <i className="ti ti-chevron-down" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="dropdown me-3">
                                        <Link
                                            to="#"
                                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                            data-bs-toggle="dropdown"
                                        >
                                            Role
                                        </Link>
                                        <ul className="dropdown-menu  dropdown-menu-end p-3">
                                            <li>
                                                <Link
                                                    to="#"
                                                    className="dropdown-item rounded-1"
                                                >
                                                    Senior IOS Developer
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="#"
                                                    className="dropdown-item rounded-1"
                                                >
                                                    Junior PHP Developer
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="#"
                                                    className="dropdown-item rounded-1"
                                                >
                                                    Network Engineer
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="dropdown me-3">
                                        <Link
                                            to="#"
                                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                            data-bs-toggle="dropdown"
                                        >
                                            Status
                                        </Link>
                                        <ul className="dropdown-menu  dropdown-menu-end p-3">
                                            <li>
                                                <Link
                                                    to="#"
                                                    className="dropdown-item rounded-1"
                                                >
                                                    Active
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="#"
                                                    className="dropdown-item rounded-1"
                                                >
                                                    Inactive
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="dropdown">
                                        <Link
                                            to="#"
                                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                            data-bs-toggle="dropdown"
                                        >
                                            Sort By : Last 7 Days
                                        </Link>
                                        <ul className="dropdown-menu  dropdown-menu-end p-3">
                                            <li>
                                                <Link
                                                    to="#"
                                                    className="dropdown-item rounded-1"
                                                >
                                                    Recently Added
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="#"
                                                    className="dropdown-item rounded-1"
                                                >
                                                    Ascending
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="#"
                                                    className="dropdown-item rounded-1"
                                                >
                                                    Desending
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="#"
                                                    className="dropdown-item rounded-1"
                                                >
                                                    Last Month
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="#"
                                                    className="dropdown-item rounded-1"
                                                >
                                                    Last 7 Days
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {/* Job Card */}
                        {!isLoading ? jobs && jobs.jobList?.content.map((job: any) => (
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card bg-light">
                                            <div className="card-body p-3">
                                                <div className="d-flex align-items-center">
                                                    <Link to="#" className="me-2">
                                                        <span className="avatar avatar-lg bg-gray">
                                                            <ImageWithBasePath
                                                                src="assets/img/icons/apple.svg"
                                                                className="w-auto h-auto"
                                                                alt="icon"
                                                            />
                                                        </span>
                                                    </Link>
                                                    <div>
                                                        <h6 className="fw-medium mb-1 text-truncate" title={`${job.jobTitle}`}>
                                                            <Link to="/create/job-requisition" onClick={() => handleJobDetails(job.id)}>{job.jobTitle}</Link>
                                                        </h6>
                                                        <p className="fs-12 text-gray fw-normal">25 Applicants</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column mb-3">
                                            <p className="text-dark d-inline-flex align-items-center mb-2">
                                                <i className="ti ti-map-pin-check text-gray-5 me-2" />
                                                New York, USA
                                            </p>
                                            <p className="text-dark d-inline-flex align-items-center mb-2">
                                                <i className="ti ti-currency-dollar text-gray-5 me-2" />
                                                {`${job.payRangeMin}`} - {`${job.payRangeMax}`} / month
                                            </p>
                                            <p className="text-dark d-inline-flex align-items-center">
                                                <i className="ti ti-briefcase text-gray-5 me-2" />2 years of
                                                experience
                                            </p>
                                        </div>
                                        <div className="mb-3">
                                            <span className="badge badge-pink-transparent me-1">
                                                {job.fte}
                                            </span>
                                            <span className="badge bg-secondary-transparent">Expert</span>
                                        </div>
                                        <div className="progress progress-xs mb-2">
                                            <div
                                                className="progress-bar bg-warning"
                                                role="progressbar"
                                                style={{ width: "30%" }}
                                            />
                                        </div>
                                        <div>
                                            <p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
                                        </div>
                                        <div>
                                            {/* <Link
                                                to={job.finalStatus === "4" ? "#" : "#"}
                                                className={`btn btn-job-portal d-flex align-items-center btn-space ${job.finalStatus !== "4" ? "disabled-btn" : ""
                                                    }`}
                                            onClick={(e) => {
                                                if (job.finalStatus === "4") {
                                                    e.preventDefault();
                                                    postJobDetails(job.id)
                                                    // window.open("/job-portal")
                                                }
                                            }}
                                            >
                                                <i className="ti ti-bell-share me-2" />
                                                Job Posting
                                            </Link> */}

                                            {loginRole !== "HIRING_MANAGER" ?
                                                <Link
                                                    to="#"
                                                    onClick={(e) => handleClick(e, job.id)}
                                                    className={`btn btn-job-portal d-flex align-items-center btn-space ${job.finalStatus !== "4" ? "disabled-btn" : ""
                                                        }`}
                                                >
                                                    <i className="ti ti-bell-share me-2" />
                                                    Job Posting
                                                </Link>
                                                : ""}
                                        </div>
                                        <div>
                                            <Link
                                                to="/candidates-grid"
                                                className={`btn btn-applied d-flex align-items-center btn-space ${job.finalStatus !== "4" ? "disabled-btn" : ""
                                                    }`}
                                                onClick={(e) => {
                                                    if (job.finalStatus !== "4") {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                <i className="ti ti-users me-2" />
                                                Applied ({job.appliedCount || 7})
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )) : <CardGridSkeleton count={4} />}
                    </div>
                </div>
                <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
                    <p className="mb-0">2014 - 2025 © Centram.</p>
                    <p>
                        Designed &amp; Developed By{" "}
                        <Link to="#" className="text-primary">
                            Centram
                        </Link>
                    </p>
                </div>
                {showModal && (
                    <JobPostingModal
                        onClose={() => setShowModal(false)}
                        onPostJob={handlePostJob}
                        onEditJob={handleEditJob}
                        onPreviewJob={handlePreviewJob}
                    />
                )}
                {showPostJobMainModal && (
                    <PostJobMainModal
                        onClose={() => setShowPostJobMainModal(false)}
                        onSubmit={handlePostJobSubmit}
                        initialData={postJobInitialData}
                    />
                )}
                {showAlertModal && (
                    <JobPostAlertModal
                        message={alertMessage}
                        onClose={() => setShowAlertModal(false)}
                    />
                )}
                {showPostingReview && (
                    <PostingReviewModal
                        onClose={() => setShowPostingReview(false)}
                        onPreview={(type) => {
                            setSelectedPostType(type);
                            setShowPostingReview(false);
                            setShowJobPreview(true);
                        }}
                    />
                )}

            </div>
            {/* /Page Wrapper */}
            {/* Add Post */}
            {/* <div className="modal fade" id="add_post">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Post Job</h4>
                            <button
                                type="button"
                                className="btn-close custom-btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <i className="ti ti-x" />
                            </button>
                        </div>
                        <PostJobModal
                            requisitionStatus={requisitionStatus}
                            jobDepartment={jobDepartment}
                            jobposttype={jobposttype}
                            jobpostBoard={jobpostBoard}
                            jobtype={jobtype}
                            organisation={organisation}
                            businessUnit={businessUnit}
                            division={division}
                            jobLevel={jobLevel}
                            getModalContainer={getModalContainer}
                            country={country}
                            state={state}
                            city={city}
                        />
                    </div>
                </div>
            </div> */}
            {/* /Post Job */}
            {/* Add Job Success */}
            {/* <div className="modal fade" id="success_modal" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-xm">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="text-center p-3">
                                <span className="avatar avatar-lg avatar-rounded bg-success mb-3">
                                    <i className="ti ti-check fs-24" />
                                </span>
                                <h5 className="mb-2">Job Posted Successfully</h5>
                                <div>
                                    <div className="row g-2">
                                        <div className="col-12">
                                            <Link to={all_routes.jobgrid} data-bs-dismiss="modal" className="btn btn-dark w-100" onClick={() => getJobs()}>
                                                Back to List
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* /Add Client Success */}
            {/* Edit Post */}
            {/* <div className="modal fade" id="edit_post">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Job</h4>
                            <button
                                type="button"
                                className="btn-close custom-btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <i className="ti ti-x" />
                            </button>
                        </div>
                        <PostJobModal
                            requisitionStatus={requisitionStatus}
                            jobDepartment={jobDepartment}
                            jobposttype={jobposttype}
                            jobpostBoard={jobpostBoard}
                            jobtype={jobtype}
                            organisation={organisation}
                            businessUnit={businessUnit}
                            division={division}
                            jobLevel={jobLevel}
                            getModalContainer={getModalContainer}
                            country={country}
                            state={state}
                            city={city}
                            jobData={jobData}
                        />
                    </div>
                </div>
            </div> */}
        </>

    )
}

export default JobGrid
