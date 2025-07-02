import React, { useEffect, useRef } from 'react'
import { all_routes } from '../../router/all_routes';
import { Link } from 'react-router-dom';
import PredefinedDateRanges from '../../../core/common/datePicker';
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import { DatePicker } from "antd";
import CommonSelect from '../../../core/common/commonSelect';
import Table from "../../../core/common/dataTable/index";
import CollapseHeader from '../../../core/common/collapse-header/collapse-header';
import { RootState, useAppDispatch } from '../../../core/data/redux/store';
import { getJobLists, postJob } from '../../../core/data/redux/actions/requisitionActions';
import { useSelector } from 'react-redux';
import { transformArrayToLabelValue } from '../../../utils/misc';
import PostJobModal from '../../../components/CreateRequisition';
import { Spinner } from 'react-bootstrap';
import EnhancedTableSkeleton from '../../../components/TableSkeleton';


const JobList = () => {
  const dispatch = useAppDispatch();
  const jobs: any = useSelector((state: RootState) => state.jobs) || [];
  const [jobLevel, setJobLevel] = React.useState<any>(transformArrayToLabelValue(jobs.positionList?.content || []));
  const [jobDepartment, setJobDepartment] = React.useState<any>(transformArrayToLabelValue(jobs.department?.content || []));
  const [businessUnit, setBusinessUnit] = React.useState<any>(transformArrayToLabelValue(jobs.businessUnit?.content || []));
  const [organisation, setOrganisation] = React.useState<any>(transformArrayToLabelValue(jobs.organisation?.content || []));
  const [division, setDivision] = React.useState<any>(transformArrayToLabelValue(jobs.division?.content || []));
  const [isLoading, setIsLoading] = React.useState<any>(false);
  const data = jobs.jobList?.content || [];
  const [jobData, setJobData] = React.useState<any>({});
  const columns = [
    {
      title: "Job ID",
      dataIndex: "id",
      sorter: (a: any, b: any) => a.id.length - b.id.length,
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      render: (text: string, record: any) => (
        <div className="d-flex align-items-center file-name-icon">
          {/* <Link to="#" className="avatar avatar-md bg-light rounded">
            <ImageWithBasePath
              src={`assets/img/icons/${record.Image}`}
              className="img-fluid rounded-circle"
              alt="img"
            />
          </Link> */}
          <div className="ms-2">
            <h6 className="fw-medium">
              <Link to="#">{record.jobTitle}</Link>
            </h6>
            <span className="d-block mt-1">{record.Roll}</span>
          </div>
        </div>

      ),
      sorter: (a: any, b: any) => a.jobTitle.length - b.jobTitle.length,
    },
    {
      title: "Category",
      dataIndex: "jobClassification",
      sorter: (a: any, b: any) => a.jobClassification.length - b.jobClassification.length,
    },
    {
      title: "Location",
      dataIndex: "Location",
      sorter: (a: any, b: any) => a.Location.length - b.Location.length,
    },
    {
      title: "Salary Range",
      dataIndex: "payRangeMax",
      sorter: (a: any, b: any) => a.payRangeMax.length - b.payRangeMax.length,
    },
    {
      title: "Posted Date",
      dataIndex: "jobPostingStartDate",
      sorter: (a: any, b: any) => a.jobPostingStartDate.length - b.jobPostingStartDate.length,
    },
    {
      title: "",
      dataIndex: "actions",
      render: (text: string, record: any) => (
        <div className="action-icon d-inline-flex">
          <Link
            to="#"
            className="me-2"
            data-bs-toggle="modal"
            data-bs-target="#edit_post"
            onClick={() => {
              setJobData(record)
            }}
          >
            <i className="ti ti-edit" />
          </Link>
          <Link to="#" data-bs-toggle="modal" data-bs-target="#delete_modal">
            <i className="ti ti-trash" />
          </Link>
        </div>
      ),
    },
  ]

  const getModalContainer = () => {
    const modalElement = document.getElementById('modal-datepicker');
    return modalElement ? modalElement : document.body; // Fallback to document.body if modalElement is null
  };

  const jobCategory = [
    { value: "Select", label: "Select" },
    { value: "IOS", label: "IOS" },
    { value: "Web & Application", label: "Web & Application" },
    { value: "Networking", label: "Networking" },
  ];
  const jobtype = [
    { value: "Select", label: "Select" },
    { value: "Full-Time", label: "Full Time" },
    { value: "Part-Time", label: "Part Time" },
  ];
  const jobposttype = [
    { value: "Select", label: "Select" },
    { value: "Internal", label: "Internal" },
    { value: "External", label: "External" },
  ];
  const jobpostBoard = [
    { value: "Select", label: "Select" },
    { value: "LinkedIn", label: "LinkedIn" },
  ];
  const requisitionStatus = [
    { value: "Select", label: "Select" },
    { value: "Open", label: "Open" },
    { value: "Closed", label: "Closed" },
  ];
  const experience = [
    { value: "Select", label: "Select" },
    { value: "Entry Level", label: "Entry Level" },
    { value: "Mid Level", label: "Mid Level" },
    { value: "Expert", label: "Expert" },
  ];
  const qualification = [
    { value: "Select", label: "Select" },
    { value: "Bachelore Degree", label: "Bachelore Degree" },
    { value: "Master Degree", label: "Master Degree" },
    { value: "Others", label: "Others" },
  ];
  const genderChoose = [
    { value: "Select", label: "Select" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];
  const salary = [
    { value: "Select", label: "Select" },
    { value: "10k - 15k", label: "10k - 15k" },
    { value: "15k -20k", label: "15k -20k" },
  ];
  const maxsalary = [
    { value: "Select", label: "Select" },
    { value: "40k - 50k", label: "40k - 50k" },
    { value: "50k - 60k", label: "50k - 60k" },
  ];
  const country = [
    { value: "Select", label: "Select" },
    { value: "USA", label: "USA" },
    { value: "Canada", label: "Canada" },
    { value: "Germany", label: "Germany" },
    { value: "France", label: "France" },
  ];
  const state = [
    { value: "Select", label: "Select" },
    { value: "California", label: "California" },
    { value: "New York", label: "New York" },
    { value: "Texas", label: "Texas" },
    { value: "Florida", label: "Florida" },
  ];
  const city = [
    { value: "Select", label: "Select" },
    { value: "Los Angeles", label: "Los Angeles" },
    { value: "San Diego", label: "San Diego" },
    { value: "Fresno", label: "Fresno" },
    { value: "San Francisco", label: "San Francisco" },
  ];

  useEffect(() => {
    getJobs();
  }, [dispatch]);

  const getJobs = async () => {
    setIsLoading(true);
    await dispatch(getJobLists());
    setIsLoading(false);
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
                  <Link
                    to={all_routes.joblist}
                    className="btn btn-icon btn-sm active bg-primary text-white me-1"
                  >
                    <i className="ti ti-list-tree" />
                  </Link>
                  <Link to={all_routes.jobgrid} className="btn btn-icon btn-sm">
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
              <div className="mb-2">
                <Link
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#add_post"
                  className="btn btn-primary d-flex align-items-center"
                >
                  <i className="ti ti-circle-plus me-2" />
                  Post job
                </Link>
              </div>
              <div className="head-icons ms-2">
                <CollapseHeader />
              </div>
            </div>
          </div>
          {/* /Breadcrumb */}
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
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
                    Select Status
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li>
                      <Link
                        to="#"
                        className="dropdown-item rounded-1"
                      >
                        Accepted
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="dropdown-item rounded-1"
                      >
                        sent
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="dropdown-item rounded-1"
                      >
                        Expired
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="dropdown-item rounded-1"
                      >
                        Declined
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
            <div className="card-body p-0">
              {!isLoading ? <Table dataSource={data} columns={columns} Selection={true} /> : <EnhancedTableSkeleton  />}
            </div>
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
      <div className="modal fade" id="success_modal" role="dialog">
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
      </div>
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
      {/* /Post Job */}
    </>


  )
}

export default JobList
