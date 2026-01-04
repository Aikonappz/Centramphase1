import { Button, Col, DatePicker, Form, Input, message, Row, Select, Space } from "antd";
import CommonSelect from "../../../core/common/commonSelect";
import { FormEvent, useEffect, useRef, useState } from "react";
import { RootState, useAppDispatch } from "../../../core/data/redux/store";
import { getJobLists, getPositionById, postJob } from "../../../core/data/redux/actions/requisitionActions";
import { formatDate, toNumber, transformArrayToLabelValue } from "../../../utils/misc";
import { useSelector } from "react-redux";
import NumericInput from "../../../components/NumericInput";
import { ArrowLeftOutlined } from "@ant-design/icons";
import DebounceSelect from "../../../components/DebounceSelect";
import { useNavigate, useParams, useSearchParams } from "react-router";
import moment from "moment";

const CreateRequisition = (props: any) => {
    const { currentStep, setCurrent, prev } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const positionId = searchParams.get('positionId');
    //const jobId = searchParams.get('id');
    
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
    const onFinish = (values: any) => {
        const formattedValues = {
            ...values,
            jobPostingEndDate: values.jobPostingEndDate?.format('YYYY-MM-DD') || null
        };
        handleSubmit(formattedValues);
    };
    const jobs: any = useSelector((state: RootState) => state.jobs) || [];
    const [jobLevel, setJobLevel] = useState<any>(transformArrayToLabelValue(jobs.positionList?.content || []));
    const [jobDepartment, setJobDepartment] = useState<any>(transformArrayToLabelValue(jobs.department?.content || []));
    const [businessUnit, setBusinessUnit] = useState<any>(transformArrayToLabelValue(jobs.businessUnit?.content || []));
    const [organisation, setOrganisation] = useState<any>(transformArrayToLabelValue(jobs.organisation?.content || []));
    const [division, setDivision] = useState<any>(transformArrayToLabelValue(jobs.division?.content || []));
    const [isLoading, setIsLoading] = useState<any>(jobs.loading);
    const [jobData, setJobData] = useState<any>({});
    const [positions, setPositions] = useState<any>({});


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
    const recruiterName = [
        // { value: "Select", label: "Select" },
        { value: "William Stones", label: "William Stones" },
        { value: "Lorem Ipsum", label: "Lorem Ipsum" },
    ];

    useEffect(() => {
        const jobId = localStorage.getItem('requisitionId');
        console.log("jobId", jobId);
        if (positionId) {
            fetchJobByPosition(positionId);
        } else if (jobId) {
            getJobs(jobId);
        }
    }, [positionId]);

    const getJobs = async (reqId: any) => {
        setIsLoading(true);
        const response: any = await dispatch(getJobLists(reqId));
        const data = response.data;
        if (response.status !== 200) {
            setIsLoading(false);
            message.error('Error fetching position');
        } else {
            setTimeout(() => {
                form.setFieldsValue({
                    ...data,
                    ...positions,
                    jobPostingEndDate: data.jobPostingEndDate ? moment(data?.jobPostingEndDate) : new Date(),
                });
                setJobData(data);
                setIsLoading(false);
            }, 500);
        }
    }

    const fetchJobByPosition = async (reqId: any) => {
        const response: any = await dispatch(getPositionById(positionId));
        const data = response.data;
        console.log('fetchJobByPosition', data);
        if (response.status !== 200) {
            message.error('Error fetching position');
        } else {
            setTimeout(() => {
                form.setFieldsValue({
                    ...data,
                    ...jobData,
                    positionId: data.id,
                    payRangeMin: data.minPay,
                    payRangeMax: data.maxPay,
                    payRangeMid: data.midPay,
                    jobPostingEndDate: data.endDate ? moment(data?.endDate) : null,
                    jobStartDate: moment(data?.startDate),
                    startDate: moment(data?.startDate),
                    endDate: data.endDate ? moment(data?.endDate) : null
                });
                setPositions(data);
                setIsLoading(false);
            }, 500);
            console.log('fetchJobByPosition payRangeMin', data.m)
        }
    }

    const removeQueryParam = (paramName: any) => {
        searchParams.delete(paramName);
        setSearchParams(searchParams);
    };

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
        formValues.id = jobData?.id || undefined;
        // formValues.jobStartDate = formatDate(new Date());
        formValues.reasonForVacancy = "New Position";
        formValues.jobPostingStartDate = formatDate(new Date());
        formValues.jobClassification = "IT";
        formValues.locationId = 1;
        formValues.currencyId = 1;
        formValues.payGrade = "G5";
        formValues.recruiter = "William Stones";
        formValues.hiringManager = "William Stones";
        formValues.headOfBusinessUnit = "William Stones";
        formValues.headOfRecruitment = "William Stones";
        formValues.recruiterName = "William Stones";
        const response: any = await dispatch(postJob(formValues));
        if (response.status === 200) {
            setIsLoading(false);
            messageApi.open({
                key,
                type: 'success',
                content: jobData?.id ? 'Updated successfully!' : 'Saved successfully!',
                duration: 7,
            });
            localStorage.setItem('requisitionId', response?.data?.id);
            removeQueryParam('positionId');
            setTimeout(() => {
                setCurrent(1);
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
        <>
            {contextHolder}
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
                            <Input.TextArea showCount />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="positionId"
                            label="Position"
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
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="recruiterName"
                            label="Recruiter Name"
                            rules={[{ required: true, message: 'Please enter Recruiter Name!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="label"
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={recruiterName}
                            />
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
                            label="End Date"
                            rules={[{ required: true, message: 'Please select job expired date!' }]}
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                        {/* <Form.Item
                            name="jobPostingEndDate"
                            label="Job Expired Date"
                            rules={[{ required: true, message: 'Please select job expired date!' }]}
                            valuePropName="date"
                            getValueFromEvent={(momentObj) => momentObj ? momentObj.format('YYYY-MM-DD') : null}
                        >
                            <DatePicker format="YYYY-MM-DD" />
                        </Form.Item> */}
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
                <div className="modal-footer">
                    <Space size="middle">
                        <button
                            type="button"
                            className="btn btn-light me-2"
                            onClick={() => { navigate('/job-grid') }}
                        >
                            Cancel Job Requisition
                        </button>
                        <button
                            className="btn btn-primary ml-5"
                            onClick={async () => {
                                setIsLoading(true);
                                const formattedValues = {
                                    ...form.getFieldsValue(),
                                    jobPostingEndDate: form.getFieldsValue().jobPostingEndDate?.format('YYYY-MM-DD') || null
                                };
                                await handleSubmit(formattedValues);
                                setTimeout(() => {
                                    setIsLoading(false);
                                    navigate('/job-grid');
                                }, 2000);
                            }}
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
        </>
    )
}
export default CreateRequisition;