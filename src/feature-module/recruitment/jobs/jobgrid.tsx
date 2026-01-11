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
import { useSelector } from 'react-redux'
import { transformArrayToLabelValue } from '../../../utils/misc'
import PostJobModal from '../create/CreateRequisition';
import CardGridSkeleton from '../../../components/CardGridSkeleton';
import { useNavigate } from "react-router";

const JobGrid = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
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
