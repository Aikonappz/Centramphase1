import { Button, Col, DatePicker, Form, Input, message, Row, Select, Space, Typography } from "antd";
import CommonSelect from "../../../core/common/commonSelect";
import { FormEvent, useEffect, useRef, useState } from "react";
import { RootState, useAppDispatch } from "../../../core/data/redux/store";
import { postJob, saveManagerReview, saveRecruiterLeadReview, saveRecruiterReview } from "../../../core/data/redux/actions/requisitionActions";
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

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        handleSubmit(values);
    };
    const [jobCode, setJobCode] = useState('889AB');
    const jobs: any = useSelector((state: RootState) => state.jobs) || [];
    const [jobDepartment, setJobDepartment] = useState<any>(transformArrayToLabelValue(jobs.department?.content || []));
    const [businessUnit, setBusinessUnit] = useState<any>(transformArrayToLabelValue(jobs.businessUnit?.content || []));
    const [organisation, setOrganisation] = useState<any>(transformArrayToLabelValue(jobs.organisation?.content || []));
    const [division, setDivision] = useState<any>(transformArrayToLabelValue(jobs.division?.content || []));
    const [isLoading, setIsLoading] = useState<any>(jobs.loading);
    const [jobData, setJobData] = useState<any>({});
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';

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
                ...jobs.jobById
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
        formValues.jobPostingStartDate = formatDate(new Date());
        formValues.jobClassification = "IT";
        formValues.locationId = 1;
        formValues.currencyId = 1;
        formValues.payGrade = "G5";
        formValues.recruiter = "John Doe";
        formValues.hiringManager = "Jane Smith";
        formValues.headOfBusinessUnit = "Michael Johnson";
        formValues.headOfRecruitment = "Sarah Williams";
        const response: any = await dispatch(saveRecruiterReview(formValues));
        if (response.status === 200) {
            setIsLoading(false);
            messageApi.open({
                key,
                type: 'success',
                content: jobData?.id ? 'Updated successfully!' : 'Saved successfully!',
                duration: 7,
            });
            localStorage.setItem('recruiterReviewId', response?.data?.id);
            setTimeout(() => {
                setCurrent(4);
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
                        name="requisitionStatus"
                        label="Requisition Status"
                        rules={[{ required: true, message: 'Please enter requisition status!' }]}
                    >
                        <Paragraph>
                            <Typography.Text strong>Ready for posting!</Typography.Text>
                        </Paragraph>
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
                        Cancel & Return to Form
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        {isLoading && <i className="fas fa-spinner fa-spin me-2" />}
                        Ready for Posting
                    </button>
                </Space>
            </div>
        </Form>
    )
}
export default Step4;