import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from "antd";
import CommonSelect from "../core/common/commonSelect";
import { FormEvent, useEffect, useRef, useState } from "react";
import { RootState, useAppDispatch } from "../core/data/redux/store";
import { postJob } from "../core/data/redux/actions/requisitionActions";
import { formatDate, toNumber, transformArrayToLabelValue } from "../utils/misc";
import { useSelector } from "react-redux";
import NumericInput from "./NumericInput";
import { ArrowLeftOutlined } from "@ant-design/icons";
import DebounceSelect from "./DebounceSelect";
import { useNavigate } from "react-router";

const CreateRequisition = (props: any) => {
    const { currentStep, setCurrent, prev } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        handleSubmit(values);
    };
    const jobs: any = useSelector((state: RootState) => state.jobs) || [];
    const [jobLevel, setJobLevel] = useState<any>(transformArrayToLabelValue(jobs.positionList?.content || []));
    const [jobDepartment, setJobDepartment] = useState<any>(transformArrayToLabelValue(jobs.department?.content || []));
    const [businessUnit, setBusinessUnit] = useState<any>(transformArrayToLabelValue(jobs.businessUnit?.content || []));
    const [organisation, setOrganisation] = useState<any>(transformArrayToLabelValue(jobs.organisation?.content || []));
    const [division, setDivision] = useState<any>(transformArrayToLabelValue(jobs.division?.content || []));
    const [isLoading, setIsLoading] = useState<any>(jobs.loading);
    const [jobData, setJobData] = useState<any>({});


    const jobtype = [
        { value: "Full-Time", label: "Full Time" },
        { value: "Part-Time", label: "Part Time" },
    ];
    const jobposttype = [
        { value: "Internal", label: "Internal" },
        { value: "External", label: "External" },
    ];
    const jobpostBoard = [
        { value: "LinkedIn", label: "LinkedIn" },
    ];
    const requisitionStatus = [
        // { value: "Select", label: "Select" },
        { value: "Open", label: "Open" },
        { value: "Closed", label: "Closed" },
    ];

    useEffect(() => {
        if (jobData) {
            // setFormValues(jobData);
        }
    }, [jobData]);
    const handleSubmit = async (formValues: any) => {
        setIsLoading(true);
        console.log(form);
        const data: any = Object.fromEntries(formValues.entries());
        formValues.forEach((value: any, key: any) => {
            if (key === "payRangeMin" || key === "payRangeMid" || key === "payRangeMax" || key === "approvedBudget") {
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
            setCurrent(1);
            document.getElementById("post_job_success")?.click();
            setIsLoading(false);
        }
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    return (
        <Form
            {...formItemLayout}
            form={form}
            layout={'vertical'}
            name="requisition"
            onFinish={onFinish}
            initialValues={jobData}
            // style={{ maxWidth: 600 }}
            scrollToFirstError
        >

            <Row gutter={{ xs: 6, sm: 12, md: 12, lg: 12 }}>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="jobTitle"
                        label="Job Title"
                        rules={[{ required: true, message: 'Please enter job title!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="jobDescription"
                        label="Job Description"
                        rules={[{ required: true, message: 'Please enter job description!' }]}
                    >
                        <Input.TextArea showCount maxLength={100} />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="requisitionStatus"
                        label="Requisition Status"
                        rules={[{ required: true, message: 'Please enter requisition status!' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="label"
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={requisitionStatus}
                        />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="departmentId"
                        label="Department"
                        rules={[{ required: true, message: 'Please select department!' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="label"
                            filterSort={(optionA: any, optionB: any) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={jobDepartment}
                        />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="jobPostingType"
                        label="Job Posting Type"
                        rules={[{ required: true, message: 'Please select posting type!' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="label"
                            filterSort={(optionA: any, optionB: any) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={jobposttype}
                        />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="fte"
                        label="Job Type"
                        rules={[{ required: true, message: 'Please select job type!' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="label"
                            filterSort={(optionA: any, optionB: any) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={jobtype}
                        />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="organisationId"
                        label="Organisation"
                        rules={[{ required: true, message: 'Please select organisation!' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="label"
                            filterSort={(optionA: any, optionB: any) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={organisation}
                        />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="businessUnitId"
                        label="Business Unit"
                        rules={[{ required: true, message: 'Please select business unit!' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="label"
                            filterSort={(optionA: any, optionB: any) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={businessUnit}
                        />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="divisionId"
                        label="Division"
                        rules={[{ required: true, message: 'Please select division!' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="label"
                            filterSort={(optionA: any, optionB: any) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={division}
                        />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="positionId"
                        label="Job Level"
                        rules={[{ required: true, message: 'Please select job level!' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="label"
                            filterSort={(optionA: any, optionB: any) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={jobLevel}
                        />
                    </Form.Item>
                </Col>
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
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="referralBonus"
                        label="Referral Bonus"
                    >
                        <Input />
                    </Form.Item>
                </Col>
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
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="payRangeMin"
                        label="Min. Salary"
                        rules={[{ required: true, message: 'Please enter minimum salary!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="payRangeMid"
                        label="Mid. Salary"
                        rules={[{ required: true, message: 'Please enter middle salary!' }]}
                    >
                        <input type="number" className="form-control" name='payRangeMid' step={0.01} />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="payRangeMax"
                        label="Max. Salary"
                        rules={[{ required: true, message: 'Please enter maximum salary!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="approvedBudget"
                        label="Approved Budget"
                        rules={[{ required: true, message: 'Please enter approved budget!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="jobPostingBoard"
                        label="Job Posting Board"
                        rules={[{ required: true, message: 'Please select job posting board!' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="label"
                            filterSort={(optionA: any, optionB: any) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={jobpostBoard}
                        />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="jobPostingEndDate"
                        label="Job Expired Date"
                        rules={[{ required: true, message: 'Please select job expired date!' }]}
                    >
                        <DatePicker
                            format={{
                                format: "DD-MM-YYYY",
                            }}
                            placeholder="DD-MM-YYYY"
                            name='jobPostingEndDate'
                        />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="interviewingCompetencies"
                        label="Required Skills"
                        rules={[{ required: true, message: 'Please enter skills required!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <div className="">
                <Space size="middle">
                    {currentStep > 0 && (
                        <Button
                            style={{ margin: '0 8px' }}
                            onClick={() => prev()}
                            icon={<ArrowLeftOutlined />}
                        >
                            Previous
                        </Button>
                    )}
                    <button
                        type="button"
                        className="btn btn-light me-2"
                        onClick={() => { navigate('/job-grid') }}
                    >
                        Cancel Job Requisition
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
                        className="btn btn-primary ml-5"
                    >
                        {isLoading && <i className="fas fa-spinner fa-spin me-2" />}
                        Save & Close
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        {isLoading && <i className="fas fa-spinner fa-spin me-2" />}
                        Create & Send to Approver 1
                    </button>
                </Space>
            </div>
        </Form>
    )
}
export default CreateRequisition;