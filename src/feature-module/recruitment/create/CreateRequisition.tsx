import { Button, Col, DatePicker, Form, Input, message, Row, Select, Space } from "antd";
import CommonSelect from "../../../core/common/commonSelect";
import { FormEvent, useEffect, useRef, useState } from "react";
import { RootState, useAppDispatch } from "../../../core/data/redux/store";
import { getJobLists, getPositionById, postJob, getJobByJobCode } from "../../../core/data/redux/actions/requisitionActions";
import { formatDate, toNumber, transformArrayToLabelValue } from "../../../utils/misc";
import { useSelector } from "react-redux";
import NumericInput from "../../../components/NumericInput";
import { ArrowLeftOutlined } from "@ant-design/icons";
import DebounceSelect from "../../../components/DebounceSelect";
import { useNavigate, useParams, useSearchParams } from "react-router";
import moment from "moment";
import { getReqruiterDetails_BasedCriteria } from '../../../core/data/redux/actions/jobProfileActions';


const CreateRequisition = (props: any) => {
    const { currentStep, setCurrent, prev } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const positionId = searchParams.get('positionId');
    const reqIdFromUrl = searchParams.get('reqId');
    const stepperFromUrl = searchParams.get('stepper');
    //const jobId = searchParams.get('id');

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
    // const onFinish = (values: any) => {
    //     const formattedValues = {
    //         ...values,
    //         jobPostingEndDate: values.jobPostingEndDate?.format('YYYY-MM-DD') || null
    //     };
    //     handleSubmit(formattedValues, 'Approver 1');
    // };
    const jobs: any = useSelector((state: RootState) => state.jobs) || [];
    const [jobLevel, setJobLevel] = useState<any>(transformArrayToLabelValue(jobs.positionList?.content || []));
    const [jobDepartment, setJobDepartment] = useState<any>(transformArrayToLabelValue(jobs.department?.content || []));
    const [businessUnit, setBusinessUnit] = useState<any>(transformArrayToLabelValue(jobs.businessUnit?.content || []));
    const [organisation, setOrganisation] = useState<any>(transformArrayToLabelValue(jobs.organisation?.content || []));
    const [division, setDivision] = useState<any>(transformArrayToLabelValue(jobs.division?.content || []));
    const [isLoading, setIsLoading] = useState<any>(jobs.loading);
    const [isSaveLoading, setIsSaveLoading] = useState<any>(jobs.loading);
    const [jobData, setJobData] = useState<any>({});
    const [positions, setPositions] = useState<any>({});

    const [organisationName, setOrganisationName] = useState<any[]>([]);
    const [businessUnitName, setBusinessUnitName] = useState<any[]>([]);
    const [divisionName, setDivisionName] = useState<any[]>([]);
    const [departmentName, setDepartmentName] = useState<any[]>([]);

    const [recruiterName, setRecruiterName] = useState<any[]>([]);
    const [hiringManager, setHiringManagerOptions] = useState<any[]>([]);
    const [headOfBusinessUnit, setHeadOfBusinessUnitOptions] = useState<any[]>([]);
    const [headOfRecruitment, setHeadOfRecruitmentOptions] = useState<any[]>([]);


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
    // const recruiterName = [
    //     // { value: "Select", label: "Select" },
    //     { value: "William Stones", label: "William Stones" },
    //     { value: "Lorem Ipsum", label: "Lorem Ipsum" },
    // ];
    const [hasRequisition, setHasRequisition] = useState(false);
    const [form_notifyStatus, setForm_notifyStatus] = useState("");

    useEffect(() => {
        const jobId = localStorage.getItem('requisitionId');
        console.log("jobId", jobId);
        setHasRequisition(!!jobId); // true if exists, false otherwise
        if (positionId) {
            fetchJobByPosition(positionId);
        } else if (jobId) {
            getJobs(jobId);
        }
        if (reqIdFromUrl) {
            getJobs(reqIdFromUrl);
            setCurrent(stepperFromUrl);
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
                setForm_notifyStatus(data.notificationStatus || "")
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
                    endDate: data.endDate ? moment(data?.endDate) : null,
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

    const mapToSelectOptions = (data: string[]) =>
        data.map(name => ({
            label: name,
            value: name
        }));

    // const handlePositionChange = async (posi_id: number) => {
    //     const response: any = await dispatch(getPositionById(posi_id));
    //     const data = response.data;
    //     console.log('fetchJobByPosition', data);
    //     if (response.status !== 200) {
    //         message.error('Error fetching position');
    //     } else {
    //         const positionData = data;
    //         console.log('Position Data', data);
    //         // 2. Get jobCode
    //         const jobCode = positionData.jobCode;
    //         if (!jobCode) {
    //             message.error('Job code not found');
    //             return;
    //         }
    //         const jobCodeNum = Number(jobCode);
    //         if (Number.isNaN(jobCodeNum)) {
    //             message.error('Invalid job code');
    //             return;
    //         }
    //         // 3. Second API using jobCode details fetch job profile
    //         const jobRes: any = await dispatch(getJobByJobCode(jobCodeNum));
    //         if (jobRes.status !== 200) {
    //             message.error('Error fetching job details');
    //             return;
    //         }
    //         const jobDataArr = jobRes.data;

    //         if (!Array.isArray(jobDataArr) || jobDataArr.length === 0) {
    //             message.error('Job data not found');
    //             return;
    //         }
    //         const jobDetails = jobDataArr[0];
    //         const competencyText = jobDetails.competencies
    //             ?.map((c: any) => c.competencyName)
    //             .join(', ');

    //         const criteria = {
    //             organisationId: data.organisationId,
    //             divisionId: data.divisionId,
    //             businessUnitId: data.businessUnitId,
    //             departmentId: data.departmentId
    //         };
    //         //Recruiter Details fetch based Hierarchy
    //         dispatch(
    //             getReqruiterDetails_BasedCriteria(criteria)).then((res: any) => {
    //                 const options = mapToSelectOptions(res.data);
    //                 setHiringManagerOptions(options);
    //                 setHeadOfBusinessUnitOptions(options);
    //                 setHeadOfRecruitmentOptions(options);
    //             });

    //         setTimeout(() => {
    //             form.setFieldsValue({
    //                 ...data,
    //                 ...jobData,
    //                 positionId: data.id,
    //                 payRangeMin: data.minPay,
    //                 payRangeMax: data.maxPay,
    //                 payRangeMid: data.midPay,
    //                 jobPostingEndDate: data.endDate ? moment(data?.endDate) : null,
    //                 jobStartDate: moment(data?.startDate),
    //                 startDate: moment(data?.startDate),
    //                 endDate: data.endDate ? moment(data?.endDate) : null,
    //                 interviewingCompetencies: competencyText ? competencyText : null
    //             });
    //             setPositions(data);
    //             setIsLoading(false);
    //         }, 500);
    //         console.log('fetchJobByPosition payRangeMin', data.m)
    //     }
    // }
    const handlePositionChange = async (posi_id: number) => {
        try {
            setIsLoading(true);

            // 1. Position API
            const response: any = await dispatch(getPositionById(posi_id));
            if (response.status !== 200) {
                message.error('Error fetching position');
                return;
            }

            const data = response.data;

            // 2. Job profile API
            const jobCodeNum = Number(data.jobCode);
            if (!data.jobCode || Number.isNaN(jobCodeNum)) {
                message.error('Invalid job code');
                return;
            }

            const jobRes: any = await dispatch(getJobByJobCode(jobCodeNum));
            if (jobRes.status !== 200 || !Array.isArray(jobRes.data)) {
                message.error('Job data not found');
                return;
            }

            const jobDetails = jobRes.data[0];

            const competencyText = jobDetails?.competencies
                ?.map((c: any) => c.competencyName)
                .join(', ');

            // 3. Recruiter API
            const criteria = {
                organisationId: data.organisationId,
                divisionId: data.divisionId,
                businessUnitId: data.businessUnitId,
                departmentId: data.departmentId
            };

            const recruiterRes: any = await dispatch(
                getReqruiterDetails_BasedCriteria(criteria)
            );

            if (recruiterRes?.status === 200) {
                const options = mapToSelectOptions(recruiterRes.data || []);
                setHiringManagerOptions(options);
                setHeadOfBusinessUnitOptions(options);
                setHeadOfRecruitmentOptions(options);
            }

            // 4. Set form values (NO timeout)
            form.setFieldsValue({
                ...data,
                ...jobDetails,
                positionId: data.id,
                payRangeMin: data.minPay,
                payRangeMax: data.maxPay,
                payRangeMid: data.midPay,
                jobPostingEndDate: data.endDate ? moment(data.endDate) : null,
                jobStartDate: moment(data.startDate),
                startDate: moment(data.startDate),
                endDate: data.endDate ? moment(data.endDate) : null,
                interviewingCompetencies: competencyText || null
            });

            setPositions(data);
        } catch (err) {
            console.error(err);
            message.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };


    const handleSubmit = async (formValues: any, sts: 'Draft' | 'Approver 1') => {
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
        formValues.id = jobData?.id || undefined;
        formValues.jobStartDate = formatDate(new Date());
        formValues.reasonForVacancy = "New Position";
        formValues.jobPostingStartDate = formatDate(new Date());
        formValues.notificationStatus = sts;
        // formValues.jobClassification = "IT";
        // formValues.locationId = 1;
        // formValues.currencyId = 1;
        // formValues.payGrade = "G5";
        // formValues.recruiter = "William Stones";
        // formValues.hiringManager = "William Stones";
        // formValues.headOfBusinessUnit = "William Stones";
        // formValues.headOfRecruitment = "William Stones";
        // formValues.recruiterName = "William Stones";
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
                navigate('/job-grid')
                // setCurrent(1);
            }, 700);
        } else {
            console.log(response);
            setIsLoading(false);
             setIsSaveLoading(false);
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
                // onFinish={onFinish}
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
                                onChange={(value: any) => {
                                    handlePositionChange(value)
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="jobCode"
                            label="Job Code"
                            rules={[{ required: true, message: 'Missing the Job Code!' }]}
                        >
                            <Input readOnly style={{ cursor: 'not-allowed' }} />
                        </Form.Item>
                    </Col>
                    {/* <Col className="gutter-row" span={12}>
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
                    </Col> */}
                    <Col className="gutter-row" span={12}>
                        {/* Display only */}
                        <Form.Item name="organisationName" label="Organisation">
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
                    </Col>
                    {/* <Col className="gutter-row" span={12}>
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
                    </Col> */}
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
                    {/* <Col className="gutter-row" span={12}>
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
                    </Col> */}
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
                    {/* <Col className="gutter-row" span={12}>
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
                    </Col> */}
                    <Col className="gutter-row" span={12}>
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
                    </Col>
                    <Col className="gutter-row" span={12}>
                        {/* Display only */}
                        <Form.Item name="recruiterName" label="Recruiter Name">
                            <Input
                                readOnly
                                value={recruiterName}
                                style={{ cursor: 'not-allowed' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="hiringManager"
                            label="Hiring Manager"
                        >
                            <Select
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="label"
                                filterSort={(optionA: any, optionB: any) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={hiringManager}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
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
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="headOfRecruitment"
                            label="Head Of Recruitment"
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
                    </Col>
                    {/* <Col className="gutter-row" span={12}>
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
                    </Col> */}
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
                        {form_notifyStatus === "" && (
                            <button
                                className="btn btn-primary ml-5"
                                onClick={async () => {
                                    setIsSaveLoading(true);
                                    const formattedValues = {
                                        ...form.getFieldsValue(),
                                        jobPostingEndDate: form.getFieldsValue().jobPostingEndDate?.format('YYYY-MM-DD') || null
                                    };
                                    await handleSubmit(formattedValues, 'Draft');
                                    setTimeout(() => {
                                        setIsSaveLoading(false);
                                        navigate('/job-grid');
                                    }, 2000);
                                }}
                            >
                                {isSaveLoading && <i className="fas fa-spinner fa-spin me-2" />}
                                Save & Close
                            </button>
                        )}
                        {(form_notifyStatus === 'Draft' || form_notifyStatus === '') && (
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={async () => {
                                    setIsLoading(true);
                                    const formattedValues = {
                                        ...form.getFieldsValue(),
                                        jobPostingEndDate: form.getFieldsValue().jobPostingEndDate?.format('YYYY-MM-DD') || null
                                    };
                                    await handleSubmit(formattedValues, 'Approver 1');
                                    setTimeout(() => {
                                        setIsLoading(false);
                                        navigate('/job-grid');
                                    }, 2000);
                                }}
                            >
                                {isLoading && <i className="fas fa-spinner fa-spin me-2" />}
                                Create & Send to Approver 1
                            </button>
                        )}
                    </Space>
                </div>
            </Form>
        </>
    )
}
export default CreateRequisition;