import { Button, Col, DatePicker, Form, Input, message, Row, Select, Space, Typography, InputNumber } from "antd";
import CommonSelect from "../../../core/common/commonSelect";
import { FormEvent, useEffect, useRef, useState } from "react";
import { RootState, useAppDispatch } from "../../../core/data/redux/store";
import { postJob, saveManagerReview, saveRecruiterLeadReview, getJobLists, getRecruiterTeamLeadByRequisitionID } from "../../../core/data/redux/actions/requisitionActions";
import { formatDate, toNumber, transformArrayToLabelValue } from "../../../utils/misc";
import { useSelector } from "react-redux";
import NumericInput from "../../../components/NumericInput";
import { ArrowLeftOutlined } from "@ant-design/icons";
import DebounceSelect from "../../../components/DebounceSelect";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { OverlayTrigger, Tooltip as BootstrapTooltip } from "react-bootstrap";
import { InfoCircleOutlined } from '@ant-design/icons';
dayjs.extend(utc);

const { Paragraph } = Typography;

const Step3 = (props: any) => {
    const { currentStep, setCurrent, prev } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [form] = Form.useForm();

    // const onFinish = (values: any) => {
    //     console.log('Received values of form: ', values);
    //     handleSubmit(values);
    // };
    const [jobCode, setJobCode] = useState('889AB');
    const jobs: any = useSelector((state: RootState) => state.jobs) || [];
    const [jobDepartment, setJobDepartment] = useState<any>(transformArrayToLabelValue(jobs.department?.content || []));
    const [businessUnit, setBusinessUnit] = useState<any>(transformArrayToLabelValue(jobs.businessUnit?.content || []));
    const [organisation, setOrganisation] = useState<any>(transformArrayToLabelValue(jobs.organisation?.content || []));
    const [division, setDivision] = useState<any>(transformArrayToLabelValue(jobs.division?.content || []));
    const [isLoading, setIsLoading] = useState<any>(jobs.loading);
    const [isSaveLoading, setIsSaveLoading] = useState<any>(jobs.loading);
    const [isSendBackLoading, setIsSendBackLoading] = useState<any>(jobs.loading);
    const [jobData, setJobData] = useState<any>({});
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
    const [businessUnitName, setBusinessUnitName] = useState<any[]>([]);
    const [divisionName, setDivisionName] = useState<any[]>([]);

    const [loginRole, setLoginRole] = useState("");
    useEffect(() => {
        setLoginRole(sessionStorage.getItem("login_role") || "");
    }, []);
    const [requisitionCode, setRequisitionCode] = useState<string>("");
    const [currency, setCurrency] = useState("$");
    const [departmentName, setDepartmentName] = useState<any[]>([]);
    const [locationName, setLocationName] = useState<any[]>([]);
    const [organisationName, setOrganisationName] = useState<any[]>([]);
    const { Option } = Select;
    const [headOfRecruitment, setHeadOfRecruitmentOptions] = useState<any[]>([]);
    const [recruiterName, setRecruiterName] = useState<any[]>([]);

    const joblevel = [
        { value: "Entry-Level", label: "Entry Level" },
        { value: "Mid-Level", label: "Mid Level" },
        { value: "Senior-Level", label: "Senior Level" },
    ];
    const requisitionStatus = [
        // { value: "Select", label: "Select" },
        { value: "pre-approved", label: "Pre-approved" },
        { value: "rejected", label: "Rejected" },
    ];
    const [stepper2_Status, setStepper2_Status] = useState("");
    const [recruiter_TeamLead_Id, setRecruiter_TeamLead_Id] = useState("");

    useEffect(() => {
        if (jobs.jobById) {
            form.setFieldsValue({
                internalJobTitle: jobs.jobById?.jobTitle,
                jobDescription: jobs.jobById?.jobDescription,
                jobStartDate: jobs.jobStartDate
                    ? dayjs(jobs.jobStartDate)
                    : null,
                jobPostingEndDate: jobs.jobPostingEndDate
                    ? dayjs(jobs.jobPostingEndDate)
                    : null,
                // ...jobs.jobById
            });
            setJobData(jobs.jobById);
        }
    }, [jobs.jobById, form]);

    useEffect(() => {
        const jobId = localStorage.getItem('requisitionId');
        if (jobId) {
            setRequisitionCode(jobId)
            getJobs(jobId);
        }
    }, []);

    const getJobs = async (reqId: any) => {
        setIsLoading(true);
        const response: any = await dispatch(getJobLists(reqId));
        const data = response.data;
        if (response.status !== 200) {
            message.error('Error fetching position');
        } else {
            setTimeout(() => {
                form.setFieldsValue({
                    ...data,
                    // jobPostingEndDate: data.jobPostingEndDate ? moment(data?.jobPostingEndDate) : new Date(),
                    jobStartDate: data.jobStartDate
                        ? dayjs(data.jobStartDate)
                        : null,

                    jobPostingStartDate: data.jobPostingStartDate
                        ? dayjs(data.jobPostingStartDate)
                        : null,

                    jobPostingEndDate: data.jobPostingEndDate
                        ? dayjs(data.jobPostingEndDate)
                        : null,
                });
                setStepper2_Status(data.stepper2Status || "")
                setIsLoading(false);
                setIsSaveLoading(false);
                setIsSendBackLoading(false);
                if (data.stepper2Status === "Draft" || data.stepper2Status === "Approver 1") {
                    getRecruiterTeamLeadReviewDetails(reqId)
                }
            }, 500);
        }
    }

    const getRecruiterTeamLeadReviewDetails = async (reqId: any) => {
        setIsLoading(true);
        const response: any = await dispatch(getRecruiterTeamLeadByRequisitionID(reqId));
        const data = response.data;
        if (response.status !== 200) {
            message.error('Error fetching Manager Review by Req Id');
        } else {
            setTimeout(() => {
                setRecruiter_TeamLead_Id(data.id)
                form.setFieldsValue({
                    externalJobTitle: data?.externalJobTitle,
                    externalJobDescription: data?.externalJobDescription,
                    levelOfExperience: data?.levelOfExperience,
                });
                setIsLoading(false);
            }, 500);
        }
    }

    const handleSubmit = async (formValues: any, sts: 'Draft' | 'Approver 3') => {
        const titl = form.getFieldValue("externalJobTitle");
        const desc = form.getFieldValue("externalJobDescription");
        const exp = form.getFieldValue("levelOfExperience");

        // const hasAnyValue = [titl, desc, exp].every(v =>
        //     typeof v === "string"
        //         ? v.trim() !== ""
        //         : v !== undefined && v !== null
        // );
        // if (!hasAnyValue) {
        //     messageApi.error("Please fill at least one field");
        //     return; // ⛔ HARD STOP — API will NOT run
        // }

        if (sts === 'Draft') {
            setIsSaveLoading(true);
        } else {
            setIsLoading(true);
        } messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
        });

        Object.entries(formValues).forEach(([key, value]) => {
            if (key === "payRangeMin" || key === "payRangeMid" || key === "payRangeMax" || key === "approvedBudget") {
                formValues[key] = toNumber(value, 2);
            } else {
                formValues[key] = isNaN(value as any) ? value : Number(value);
            }
        });
        formValues.status = jobData?.requisitionStatus || undefined;
        formValues.requisition = {
            id: jobData?.id
        };
        // delete formValues.id;
        // if (localStorage.getItem('stepper3Id') !== "") {
        //     formValues.id = localStorage.getItem('stepper3Id') || undefined;
        // }
        formValues.positionId = jobData?.positionId || undefined;
        formValues.jobStartDate = formatDate(new Date());
        formValues.reasonForVacancy = "New Position";
        formValues.notificationStatus = sts;
        formValues.currency = currency;
        formValues.jobGrade = formValues.jobGrade;
        formValues.jobLevel = formValues.jobLevel;
        formValues.jobDescription = formValues.jobDescription;
        formValues.numberOfOpenings = formValues.numberOfOpenings;
        delete formValues.id;
        if (recruiter_TeamLead_Id !== "") {
            formValues.id = recruiter_TeamLead_Id;
        }
        // formValues.jobPostingStartDate = formatDate(new Date());
        // formValues.jobClassification = "IT";
        // formValues.locationId = 1;
        // formValues.currencyId = 1;
        // formValues.payGrade = "G5";
        // formValues.recruiter = "John Doe";
        // formValues.hiringManager = "Jane Smith";
        // formValues.headOfBusinessUnit = "Michael Johnson";
        // formValues.headOfRecruitment = "Sarah Williams";
        const response: any = await dispatch(saveRecruiterLeadReview(formValues));
        if (response.status === 200) {
            setIsLoading(false);
            messageApi.open({
                key,
                type: 'success',
                content: jobData?.id ? 'Updated successfully!' : 'Saved successfully!',
                duration: 7,
            });
            localStorage.setItem('recruiterLeadReviewId', response?.data?.id);
            localStorage.setItem('stepper3Id', response?.data?.id);
            setTimeout(() => {
                navigate('/job-grid');
                // setCurrent(3);
            }, 700)
        } else {
            console.log(response);
            setIsLoading(false);
            messageApi.open({
                key,
                type: 'error',
                content: response?.response?.data?.message || 'Internal Server Error!',
                duration: 7,
            });
        }
    };

    const handleSendBack = async (formValues: any) => {
        setIsSendBackLoading(true);
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
        });

        Object.entries(formValues).forEach(([key, value]) => {
            if (
                key === "payRangeMin" ||
                key === "payRangeMid" ||
                key === "payRangeMax" ||
                key === "approvedBudget"
            ) {
                formValues[key] = toNumber(value, 2);
            } else {
                formValues[key] = isNaN(value as any) ? value : Number(value);
            }
        });

        formValues.status = jobData?.requisitionStatus || undefined;
        formValues.requisition = {
            id: jobData?.id,
        };
        // ❌ removed formValues.id assignment
        formValues.positionId = jobData?.positionId || undefined;
        formValues.jobStartDate = formatDate(new Date());
        formValues.reasonForVacancy = "New Position";
        formValues.notificationStatus = "Approver 1";
        // ✅ ensure id is not present
        delete formValues.id;
        if (recruiter_TeamLead_Id) {
            formValues.id = recruiter_TeamLead_Id;
        }
        const response: any = await dispatch(saveRecruiterLeadReview(formValues));
        if (response.status === 200) {
            setIsSendBackLoading(false);
            messageApi.open({
                key,
                type: 'success',
                content: jobData?.id ? 'Updated successfully!' : 'Saved successfully!',
                duration: 7,
            });
            localStorage.setItem('managerReviewId', response?.data?.id);
            setTimeout(() => {
                navigate('/job-grid');
                // setCurrent(2);
            }, 700);
        } else {
            console.log(response);
            setIsSendBackLoading(false);
            messageApi.open({
                key,
                type: 'error',
                content: response?.response?.data?.message || 'Internal Server Error!',
                duration: 7,
            });
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
            // onFinish={onFinish}
            initialValues={jobData}
            // style={{ maxWidth: 600 }}
            scrollToFirstError
        >

            <Row justify="center" gutter={32}>

                {/* LEFT SIDE */}
                <Col lg={11} md={12} xs={24}>

                    {/* Requisition */}
                    <div style={{ marginBottom: 28 }}>
                        <h3 style={{ color: "#1677ff", marginBottom: 18 }}>
                            Requisition Info
                        </h3>
                        <Form.Item
                            name="requisitionStatus"
                            label="Requisition Status"
                            rules={[{ required: true, message: 'Please enter requisition status!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="label"
                                disabled={loginRole === "HIRING_MANAGER"}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={requisitionStatus}
                            />
                        </Form.Item>
                        <Form.Item
                            // name="requisitionCode"
                            label={
                                <span>
                                    Requisition ID{"  "}
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <BootstrapTooltip className="custom-tooltip">
                                                Requisition ID is auto generated, cannot be edited
                                            </BootstrapTooltip>
                                        }
                                    >
                                        <InfoCircleOutlined style={{ color: '#ffbb3c', cursor: 'pointer' }} />
                                    </OverlayTrigger>
                                </span>
                            }
                            rules={[{ required: true, message: 'Please enter the Requisition ID!' }]}
                        >
                            <Input value={requisitionCode} />
                        </Form.Item>
                    </div>

                    {/* Job Details */}
                    <div>
                        <h3 style={{ color: "#1677ff", marginBottom: 18 }}>
                            Job Details
                        </h3>

                        <Form.Item
                            name="positionId"
                            label="Position ID"
                            rules={[{ required: true, message: 'Please select job level!' }]}
                        >
                            <Input readOnly disabled={loginRole === "HIRING_MANAGER"} style={{ cursor: 'not-allowed' }} />
                            {/* <Select
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="label"
                                disabled={loginRole === "HIRING_MANAGER"}
                                filterSort={(optionA: any, optionB: any) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={jobLevel}
                                onChange={(value: any) => {
                                    handlePositionChange(value)
                                }}
                            /> */}
                        </Form.Item>

                        <Form.Item
                            name="jobCode"
                            label="Job Code"
                            rules={[{ required: true, message: 'Missing the Job Code!' }]}
                        >
                            <Input readOnly disabled={loginRole === "HIRING_MANAGER"} style={{ cursor: 'not-allowed' }} />
                        </Form.Item>

                        <Form.Item
                            name="jobPostingStartDate"
                            label="Job Start Date"
                            rules={[{ required: true, message: 'Please select job Start date!' }]}
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                            name="jobTitle"
                            label="Job Title"
                            rules={[{ required: true, message: 'Please enter job title!' }]}
                        >
                            <Input disabled={loginRole === "HIRING_MANAGER"} />
                        </Form.Item>

                        <Form.Item
                            name="jobDescription"
                            label="Job Description"
                            rules={[{ required: true, message: 'Please enter job description!' }]}
                        >
                            <Input.TextArea disabled={loginRole === "HIRING_MANAGER"} />
                        </Form.Item>

                        <Form.Item
                            name="jobGrade"
                            label="Job Grade"
                            rules={[{ required: true, message: 'Please enter job grade!' }]}
                        >
                            <Input disabled={loginRole === "HIRING_MANAGER"} />
                        </Form.Item>

                        <Form.Item
                            name="jobLevel"
                            label="Job Level"
                            rules={[{ required: true, message: 'Please enter job level!' }]}
                        >
                            <Input disabled={loginRole === "HIRING_MANAGER"} />
                        </Form.Item>

                        <Form.Item name="locationName" label="Job Locations">
                            <Input
                                readOnly
                                value={locationName}
                                disabled={loginRole === "HIRING_MANAGER"}
                                style={{ cursor: 'not-allowed' }}
                            />
                        </Form.Item>

                        {/* Actual submitted value */}
                        <Form.Item
                            name="locationId"
                            hidden
                            rules={[{ required: true, message: 'Please select location!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="numberOfOpenings"
                            label="Number Of Openings"
                            rules={[{ required: false, message: 'Please enter number of openings!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </div>

                </Col>

                <Col lg={2}></Col>

                {/* RIGHT SIDE */}
                <Col lg={10} md={12} xs={24}>

                    {/* Organization */}
                    <div style={{ marginBottom: 28 }}>
                        <h3 style={{ color: "#1677ff", marginBottom: 18 }}>
                            Organizational Details
                        </h3>

                        <Form.Item name="organisationName" label="Organization">
                            <Input
                                readOnly
                                value={organisationName}
                                style={{ cursor: 'not-allowed' }}
                            />
                        </Form.Item>

                        {/* Actual submitted value */}
                        <Form.Item
                            name="organisationId"
                            hidden
                            rules={[{ required: true, message: 'Please select organisation!' }]}
                        >
                            <Input />
                        </Form.Item>

                        {/* Display only */}
                        <Form.Item name="businessUnitName" label="Business Unit">
                            <Input
                                readOnly
                                value={businessUnitName}
                                style={{ cursor: 'not-allowed' }}
                            />
                        </Form.Item>

                        {/* Actual submitted value */}
                        <Form.Item
                            name="businessUnitId"
                            hidden
                            rules={[{ required: true, message: 'Please select business unit!' }]}
                        >
                            <Input />
                        </Form.Item>

                        {/* Display only */}
                        <Form.Item name="divisionName" label="Division">
                            <Input
                                readOnly
                                value={divisionName}
                                style={{ cursor: 'not-allowed' }}
                            />
                        </Form.Item>

                        {/* Actual submitted value */}
                        <Form.Item
                            name="divisionId"
                            hidden
                            rules={[{ required: true, message: 'Please select division!' }]}
                        >
                            <Input />
                        </Form.Item>

                        {/* Display only */}
                        <Form.Item name="departmentName" label="Department">
                            <Input
                                readOnly
                                value={departmentName}
                                style={{ cursor: 'not-allowed' }}
                            />
                        </Form.Item>

                        {/* Actual submitted value */}
                        <Form.Item
                            name="departmentId"
                            hidden
                            rules={[{ required: true, message: 'Please select department!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    {/* Salary */}
                    <div style={{ marginBottom: 28 }}>
                        <h3 style={{ color: "#1677ff", marginBottom: 18 }}>
                            Salary Details
                        </h3>
                        <Form.Item
                            name="currency"
                            label="Currency"
                            rules={[{ required: true, message: "Please select currency!" }]}
                        >
                            <Select
                                placeholder="Select Currency"
                                onChange={(value) => setCurrency(value)}
                            >
                                <Option value="$">Dollar ($)</Option>
                                <Option value="₹">Rupee (₹)</Option>
                                <Option value="€">Euro (€)</Option>
                                <Option value="£">Pound (£)</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="payRangeMin"
                            label="Minimum Pay"
                        >
                            <InputNumber addonBefore={currency}
                                min={0}
                                style={{ width: '100%' }}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>

                        <Form.Item
                            name="payRangeMid"
                            label="Mid Pay"
                        >
                            <InputNumber addonBefore={currency}
                                min={0}
                                style={{ width: '100%' }}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>

                        <Form.Item
                            name="payRangeMax"
                            label="Maximum Pay"
                        >
                            <InputNumber addonBefore={currency}
                                min={0}
                                style={{ width: '100%' }}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>
                    </div>

                    {/* Hiring */}
                    <div>
                        <h3 style={{ color: "#1677ff", marginBottom: 18 }}>
                            Hiring Team Details
                        </h3>

                        <Form.Item
                            name="headOfRecruitment"
                            label="Recruting Manager"
                        >
                            <Select
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="label"
                                filterSort={(optionA: any, optionB: any) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={headOfRecruitment}
                            />
                        </Form.Item>
                        {/* Display only */}
                        <Form.Item name="recruiterName" label="Recruiter">
                            <Input
                                readOnly
                                value={recruiterName}
                                style={{ cursor: 'not-allowed' }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="recruiterName"
                            label="Recruiting Team"
                        >
                            <Select
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="label"
                                filterSort={(optionA: any, optionB: any) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={headOfRecruitment}
                            />
                        </Form.Item>

                        {/* <Form.Item
                            name="headOfBusinessUnit"
                            label="Head Of Business Unit"
                        >
                            <Select
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="label"
                                filterSort={(optionA: any, optionB: any) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={headOfBusinessUnit}
                            />
                        </Form.Item> */}

                        {/* <Form.Item
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
                        </Form.Item> */}

                        {/* <Form.Item
                            name="jobType"
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
                        </Form.Item> */}

                        {/* <Form.Item
                            name="referralBonus"
                            label="Referral Bonus"
                        >
                            <Input />
                        </Form.Item> */}

                        {/* <Form.Item
                            name="approvedBudget"
                            label="Approved Budget"
                            rules={[{ required: false, message: 'Please enter approved budget!' }]}
                        >
                            <Input />
                        </Form.Item> */}

                        <Form.Item
                            name="jobPostingEndDate"
                            label="End Date"
                            rules={[{ required: false, message: 'Please select job expired date!' }]}
                        >
                            <DatePicker style={{ width: '100%', pointerEvents: 'none' }} />
                        </Form.Item>

                        {/* <Form.Item
                            name="interviewingCompetencies"
                            label="Required Skills"
                            rules={[{ required: true, message: 'Please enter skills required!' }]}
                        >
                            <Input />
                        </Form.Item> */}
                    </div>

                </Col>

            </Row>
            <div className="modal-footer">
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
                    {stepper2_Status === "" && (
                        <button
                            className="btn btn-primary ml-5"
                            onClick={async () => {
                                setIsSaveLoading(true);
                                await handleSubmit(form.getFieldsValue(), 'Draft');
                                setTimeout(() => {
                                    setIsSaveLoading(false);
                                    // navigate('/job-grid');
                                }, 700);
                            }}
                        >
                            {isSaveLoading && <i className="fas fa-spinner fa-spin me-2" />}
                            Save & Close
                        </button>
                    )}
                    {(stepper2_Status === 'Draft' || stepper2_Status === '' || stepper2_Status === 'Approver 1') && (
                        <button
                            className="btn btn-primary ml-5"
                            onClick={async () => {
                                setIsSendBackLoading(true);
                                await handleSendBack(form.getFieldsValue());
                                setTimeout(() => {
                                    setIsSendBackLoading(false);
                                    // navigate('/job-grid');
                                }, 1000);
                            }}
                        >
                            {isSendBackLoading && <i className="fas fa-spinner fa-spin me-2" />}
                            Send Back
                        </button>
                    )}
                    {(stepper2_Status === 'Draft' || stepper2_Status === '' || stepper2_Status === 'Approver 1') && (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={async () => {
                                setIsLoading(true);
                                await handleSubmit(form.getFieldsValue(), 'Approver 3');
                                setTimeout(() => {
                                    setIsLoading(false);
                                    // navigate('/job-grid');
                                }, 700);
                            }}
                        >
                            {isLoading && <i className="fas fa-spinner fa-spin me-2" />}
                            Create & Send to Approver 3
                        </button>
                    )}
                </Space>
            </div>
        </Form>
    )
}
export default Step3;