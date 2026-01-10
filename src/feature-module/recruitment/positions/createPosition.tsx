import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, InputNumber, Select, Switch, message, Row, Col, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { savePosition, getLocations } from '../../../core/data/redux/actions/requisitionActions';
import { RootState, useAppDispatch } from '../../../core/data/redux/store';
import { transformArrayToLabelValue } from '../../../utils/misc';
import { useSelector } from 'react-redux';
import { getJobFamily, getAllJobCode, getReqruiterDetails_BasedCriteria } from '../../../core/data/redux/actions/jobProfileActions';

const { Option } = Select;

const CreatePosition = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const jobs: any = useSelector((state: RootState) => state.jobs) || [];
    const jobProfile: any = useSelector((state: RootState) => state.jobProfile) || [];
    const [jobDepartment, setJobDepartment] = useState<any>(transformArrayToLabelValue(jobs.department?.content || []));
    const [businessUnit, setBusinessUnit] = useState<any>(transformArrayToLabelValue(jobs.businessUnit?.content || []));
    const [organisation, setOrganisation] = useState<any>(transformArrayToLabelValue(jobs.organisation?.content || []));
    const [location, setLocation] = useState<any>(transformArrayToLabelValue(jobs.location?.content || []));
    const [division, setDivision] = useState<any>(transformArrayToLabelValue(jobs.division?.content || []));
    const [jobRoles, setJobRoles] = useState<any>(jobProfile.jobRoleList?.content || []);
    const [competencies, setCompetencies] = useState<any>(jobProfile.compentencyList?.content || []);
    const [jobFamilies, setJobFamilies] = useState<{ label: string; value: string }[]>([]);
    const [hiringManager, setHiringManagerOptions] = useState<any[]>([]);
    const [headOfBusinessUnit, setHeadOfBusinessUnitOptions] = useState<any[]>([]);
    const [headOfRecruitment, setHeadOfRecruitmentOptions] = useState<any[]>([]);
    const [recruiter, setRecruitOptions] = useState<any[]>([]);

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

    // const hiringManager = [
    //     { value: 1, label: 'William Stones' },
    //     { value: 2, label: 'Amit Mishra' },
    // ];
    // //const [hiringManager, setHiringManager] = useState<any>(transformArrayToLabelValue(jobs.hiringManager?.content || []));
    // const headOfBusinessUnit = [
    //     { value: 1, label: 'Rohini Mohan' },
    //     { value: 2, label: 'Prem Kumaran' },
    // ];
    // //const [headOfBusinessUnit, setheadOfBusinessUnit] = useState<any>(transformArrayToLabelValue(jobs.headOfBusinessUnit?.content || []));
    // const headOfRecruitment = [
    //     { value: 1, label: 'Harris Kumar' },
    //     { value: 2, label: 'Amit Samaddar' },
    // ];
    // //const [headOfRecruitment, setheadOfRecruitment] = useState<any>(transformArrayToLabelValue(jobs.headOfRecruitment?.content || []));

    useEffect(() => {
        dispatch(getJobFamily());
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response: any = await dispatch(getAllJobCode());

            const options = (response?.data?.content || []).map((item: string) => ({
                label: item,
                value: item,
            }));
            setJobFamilies(options);
        };
        fetchData();
    }, [dispatch]);

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
            recruiter: null
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

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            // Format dates before submission
            const formattedValues = {
                ...values,
                recruiterName: getSelectValue(recruiter),
                hiringManager: getSelectValue(hiringManager),
                headOfBusinessUnit: getSelectValue(headOfBusinessUnit),
                headOfRecruitment: getSelectValue(headOfRecruitment),
                startDate: values.startDate.format('YYYY-MM-DD'),
                endDate: values.endDate?.format('YYYY-MM-DD') || null
            };
            console.log("formattedValues" + formattedValues)
            const response: any = await dispatch(savePosition(formattedValues));
            if (response.status === 200) {
                message.success('Position created successfully!');
                navigate('/positions');
            } else {
                console.log(response);
                message.error('Failed!');
            }
        } catch (error) {
            message.error('Failed to create position');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <div>
                    <Card
                        title="Create New Position"
                        bordered={false}
                        style={{ maxWidth: '1200px', margin: '0 auto' }}
                        headStyle={{ borderBottom: 'none' }}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            initialValues={{
                                status: 1,
                                fte: 1.0,
                                standardHour: 40,
                                toBeHired: true
                            }}
                        >
                            <Row gutter={[24, 16]}>
                                {/* Basic Information */}
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <h3 style={{ marginBottom: '16px', color: '#1890ff' }}>Basic Information</h3>

                                    <Form.Item
                                        name="name"
                                        label="Position Name"
                                        rules={[{ required: true, message: 'Please input the position name!' }]}
                                    >
                                        <Input placeholder="e.g. Senior Software Engineer" />
                                    </Form.Item>

                                    <Form.Item
                                        name="code"
                                        label="Position Code"
                                        rules={[{ required: true, message: 'Please input the position code!' }]}
                                    >
                                        <Input placeholder="e.g. POS020" />
                                    </Form.Item>

                                    <Form.Item
                                        name="payGrad"
                                        label="Pay Grade"
                                        rules={[{ required: true, message: 'Please input the pay grade!' }]}
                                    >
                                        <Input placeholder="e.g. G7" />
                                    </Form.Item>

                                    <Form.Item
                                        name="status"
                                        label="Status"
                                    >
                                        <Select>
                                            <Option value={1}>Active</Option>
                                            <Option value={0}>Inactive</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="costCenter"
                                        label="Cost Center"
                                        rules={[{ required: true, message: 'Please input the cost center!' }]}
                                    >
                                        <Input placeholder="e.g. CC-TECH" />
                                    </Form.Item>
                                </Col>

                                {/* Employment Details */}
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <h3 style={{ marginBottom: '16px', color: '#1890ff' }}>Employment Details</h3>

                                    <Form.Item
                                        name="startDate"
                                        label="Start Date"
                                        rules={[{ required: true, message: 'Please select the start date!' }]}
                                    >
                                        <DatePicker style={{ width: '100%' }} />
                                    </Form.Item>

                                    <Form.Item
                                        name="endDate"
                                        label="End Date (Optional)"
                                    >
                                        <DatePicker style={{ width: '100%' }} />
                                    </Form.Item>

                                    <Form.Item
                                        name="jobCode"
                                        label="Job Code"
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Search to Select"
                                            optionFilterProp="label"
                                            filterSort={(optionA: any, optionB: any) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            options={jobFamilies}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="fte"
                                        label="FTE (Full-Time Equivalent)"
                                    >
                                        <InputNumber min={0} max={2} step={0.1} style={{ width: '100%' }} />
                                    </Form.Item>

                                    <Form.Item
                                        name="standardHour"
                                        label="Standard Hours"
                                    >
                                        <InputNumber min={0} max={80} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>

                                {/* Compensation */}
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <h3 style={{ marginBottom: '16px', color: '#1890ff' }}>Compensation</h3>

                                    <Form.Item
                                        name="minPay"
                                        label="Minimum Pay ($)"
                                    >
                                        <InputNumber
                                            min={0}
                                            style={{ width: '100%' }}
                                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="midPay"
                                        label="Mid Pay ($)"
                                    >
                                        <InputNumber
                                            min={0}
                                            style={{ width: '100%' }}
                                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="maxPay"
                                        label="Maximum Pay ($)"
                                    >
                                        <InputNumber
                                            min={0}
                                            style={{ width: '100%' }}
                                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                                        />
                                    </Form.Item>
                                </Col>

                                {/* Organizational Information */}
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <h3 style={{ marginBottom: '16px', color: '#1890ff' }}>Organizational Information</h3>

                                    <Form.Item
                                        name="organisationId"
                                        label="Organization Name"
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

                                    <Form.Item
                                        name="locationId"
                                        label="Location Name"
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

                                    {/* <Form.Item
                                        name="locationId"
                                        label="Location Name"
                                    >
                                        <InputNumber style={{ width: '100%' }} />
                                    </Form.Item> */}

                                    <Form.Item
                                        name="businessUnitId"
                                        label="Business Unit Name"
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

                                    <Form.Item
                                        name="divisionId"
                                        label="Division Name"
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

                                    <Form.Item
                                        name="departmentId"
                                        label="Department Name"
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
                                    {/*
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
                                    */}
                                    <Form.Item
                                        name="recruiter"
                                        label="Recruiter"
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

                                    <Form.Item
                                        name="toBeHired"
                                        label="To Be Hired"
                                        valuePropName="checked"
                                    >
                                        <Switch />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <div style={{ marginTop: '24px', textAlign: 'right' }}>
                                <Button
                                    style={{ marginRight: '8px' }}
                                    onClick={() => navigate('/positions')}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    Create Position
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreatePosition;