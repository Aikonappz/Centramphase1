import { Button, Col, DatePicker, Form, Input, message, Row, Select, Space, Typography } from "antd";
import CommonSelect from "../../../core/common/commonSelect";
import { FormEvent, useEffect, useRef, useState } from "react";
import { RootState, useAppDispatch } from "../../../core/data/redux/store";
import { postJob, saveManagerReview } from "../../../core/data/redux/actions/requisitionActions";
import { formatDate, toNumber, transformArrayToLabelValue } from "../../../utils/misc";
import { useSelector } from "react-redux";
import NumericInput from "../../../components/NumericInput";
import { ArrowLeftOutlined } from "@ant-design/icons";
import DebounceSelect from "../../../components/DebounceSelect";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const { Paragraph } = Typography;

const Step2 = (props: any) => {
    const { currentStep, setCurrent, prev } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [form] = Form.useForm();

    // const onFinish = (values: any) => {
    //     console.log('Received values of form: ', values);
    //     handleSubmit(values);
    // };
    const [jobCode, setJobCode] = useState('');
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

    useEffect(() => {
        if (jobs.jobById) {
            form.setFieldsValue({
                internalJobTitle: jobs.jobById?.jobTitle,
                internalJobDescription: jobs.jobById?.jobDescription,
                jobStartDate: jobs.jobPostingStartDate,
                jobPostingEndDate: jobs.jobPostingEndDate,
                ...jobs.jobById,
            });
            setJobData(jobs.jobById);
        }
    }, [jobs.jobById, form]);

    const handleSubmit = async (formValues: any) => {
        setIsLoading(true);
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
        formValues.jobPostingStartDate = formatDate(new Date());
        formValues.jobClassification = "IT";
        formValues.locationId = 1;
        formValues.currencyId = 1;
        formValues.payGrade = "G5";
        formValues.recruiter = "John Doe";
        formValues.hiringManager = "Jane Smith";
        formValues.headOfBusinessUnit = "Michael Johnson";
        formValues.headOfRecruitment = "Sarah Williams";

        // ✅ ensure id is not present
        delete formValues.id;

        const response: any = await dispatch(saveManagerReview(formValues));
        if (response.status === 200) {
            setIsLoading(false);
            messageApi.open({
                key,
                type: 'success',
                content: jobData?.id ? 'Updated successfully!' : 'Saved successfully!',
                duration: 7,
            });
            localStorage.setItem('managerReviewId', response?.data?.id);
            setTimeout(() => {
                setCurrent(2);
            }, 700);
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
        formValues.notificationStatus = "Approver 0";
        // ✅ ensure id is not present
        delete formValues.id;

        const response: any = await dispatch(saveManagerReview(formValues));
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
                setCurrent(2);
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

            <Row gutter={{ xs: 6, sm: 12, md: 12, lg: 12 }}>
                <Col className="gutter-row" span={12}>
                    {/* <Form.Item
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
                    </Form.Item> */}
                    <Form.Item
                        name="requisitionStatus"
                        label="Requisition Status"
                        rules={[{ required: true, message: 'Please enter requisition status!' }]}
                    >
                        <Input readOnly style={{ cursor: 'not-allowed' }} />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="id"
                        label="Requisition ID"
                        rules={[{ required: true, message: 'Please select department!' }]}
                    >
                        <Typography.Text>{form.getFieldValue('id')}</Typography.Text>
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="jobCode"
                        label="Job Code"
                        rules={[{ required: true, message: 'Please enter job code!' }]}
                    >
                        <Input readOnly style={{ cursor: 'not-allowed' }} />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    {/* <Form.Item
                        name="jobStartDate"
                        label="Job Start Date"
                        rules={[{ required: true, message: 'Please select job start date!' }]}
                        valuePropName="date"
                        getValueFromEvent={(momentObj) => momentObj ? momentObj.format('YYYY-MM-DD') : null}
                    >
                        <DatePicker />
                    </Form.Item> */}
                    <Form.Item
                        name="jobStartDate"
                        label="Job Start Date"
                        rules={[{ required: true, message: 'Please enter job start date!' }]}
                    >
                        <Input readOnly style={{ cursor: 'not-allowed' }} />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    {/* <Form.Item
                        name="jobEndDate"
                        label="Job Expired Date"
                        rules={[{ required: true, message: 'Please select job expired date!' }]}
                        valuePropName="date"
                        getValueFromEvent={(momentObj) => momentObj ? momentObj.format('YYYY-MM-DD') : null}
                    >
                        <DatePicker />
                    </Form.Item> */}
                    <Form.Item
                        name="jobPostingEndDate"
                        label="Job Expired Date"
                        rules={[{ required: true, message: 'Please enter job expired date!' }]}
                    >
                        <Input readOnly style={{ cursor: 'not-allowed' }} />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
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
                </Col>
                <Col className="gutter-row" span={12}>
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
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="internalJobTitle"
                        label="Internal Job Title"
                        rules={[{ required: true, message: 'Please select job type!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="internalJobDescription"
                        label="Job Description"
                        rules={[{ required: true, message: 'Please enter job description!' }]}
                    >
                        <Input.TextArea showCount maxLength={100} />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="externalJobTitle"
                        label="External Job Title"
                        rules={[{ required: true, message: 'Please select job type!' }]}
                    >
                        <Input suffix={<Button type="link" onClick={() => form.setFieldValue('externalJobTitle', (form.getFieldValue('internalJobTitle')))}>Same as internal</Button>} />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="externalJobDescription"
                        label="External Job Description"
                        rules={[{ required: true, message: 'Please enter job description!' }]}
                    >
                        <Input showCount maxLength={100} suffix={<Button type="link" onClick={() => form.setFieldValue('externalJobDescription', (form.getFieldValue('internalJobDescription')))}>Same as internal</Button>} />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="levelOfExperience"
                        label="Level of Experience"
                        rules={[{ required: true, message: 'Please select job level!' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="label"
                            filterSort={(optionA: any, optionB: any) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={joblevel}
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
                    <button
                        className="btn btn-primary ml-5"
                        onClick={async () => {
                            setIsSaveLoading(true);
                            await handleSubmit(form.getFieldsValue());
                            setTimeout(() => {
                                setIsSaveLoading(false);
                                navigate('/job-grid');
                            }, 2000);
                        }}
                    >
                        {isSaveLoading && <i className="fas fa-spinner fa-spin me-2" />}
                        Save & Close
                    </button>
                    <button
                        className="btn btn-primary ml-5"
                        onClick={async () => {
                            setIsSendBackLoading(true);
                            await handleSendBack(form.getFieldsValue());
                            setTimeout(() => {
                                setIsSendBackLoading(false);
                                navigate('/job-grid');
                            }, 1000);
                        }}
                    >
                        {isSendBackLoading && <i className="fas fa-spinner fa-spin me-2" />}
                        Send Back
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={async () => {
                            setIsLoading(true);
                            await handleSubmit(form.getFieldsValue());
                            setTimeout(() => {
                                setIsLoading(false);
                                navigate('/job-grid');
                            }, 2000);
                        }}
                    >
                        {isLoading && <i className="fas fa-spinner fa-spin me-2" />}
                        Create & Send to Approver 2
                    </button>
                </Space>
            </div>
        </Form>
    )
}
export default Step2;