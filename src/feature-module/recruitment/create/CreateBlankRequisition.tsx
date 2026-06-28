import { Button, Col, DatePicker, Form, Input, message, Row, Select, Space } from "antd";
import CommonSelect from "../../../core/common/commonSelect";
import { FormEvent, useEffect, useRef, useState } from "react";
import { RootState, useAppDispatch } from "../../../core/data/redux/store";
import { blankpostJob, getJobLists, getPositionById, postJob, getLocations } from "../../../core/data/redux/actions/requisitionActions";
import { formatDate, toNumber, transformArrayToLabelValue } from "../../../utils/misc";
import { useSelector } from "react-redux";
import NumericInput from "../../../components/NumericInput";
import { ArrowLeftOutlined } from "@ant-design/icons";
import DebounceSelect from "../../../components/DebounceSelect";
import { useNavigate, useParams, useSearchParams } from "react-router";
import moment from "moment";
import { getReqruiterDetails_BasedCriteria } from '../../../core/data/redux/actions/jobProfileActions';

const CreateBlankRequisition = (props: any) => {
    const { currentStep, setCurrent, prev } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const positionId = searchParams.get('positionId');
    const jobId = searchParams.get('id');

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
    // const onFinish = (values: any) => {
    //     const formattedValues = {
    //         ...values,
    //         jobPostingEndDate: values.jobPostingEndDate?.format('YYYY-MM-DD') || null
    //     };
    //     handleSubmit(formattedValues);
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

    //Hierarchy Based modification
    const [allOrganisations, setAllOrganisations] = useState<any[]>([]);
    const [allBusinessUnits, setAllBusinessUnits] = useState<any[]>([]);
    const [allDivisions, setAllDivisions] = useState<any[]>([]);
    const [allDepartments, setAllDepartments] = useState<any[]>([]);
    const [allLocations, setAllLocations] = useState<any[]>([]);

    const [organisationOptions, setOrganisationOptions] = useState<any[]>([]);
    const [businessUnitOptions, setBusinessUnitOptions] = useState<any[]>([]);
    const [divisionOptions, setDivisionOptions] = useState<any[]>([]);
    const [departmentOptions, setDepartmentOptions] = useState<any[]>([]);
    const [locationOptions, setLocationOptions] = useState<any[]>([]);

    const [hiringManager, setHiringManagerOptions] = useState<any[]>([]);
    const [headOfBusinessUnit, setHeadOfBusinessUnitOptions] = useState<any[]>([]);
    const [headOfRecruitment, setHeadOfRecruitmentOptions] = useState<any[]>([]);
    const [recruiter, setRecruitOptions] = useState<any[]>([]);


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
        { value: "Cancelled", label: "Cancelled" },
        { value: "Closed", label: "Closed" },
        { value: "Open", label: "Open" },
    ];

    useEffect(() => {
        const jobId = localStorage.getItem('requisitionId');
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
                setIsSaveLoading(false);
            }, 500);
        }
    }

    const fetchJobByPosition = async (reqId: any) => {
        const response: any = await dispatch(getPositionById(positionId));
        const data = response.data;
        if (response.status !== 200) {
            message.error('Error fetching position');
        } else {
            setTimeout(() => {
                form.setFieldsValue({
                    ...data,
                    ...jobData,
                    positionId: data.id,
                    payRangeMin: data.maxPay,
                    payRangeMax: data.minPay,
                    payRangeMid: data.midPay,
                    jobPostingEndDate: data.endDate ? moment(data?.endDate) : null,
                    jobStartDate: moment(data?.startDate),
                    startDate: moment(data?.startDate),
                    endDate: data.endDate ? moment(data?.endDate) : null
                });
                setPositions(data);
                setIsLoading(false);
                setIsSaveLoading(false);
            }, 500);
        }
    }

    useEffect(() => {
        const fetchLocation = async () => {
            const response: any = await dispatch(getLocations());

            const options = (response?.data?.content || []).map((item: any) => ({
                label: item.name,        // dropdown text
                value: item.id,          // dropdown value
                mapperId: item.mapperId, // mapper id
                status: item.status, // status
                code: item.code, // code
                version: item.version
            }));
            setAllLocations(options);
        };
        fetchLocation();
    }, [dispatch]);



    useEffect(() => {
        if (jobs?.organisation?.content) {
            setAllOrganisations(jobs.organisation.content);
            setOrganisationOptions(
                jobs.organisation.content.map((org: any) => ({
                    label: org.code
                        ? `${org.name} (${org.code})`
                        : org.name,
                    value: org.id
                }))
            );
        }

        if (jobs?.businessUnit?.content) {
            setAllBusinessUnits(jobs.businessUnit.content);
        }

        if (jobs?.division?.content) {
            setAllDivisions(jobs.division.content);
        }

        if (jobs?.department?.content) {
            setAllDepartments(jobs.department.content);
        }
    }, [jobs]);

    const handleOrganisationChange = (orgId: number) => {
        handleFilterChange('organisationId', orgId);

        // 🔥 RESET FORM VALUES
        form.setFieldsValue({
            businessUnitId: null,
            divisionId: null,
            departmentId: null,
            locationId: null,
            recruiter: null,
            headOfRecruitment: null,
            headOfBusinessUnit: null,
            hiringManager: null
        });

        // clear options
        setBusinessUnitOptions([]);
        setLocationOptions([]);
        setDivisionOptions([]);
        setDepartmentOptions([]);

        // 🔹 FILTER BUSINESS UNITS
        const filteredBU = allBusinessUnits.filter(
            (bu) => bu.mapperId === orgId
        );

        setBusinessUnitOptions(
            filteredBU.map((bu: any) => ({
                label: bu.code
                    ? `${bu.name} (${bu.code})`
                    : bu.name,
                value: bu.id
            }))
        );

        // 🔹 FILTER LOCATIONS
        const filteredLocations = allLocations.filter(
            (loc) => loc.mapperId === orgId && loc.status === 'ACTIVE'
        );

        setLocationOptions(
            filteredLocations.map((loc: any) => ({
                label: loc.code
                    ? `${loc.label} (${loc.code})`
                    : loc.label,
                value: loc.value
            }))
        );
    };

    const handleBusinessUnitChange = (businessUnitId: number) => {
        handleFilterChange('businessUnitId', businessUnitId);

        form.setFieldsValue({
            divisionId: null,
            departmentId: null
        });

        setDivisionOptions([]);
        setDepartmentOptions([]);

        const filteredDivisions = allDivisions.filter(
            (div) => div.mapperId === businessUnitId
        );

        setDivisionOptions(
            filteredDivisions.map((div: any) => ({
                label: div.code
                    ? `${div.name} (${div.code})`
                    : div.name,
                value: div.id
            }))
        );
    };

    const handleDivisionChange = (divisionId: number) => {
        handleFilterChange('divisionId', divisionId);

        form.setFieldsValue({
            departmentId: null
        });

        setDepartmentOptions([]);

        const filteredDepartments = allDepartments.filter(
            (dep) => dep.mapperId === divisionId
        );

        setDepartmentOptions(
            filteredDepartments.map((dep: any) => ({
                label: dep.code
                    ? `${dep.name} (${dep.code})`
                    : dep.name,
                value: dep.id
            }))
        );
    };

    const [filters, setFilters] = useState({
        departmentId: null,
        businessUnitId: null,
        organisationId: null,
        divisionId: null
    });
    const mapToSelectOptions = (data: string[]) =>
        data.map(name => ({
            label: name,
            value: name
        }));

    const getSelectValue = (arr: any[]) =>
        Array.isArray(arr) && arr.length > 0 ? arr[0].value : null;

    const handleFilterChange = (
        key: keyof typeof filters,
        value: any
    ) => {
        const updatedFilters = {
            ...filters,
            [key]: value
        };
        setFilters(updatedFilters);
        const allSelected =
            updatedFilters.departmentId &&
            updatedFilters.businessUnitId &&
            updatedFilters.organisationId &&
            updatedFilters.divisionId;
        if (!allSelected) return;
        dispatch(
            getReqruiterDetails_BasedCriteria(updatedFilters)).then((res: any) => {
                const options = mapToSelectOptions(res.data);
                setHiringManagerOptions(options);
                setHeadOfBusinessUnitOptions(options);
                setHeadOfRecruitmentOptions(options);
                setRecruitOptions(options);
            });
    };


    const removeQueryParam = (paramName: any) => {
        searchParams.delete(paramName);
        setSearchParams(searchParams);
    };

    const handleSubmit = async (formValues: any, sts: 'Draft' | 'Approver 1') => {
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
        formValues.jobStartDate = formatDate(new Date());
        formValues.reasonForVacancy = "";
        formValues.jobPostingStartDate = formatDate(new Date());
        formValues.notificationStatus = sts;
        formValues.jobClassification = "";
        // formValues.locationId = 1;
        // formValues.payGrade = "PG06";
        // formValues.recruiter = "Harris Kumar";
        // formValues.hiringManager = "Monika Gupta";
        // formValues.headOfBusinessUnit = "Harris Kumar";
        // formValues.headOfRecruitment = "Monika Gupta";
        // formValues.jobCode = "JC-001"
        const response: any = await dispatch(blankpostJob(formValues));
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
                    {/* <Col className="gutter-row" span={12}>
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
                    </Col> */}
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="positionName"
                            label="Position"
                            rules={[{ required: false, message: 'Please enter Position Name!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="jobCode"
                            label="Job Code"
                            rules={[{ required: false, message: 'Please enter Job Code!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="organisationId"
                            label="Organization"
                            rules={[{ required: true, message: 'Please select Organization Name!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="label"
                                filterSort={(optionA: any, optionB: any) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={organisationOptions}
                                onChange={(value: any) => {
                                    handleOrganisationChange(value)
                                    handleFilterChange('organisationId', value)
                                    console.log(value);
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="locationId"
                            label="Location"
                            rules={[{ required: true, message: 'Please select Location Name!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="label"
                                filterSort={(optionA: any, optionB: any) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={locationOptions}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="businessUnitId"
                            label="Business Unit"
                            rules={[{ required: true, message: 'Please select Business Unit Name!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="label"
                                filterSort={(optionA: any, optionB: any) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                onChange={(value) => {
                                    handleBusinessUnitChange(value)
                                    handleFilterChange('businessUnitId', value)
                                }}
                                options={businessUnitOptions}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="divisionId"
                            label="Division"
                            rules={[{ required: true, message: 'Please select Division Name!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="label"
                                filterSort={(optionA: any, optionB: any) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                onChange={(value) => {
                                    handleDivisionChange(value)
                                    handleFilterChange('divisionId', value)
                                }}
                                options={divisionOptions}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="departmentId"
                            label="Department"
                            rules={[{ required: true, message: 'Please select Department Name!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="label"
                                filterSort={(optionA: any, optionB: any) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                onChange={(value) =>
                                    handleFilterChange('departmentId', value)
                                }
                                options={departmentOptions}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="hiringManager"
                            label="Hiring Manager"
                            rules={[{ required: true, message: 'Please select Hiring Manager!' }]}
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
                            rules={[{ required: true, message: 'Please select Head Of Business Unit!' }]}
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
                            label="Talent Acquisition Head"
                            rules={[{ required: true, message: 'Please select Head Of Recruitment!' }]}
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
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="recruiter"
                            label="Recruiter"
                            rules={[{ required: true, message: 'Please select Recruiter!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="label"
                                filterSort={(optionA: any, optionB: any) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={recruiter}
                            />
                        </Form.Item>
                    </Col>



                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="requisitionStatus"
                            label="Job Requisition Status"
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
                            rules={[{ required: false, message: 'Please enter minimum salary!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="payRangeMid"
                            label="Mid. Salary"
                            rules={[{ required: false, message: 'Please enter middle salary!' }]}
                        >
                            <input type="number" className="form-control" name='payRangeMid' step={0.01} />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="payRangeMax"
                            label="Max. Salary"
                            rules={[{ required: false, message: 'Please enter maximum salary!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="approvedBudget"
                            label="Approved Budget"
                            rules={[{ required: false, message: 'Please enter approved budget!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    {/* <Col className="gutter-row" span={12}>
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
                    </Col> */}
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="jobPostingEndDate"
                            label="End Date"
                            rules={[{ required: false, message: 'Please select job expired date!' }]}
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
                        <button
                            type="submit"
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
                    </Space>
                </div>
            </Form>
        </>
    )
}
export default CreateBlankRequisition;