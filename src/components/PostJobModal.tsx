import { DatePicker } from "antd";
import CommonSelect from "../core/common/commonSelect";
import { useRef, useState } from "react";
import { useAppDispatch } from "../core/data/redux/store";
import { postJob } from "../core/data/redux/actions/requisitionActions";
import { formatDate, toNumber } from "../utils/misc";

interface postJobModal {
    requisitionStatus: any;
    jobDepartment: any;
    jobposttype: any;
    jobpostBoard: any;
    jobtype: any;
    organisation: any;
    businessUnit: any;
    division: any;
    jobLevel: any;
    getModalContainer: any;
    country: any;
    state: any;
    city: any;
}

const PostJobModal = (props: postJobModal) => {
    const dispatch = useAppDispatch();
    const { requisitionStatus, jobDepartment, jobposttype, jobpostBoard, jobtype, organisation,
        businessUnit, division, jobLevel, getModalContainer, country, state, city
    } = props;

    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const data: any = Object.fromEntries(formData.entries());
            formData.forEach((value: any, key) => {
                if(key === "payRangeMin" || key === "payRangeMid" || key === "payRangeMax" || key === "approvedBudget"){
                    data[key] = toNumber(value, 2);
                } else {
                    data[key] = isNaN(value) ? value : Number(value);
                }
            });
            data.jobStartDate = formatDate(new Date());
            data.reasonForVacancy = "New Position";
            data.jobPostingStartDate = formatDate(new Date());
            data.jobPostingEndDate = formatDate(new Date());
            data.jobClassification = "IT";
            data.locationId = 1;
            data.currencyId = 1;
            data.payGrade = "G5";
            data.recruiter = "John Doe";
            data.hiringManager = "Jane Smith";
            data.headOfBusinessUnit = "Michael Johnson";
            data.headOfRecruitment = "Sarah Williams";
            const response: any = await dispatch(postJob(data));
            if (response.status === 200) {
                resetForm();
                document.getElementById("post_job_success")?.click();
                setIsLoading(false);
            }
        }
    };

    const resetForm = () => {
        formRef.current?.reset();
    };
    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <div className="modal-body pb-0">
                <div className="row">
                    <div className="contact-grids-tab pt-0">
                        <ul className="nav nav-underline" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link active"
                                    id="info-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#basic-info"
                                    type="button"
                                    role="tab"
                                    aria-selected="true"
                                >
                                    Basic Information
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="address-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#address"
                                    type="button"
                                    role="tab"
                                    aria-selected="false"
                                >
                                    Location
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content" id="myTabContent">
                        <div
                            className="tab-pane fade show active"
                            id="basic-info"
                            role="tabpanel"
                            aria-labelledby="info-tab"
                            tabIndex={0}
                        >
                            <div className="row">
                                {/* <div className="col-md-12">
                          <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                            <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-30.jpg"
                                alt="img"
                                className="rounded-circle"
                              />
                            </div>
                            <div className="profile-upload">
                              <div className="mb-2">
                                <h6 className="mb-1">Upload Profile Image</h6>
                                <p className="fs-12">Image should be below 4 mb</p>
                              </div>
                              <div className="profile-uploader d-flex align-items-center">
                                <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                                  Upload
                                  <input
                                    type="file"
                                    className="form-control image-sign"
                                    multiple
                                  />
                                </div>
                                <Link
                                  to="#"
                                  className="btn btn-light btn-sm"
                                >
                                  Cancel
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div> */}
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Job Title <span className="text-danger"> *</span>
                                        </label>
                                        <input type="text" className="form-control" id='jobTitle' name='jobTitle' />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Job Description{" "}
                                            <span className="text-danger"> *</span>
                                        </label>
                                        <textarea
                                            rows={3}
                                            className="form-control"
                                            defaultValue={""}
                                            name='jobDescription'
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Requisition Status <span className="text-danger"> *</span>
                                        </label>
                                        <CommonSelect
                                            className='select'
                                            options={requisitionStatus}
                                            defaultValue={requisitionStatus[0]}
                                            name='requisitionStatus'
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Department <span className="text-danger"> *</span>
                                        </label>
                                        <CommonSelect
                                            className='select'
                                            options={jobDepartment}
                                            defaultValue={jobDepartment[0]}
                                            name='departmentId'
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Job Posting Type <span className="text-danger"> *</span>
                                        </label>
                                        <CommonSelect
                                            className='select'
                                            options={jobposttype}
                                            defaultValue={jobposttype[0]}
                                            name='jobPostingType'
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Job Type <span className="text-danger"> *</span>
                                        </label>
                                        <CommonSelect
                                            className='select'
                                            options={jobtype}
                                            defaultValue={jobtype[0]}
                                            name='fte'
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Organisation<span className="text-danger"> *</span>
                                        </label>
                                        <CommonSelect
                                            className='select'
                                            options={organisation}
                                            defaultValue={organisation[0]}
                                            name='organisationId'
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Business Unit<span className="text-danger"> *</span>
                                        </label>
                                        <CommonSelect
                                            className='select'
                                            options={businessUnit}
                                            defaultValue={businessUnit[0]}
                                            name='businessUnitId'
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Division<span className="text-danger"> *</span>
                                        </label>
                                        <CommonSelect
                                            className='select'
                                            options={division}
                                            defaultValue={division[0]}
                                            name='divisionId'
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Job Level <span className="text-danger"> *</span>
                                        </label>
                                        <CommonSelect
                                            className='select'
                                            options={jobLevel}
                                            defaultValue={jobLevel[0]}
                                            name='positionId'
                                        />
                                    </div>
                                </div>
                                {/* <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Experience <span className="text-danger"> *</span>
                            </label>
                            <CommonSelect
                              className='select'
                              options={experience}
                              defaultValue={experience[0]}
                              name='experience'
                            />
                          </div>
                        </div> */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Referral Bonus <span className="text-danger"> *</span>
                                        </label>
                                        <input type="number" className="form-control" name='referralBonus' />
                                    </div>
                                </div>
                                {/* <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Gender <span className="text-danger"> *</span>
                            </label>
                            <CommonSelect
                              className='select'
                              options={genderChoose}
                              defaultValue={genderChoose[0]}
                              name='gender'
                            />
                          </div>
                        </div> */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Min. Salary <span className="text-danger"> *</span>
                                        </label>
                                        <input type="number" className="form-control" name='payRangeMin' step={0.01} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Mid. Salary <span className="text-danger"> *</span>
                                        </label>
                                        <input type="number" className="form-control" name='payRangeMid' step={0.01}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Max. Salary <span className="text-danger"> *</span>
                                        </label>
                                        <input type="number" className="form-control" name='payRangeMax' step={0.01}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Approved Budget <span className="text-danger"> *</span>
                                        </label>
                                        <input type="number" className="form-control" name='approvedBudget' step={0.01} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Job Posting Board <span className="text-danger"> *</span>
                                        </label>
                                        <CommonSelect
                                            className='select'
                                            options={jobpostBoard}
                                            defaultValue={jobpostBoard[0]}
                                            name='jobPostingBoard'
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3 ">
                                        <label className="form-label">
                                            Job Expired Date{" "}
                                            <span className="text-danger"> *</span>
                                        </label>
                                        <div className="input-icon-end position-relative">
                                            <DatePicker
                                                className="form-control datetimepicker"
                                                format={{
                                                    format: "DD-MM-YYYY",
                                                    type: "mask",
                                                }}
                                                getPopupContainer={getModalContainer}
                                                placeholder="DD-MM-YYYY"
                                                name='jobPostingEndDate'
                                            />
                                            <span className="input-icon-addon">
                                                <i className="ti ti-calendar text-gray-7" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">Required Skills{" "}
                                            <span className="text-danger"> *</span></label>
                                        <input type="text" className="form-control" name='interviewingCompetencies' />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-light me-2"
                                    data-bs-dismiss="modal"
                                    onClick={() => resetForm()}
                                >
                                    Cancel
                                </button>
                                 <button
                                    id="post_job_success"
                                    type="button"
                                    hidden
                                    data-bs-toggle="modal"
                                    data-bs-target="#success_modal"
                                >
                                    Post
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    {isLoading && <i className="fas fa-spinner fa-spin me-2"/>}
                                    Post
                                </button>
                            </div>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="address"
                            role="tabpanel"
                            aria-labelledby="address-tab"
                            tabIndex={0}
                        >
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Address <span className="text-danger"> *</span>
                                        </label>
                                        <input type="text" className="form-control" name='locationId' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Country <span className="text-danger"> *</span>
                                        </label>
                                        <CommonSelect
                                            className='select'
                                            options={country}
                                            defaultValue={country[0]}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            State <span className="text-danger"> *</span>
                                        </label>
                                        <CommonSelect
                                            className='select'
                                            options={state}
                                            defaultValue={state[0]}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            City <span className="text-danger"> *</span>
                                        </label>
                                        <CommonSelect
                                            className='select'
                                            options={city}
                                            defaultValue={city[0]}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Zip Code <span className="text-danger"> *</span>
                                        </label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="map-grid mb-3">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6509170.989457427!2d-123.80081967108484!3d37.192957227641294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20USA!5e0!3m2!1sen!2sin!4v1669181581381!5m2!1sen!2sin"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="w-100"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-light me-2"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#success_modal"
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default PostJobModal;