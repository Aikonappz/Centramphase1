import { Button, Col, DatePicker, Form, Input, message, Row, Select, Space, Typography } from "antd";
import CommonSelect from "../../../core/common/commonSelect";
import { FormEvent, useEffect, useRef, useState } from "react";
import { RootState, useAppDispatch } from "../../../core/data/redux/store";
import { postJob, saveManagerReview, saveRecruiterLeadReview, saveRecruiterReview, getJobLists, getRecruiterReviewByRequisitionID } from "../../../core/data/redux/actions/requisitionActions";
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

const Step4 = (props: any) => {
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
    const [stepper3_Status, setStepper3_Status] = useState("");
    const [recruiterReview_Id, setRecruiterReview_Id] = useState("");

    const joblevel = [
        { value: "Entry-Level", label: "Entry Level" },
        { value: "Mid-Level", label: "Mid Level" },
        { value: "Senior-Level", label: "Senior Level" },
    ];
    const requisitionStatus = [
        // { value: "Select", label: "Select" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
    ];

    useEffect(() => {
        if (jobs.jobById) {
            form.setFieldsValue({
                internalJobTitle: jobs.jobById?.jobTitle,
                internalJobDescription: jobs.jobById?.jobDescription,
                ...jobs.jobById
            });
            setJobData(jobs.jobById);
        }
    }, [jobs.jobById, form]);

    useEffect(() => {
        const jobId = localStorage.getItem('requisitionId');
        if (jobId) {
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
                setStepper3_Status(data.stepper3Status || "")
                setIsLoading(false);
                setIsSaveLoading(false);
                setIsSendBackLoading(false);
                if (data.stepper3Status === "Draft") {
                    getRecruiterReviewDetails(reqId)
                }
            }, 500);
        }
    }

    const getRecruiterReviewDetails = async (reqId: any) => {
            setIsLoading(true);
            const response: any = await dispatch(getRecruiterReviewByRequisitionID(reqId));
            const data = response.data;
            if (response.status !== 200) {
                message.error('Error fetching Manager Review by Req Id');
            } else {
                setTimeout(() => {
                    setRecruiterReview_Id(data.id)
                    // form.setFieldsValue({
                    //     internalJobTitle: jobs.jobById?.jobTitle,
                    // });
                }, 500);
            }
        }

    const handleSubmit = async (formValues: any, sts: 'Draft' | 'Approver 4') => {
        const query = form.getFieldValue("internalQuery");

        const hasAnyValue = [query].every(v =>
            typeof v === "string"
                ? v.trim() !== ""
                : v !== undefined && v !== null
        );
        if (!hasAnyValue) {
            messageApi.error("Please fill at least one field");
            return; // ⛔ HARD STOP — API will NOT run
        }
        if (sts === 'Draft') {
            setIsSaveLoading(true);
        } else {
            setIsLoading(true);
        }
        messageApi.open({
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
        delete formValues.id;
        if (localStorage.getItem('stepper4Id') !== "") {
            // formValues.id = localStorage.getItem('recruiterReviewId') || undefined;
            formValues.id = localStorage.getItem('stepper4Id') || undefined;
        }
        formValues.positionId = jobData?.positionId || undefined;
        formValues.jobStartDate = formatDate(new Date());
        formValues.reasonForVacancy = "New Position";
        formValues.notificationStatus = sts;
        // formValues.jobPostingStartDate = formatDate(new Date());

        const response: any = await dispatch(saveRecruiterReview(formValues));
        if (response.status === 200) {
            setIsLoading(false);
            setIsSaveLoading(true);
            messageApi.open({
                key,
                type: 'success',
                content: jobData?.id ? 'Updated successfully!' : 'Saved successfully!',
                duration: 7,
            });
            localStorage.setItem('recruiterReviewId', response?.data?.id);
            localStorage.setItem('stepper4Id', response?.data?.id);
            setTimeout(() => {
                if (sts === "Draft") {
                    navigate('/job-grid');
                } else {
                    setCurrent(4);
                }
            }, 700)
        } else {
            console.log(response);
            setIsLoading(false);
            setIsSaveLoading(true);
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
        formValues.id = localStorage.getItem('recruiterReviewId') || undefined;
        formValues.positionId = jobData?.positionId || undefined;
        formValues.jobStartDate = formatDate(new Date());
        formValues.reasonForVacancy = "New Position";
        formValues.notificationStatus = "Approver 1";
        const response: any = await dispatch(saveRecruiterReview(formValues));
        if (response.status === 200) {
            setIsSendBackLoading(false);
            messageApi.open({
                key,
                type: 'success',
                content: jobData?.id ? 'Updated successfully!' : 'Saved successfully!',
                duration: 7,
            });
            localStorage.setItem('recruiterReviewId', response?.data?.id);
            setTimeout(() => {
                navigate('/job-grid');
                // setCurrent(4);
            }, 700)
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
                        name="internalQuery"
                        label="Query"
                        rules={[{ required: true, message: 'Please enter a query!' }]}
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
                        <Paragraph>
                            <Typography.Text strong>Ready to create requisition!</Typography.Text>
                        </Paragraph>
                    </Form.Item>
                </Col>

            </Row>
            <div className="modal-footer">
                <Space size="middle">
                    {/* {currentStep > 0 && (
                        <Button
                            style={{ margin: '0 8px' }}
                            onClick={() => prev()}
                            icon={<ArrowLeftOutlined />}
                        >
                            Send Back to Recruiter
                        </Button>
                    )} */}
                    <button
                        type="button"
                        className="btn btn-light me-2"
                        onClick={() => { navigate('/job-grid') }}
                    >
                        Cancel & Return to Form
                    </button>
                    {stepper3_Status === "" && (
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
                    {(stepper3_Status === 'Draft' || stepper3_Status === '') && (
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
                    {(stepper3_Status === 'Draft' || stepper3_Status === '') && (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={async () => {
                                setIsLoading(true);
                                await handleSubmit(form.getFieldsValue(), 'Approver 4');
                                setTimeout(() => {
                                    setIsLoading(false);
                                    // navigate('/job-grid');
                                }, 700);
                            }}
                        >
                            {isLoading && <i className="fas fa-spinner fa-spin me-2" />}
                            Create Requisition
                        </button>
                    )}
                </Space>
            </div>
        </Form>
    )
}
export default Step4;