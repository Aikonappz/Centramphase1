import { Button, Col, DatePicker, Form, Input, message, Row, Select, Space, InputNumber } from "antd";
import CommonSelect from "../../../core/common/commonSelect";
import { FormEvent, useEffect, useRef, useState } from "react";
import { RootState, useAppDispatch } from "../../../core/data/redux/store";
import { getJobLists, getPositionById, postJob, getJobByJobCode, getRequisitionNextCode } from "../../../core/data/redux/actions/requisitionActions";
import { formatDate, toNumber, transformArrayToLabelValue } from "../../../utils/misc";
import { useSelector } from "react-redux";
import NumericInput from "../../../components/NumericInput";
import { ArrowLeftOutlined } from "@ant-design/icons";
import DebounceSelect from "../../../components/DebounceSelect";
import { useNavigate, useParams, useSearchParams } from "react-router";
import moment from "moment";
import { getReqruiterDetails_BasedCriteria, getReqruitingManagerDetails_BasedCriteria } from '../../../core/data/redux/actions/jobProfileActions';
import { OverlayTrigger, Tooltip as BootstrapTooltip } from "react-bootstrap";
import { InfoCircleOutlined } from '@ant-design/icons';
import dayjs from "dayjs";

const { Option } = Select;

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
    // console.log(
    //     "jobs.positionList formatted:",
    //     JSON.stringify(jobs?.positionList, null, 2)
    // );
    // const [jobLevel, setJobLevel] = useState<any>(transformArrayToLabelValue(jobs.positionList?.content || []));
    const jobLevel = transformArrayToLabelValue(
        (jobs.positionList?.content || []).map((job: any) => ({
            ...job,
            name: `${job.name} - ${job.code}`
        }))
    );
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
    const [locationName, setLocationName] = useState<any[]>([]);
    const [requisitionCode, setRequisitionCode] = useState<string>("");

    const [recruiterName, setRecruiterName] = useState<any[]>([]);
    const [hiringManager, setHiringManagerOptions] = useState<any[]>([]);
    const [headOfBusinessUnit, setHeadOfBusinessUnitOptions] = useState<any[]>([]);
    const [headOfRecruitment, setHeadOfRecruitmentOptions] = useState<any[]>([]);
    const [locationOptions, setLocationOptions] = useState<any[]>([]);
    const [currency, setCurrency] = useState("$");

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
        { value: "Cancelled", label: "Cancelled" },
    ];
    // const recruiterName = [
    //     // { value: "Select", label: "Select" },
    //     { value: "William Stones", label: "William Stones" },
    //     { value: "Lorem Ipsum", label: "Lorem Ipsum" },
    // ];
    const [hasRequisition, setHasRequisition] = useState(false);
    const [form_notifyStatus, setForm_notifyStatus] = useState("");

    const [loginRole, setLoginRole] = useState("");
    const [Username, setUsername] = useState("");

    useEffect(() => {
        setLoginRole(sessionStorage.getItem("login_role") || "");
        setUsername(sessionStorage.getItem("username") || "");
    }, []);

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

    useEffect(() => {
        const fetchPositionNextCode = async () => {
            const existingReqId = localStorage.getItem('requisitionId');
            // form.setFieldsValue({
            //     requisitionCode: response.data
            // });
            if (existingReqId) {
                setRequisitionCode(existingReqId)
            } else {
                const response: any = await dispatch(getRequisitionNextCode());
                setRequisitionCode(response.data)
            }
        };
        fetchPositionNextCode();
    }, [dispatch]);

    useEffect(() => {
        if (positionId) {
            handlePositionChange(Number(positionId));
        }
    }, [positionId]);

    useEffect(() => {
        const fetchRecruitingManager = async () => {

            const formValues = form.getFieldsValue();

            const criteria = {
                organisationId: formValues.organisationId,
                businessUnitId: formValues.businessUnitId,
                divisionId: formValues.divisionId,
                departmentId: formValues.departmentId
            };

            console.log("Recruiting Manager Criteria:", criteria);

            const recruitingManagerRes: any = await dispatch(
                getReqruitingManagerDetails_BasedCriteria(criteria)
            );

            if (recruitingManagerRes?.status === 200) {
                const options = mapToSelectOptions(
                    recruitingManagerRes.data || []
                );

                setHeadOfRecruitmentOptions(options);

                if (options.length > 0) {
                    form.setFieldsValue({
                        headOfRecruitment: options[0].value
                    });
                }
            }
        };

        fetchRecruitingManager();
    }, [dispatch]);

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
            form.setFieldsValue({
                jobTitle: jobDetails?.jobRoleName,
            })

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
                // setHeadOfRecruitmentOptions(options);
                setLocationOptions(options);
            }

            const recruitingManagerRes: any = await dispatch(
                getReqruitingManagerDetails_BasedCriteria(criteria)
            );

            if (recruitingManagerRes?.status === 200) {
                const options = mapToSelectOptions(recruitingManagerRes.data || []);
                // setHiringManagerOptions(options);
                // setHeadOfBusinessUnitOptions(options);
                setHeadOfRecruitmentOptions(options);
                // Set first option as default
                if (options.length > 0) {
                    form.setFieldsValue({
                        headOfRecruitment: options[0].value
                    });
                }
                // setLocationOptions(options);
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

        formValues.currency = currency;
        formValues.jobGrade = formValues.jobGrade;
        formValues.jobLevel = formValues.jobLevel;
        formValues.jobDescription = formValues.jobDescription;
        formValues.numberOfOpenings = formValues.numberOfOpenings;
        formValues.jobPostingEndDate = formValues.jobPostingEndDate
            ? dayjs(formValues.jobPostingEndDate).format("YYYY-MM-DD")
            : null;
        // formValues.jobClassification = "IT";
        // formValues.locationId = 1;
        // formValues.currencyId = 1;
        // formValues.payGrade = "G5";
        // formValues.recruiter = "William Stones";
        // formValues.hiringManager = Username;
        formValues.hiringManager = "Hiring Manager";
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
                                    // disabled={loginRole === "HIRING_MANAGER"}
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
                                <Select
                                    showSearch
                                    placeholder="Search to Select"
                                    optionFilterProp="label"
                                    // disabled={loginRole === "HIRING_MANAGER"}
                                    filterSort={(optionA: any, optionB: any) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={jobLevel}
                                    onChange={(value: any) => {
                                        handlePositionChange(value)
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="jobCode"
                                label="Job Code"
                                rules={[{ required: true, message: 'Missing the Job Code!' }]}
                            >
                                <Input readOnly
                                    // disabled={loginRole === "HIRING_MANAGER"} 
                                    style={{ cursor: 'not-allowed' }} />
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
                                <Input readOnly
                                // disabled={loginRole === "HIRING_MANAGER"} 
                                />
                            </Form.Item>

                            <Form.Item
                                name="jobDescription"
                                label="Job Description"
                                rules={[{ required: true, message: 'Please enter job description!' }]}
                            >
                                <Input.TextArea showCount
                                // disabled={loginRole === "HIRING_MANAGER"} 
                                />
                            </Form.Item>

                            <Form.Item
                                name="jobGrade"
                                label="Job Grade"
                                rules={[{ required: true, message: 'Please enter job grade!' }]}
                            >
                                <Input
                                // disabled={loginRole === "HIRING_MANAGER"} 
                                />
                            </Form.Item>

                            <Form.Item
                                name="jobLevel"
                                label="Job Level"
                                rules={[{ required: true, message: 'Please enter job level!' }]}
                            >
                                <Input
                                // disabled={loginRole === "HIRING_MANAGER"} 
                                />
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
                                <DatePicker style={{ width: '100%' }} />
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
                {loginRole === "HIRING_MANAGER" ?
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
                                            // navigate('/job-grid');
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
                                            // navigate('/job-grid');
                                        }, 2000);
                                    }}
                                >
                                    {isLoading && <i className="fas fa-spinner fa-spin me-2" />}
                                    Create & Send to Approver 1
                                </button>
                            )}
                        </Space>
                    </div>
                    : ""}
            </Form>
        </>
    )
}
export default CreateRequisition;