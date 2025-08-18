import React, { useState, useEffect } from 'react';
import {
    Card,
    Table,
    Button,
    Modal,
    Form,
    Input,
    Select,
    Tag,
    Divider,
    Tabs,
    Row,
    Col,
    Collapse,
    Typography,
    Space,
    message,
    Popconfirm,
    Statistic,
    Grid
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ProfileOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import 'react-quill/dist/quill.snow.css';
import { RootState, useAppDispatch } from '../../../core/data/redux/store';
import { createCompentancy, getCompentancy, getJobFamily, getJobRole } from '../../../core/data/redux/actions/jobProfileActions';
import { transformArrayToLabelValue } from '../../../utils/misc';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { Option } = Select;
const { TextArea } = Input;
const { useBreakpoint } = Grid;

// Types
interface Competency {
    id: number;
    name: string;
    description: string;
}

interface JobFamily {
    id: number;
    name: string;
    description: string;
}

interface JobRole {
    id: number;
    name: string;
    jobFamilyId: number;
    description: string;
    jobProfile: JobProfile;
}

interface JobProfile {
    jobRoleId: number;
    competencyIds: number[];
    rolesAndResponsibilities: string;
    educationBackground: string;
    experienceRequirements: string;
    jobPurpose: string;
    keyRolesAndResponsibilities1: string;
    keyRolesAndResponsibilities2: string;
    keyRolesAndResponsibilities3: string;
}

const JobProfilePage: React.FC = () => {
    const screens = useBreakpoint();
    // State management
    const [loading, setLoading] = useState(false);
    const [competencies, setCompetencies] = useState<Competency[]>([]);
    const [jobFamilies, setJobFamilies] = useState<JobFamily[]>([]);
    const [jobRoles, setJobRoles] = useState<JobRole[]>([]);
    const [selectedJobRole, setSelectedJobRole] = useState<JobRole | null>(null);
    const [selectedCompetency, setSelectedCompetency] = useState<Competency | null>(null);
    const [selectedJobFamily, setSelectedJobFamily] = useState<JobFamily | null>(null);
    const [selectedJobRoleForEdit, setSelectedJobRoleForEdit] = useState<JobRole | null>(null);
    const [isCreatingNewProfile, setIsCreatingNewProfile] = useState(false);

    // Modal states
    const [competencyModalVisible, setCompetencyModalVisible] = useState(false);
    const [jobFamilyModalVisible, setJobFamilyModalVisible] = useState(false);
    const [jobRoleModalVisible, setJobRoleModalVisible] = useState(false);
    const [jobProfileModalVisible, setJobProfileModalVisible] = useState(false);

    // Form states
    const [competencyForm] = Form.useForm();
    const [jobFamilyForm] = Form.useForm();
    const [jobRoleForm] = Form.useForm();
    const [jobProfileForm] = Form.useForm();
    const dispatch = useAppDispatch();

    const user: any = useSelector((state: RootState) => state.user) || [];
    const jobProfile: any = useSelector((state: RootState) => state.jobProfile) || [];
    const [jobRoleList, setJobRoleList] = useState<any>(transformArrayToLabelValue(jobProfile.jobRoleList?.content || []));

    // Load initial data (mock)
    useEffect(() => {
        console.log(user)
        dispatch(getJobRole(1));
        dispatch(getJobFamily(1));
        dispatch(getCompentancy(1));
        // Mock data
        const mockCompetencies: Competency[] = [
            { id: 1, name: 'Communication', description: 'Effective communication skills' },
            { id: 2, name: 'Leadership', description: 'Ability to lead teams' },
            { id: 3, name: 'Technical Skills', description: 'Job-specific technical abilities' },
        ];

        const mockJobFamilies: JobFamily[] = [
            { id: 1, name: 'Human Resources', description: 'HR related roles' },
            { id: 2, name: 'Information Technology', description: 'IT related roles' },
            { id: 3, name: 'Finance', description: 'Finance related roles' },
        ];

        const mockJobRoles: JobRole[] = [
            {
                id: 1,
                name: 'HR Manager',
                jobFamilyId: 1,
                description: 'Manages HR operations',
                jobProfile: {
                    jobRoleId: 1,
                    competencyIds: [1, 2],
                    rolesAndResponsibilities: "<p>Handle recruitment</p>",
                    educationBackground: "<p>Bachelor's in HR</p>",
                    experienceRequirements: "<p>5+ years experience</p>",
                    jobPurpose: "<p>To manage HR operations</p>",
                    keyRolesAndResponsibilities1: "<p>Recruitment</p>",
                    keyRolesAndResponsibilities2: "<p>Employee engagement</p>",
                    keyRolesAndResponsibilities3: "<p>Policy making</p>"
                }
            },
            {
                id: 2,
                name: 'IT Manager',
                jobFamilyId: 2,
                description: 'Manages IT operations',
                jobProfile: {
                    jobRoleId: 2,
                    competencyIds: [2, 3],
                    rolesAndResponsibilities: "<p>Handle IT infrastructure</p>",
                    educationBackground: "<p>Bachelor's in Computer Science</p>",
                    experienceRequirements: "<p>7+ years experience</p>",
                    jobPurpose: "<p>To manage IT operations</p>",
                    keyRolesAndResponsibilities1: "<p>System maintenance</p>",
                    keyRolesAndResponsibilities2: "<p>Team management</p>",
                    keyRolesAndResponsibilities3: "<p>Technology strategy</p>"
                }
            },
            {
                id: 3,
                name: 'Finance Manager',
                jobFamilyId: 3,
                description: 'Manages financial operations',
                jobProfile: {
                    jobRoleId: 3,
                    competencyIds: [1, 3],
                    rolesAndResponsibilities: "<p>Handle financial reporting</p>",
                    educationBackground: "<p>Bachelor's in Finance</p>",
                    experienceRequirements: "<p>6+ years experience</p>",
                    jobPurpose: "<p>To manage financial operations</p>",
                    keyRolesAndResponsibilities1: "<p>Financial planning</p>",
                    keyRolesAndResponsibilities2: "<p>Budget management</p>",
                    keyRolesAndResponsibilities3: "<p>Financial reporting</p>"
                }
            }
        ];

        setCompetencies(mockCompetencies);
        setJobFamilies(mockJobFamilies);
        setJobRoles(mockJobRoles);
    }, []);

    // Reset all forms
    const resetForms = () => {
        competencyForm.resetFields();
        jobFamilyForm.resetFields();
        jobRoleForm.resetFields();
        jobProfileForm.resetFields();
        setSelectedCompetency(null);
        setSelectedJobFamily(null);
        setSelectedJobRoleForEdit(null);
    };

    // Handlers for Competency
    const showCompetencyModal = (competency: Competency | null = null) => {
        setSelectedCompetency(competency);
        if (competency) {
            competencyForm.setFieldsValue(competency);
        } else {
            competencyForm.resetFields();
        }
        setCompetencyModalVisible(true);
    };

    const handleSaveCompetency = async () => {
        competencyForm.validateFields().then(async (values) => {
            setLoading(true);
            try {
                // Format dates before submission

                console.log('Received values:', values);
                const response: any = await dispatch(createCompentancy(values));
                if (response.status === 200) {
                    message.success('Competency updated successfully!');
                    // navigate('/positions');
                } else {
                    console.log(response);
                    message.error('Failed!');
                }
            } catch (error) {
                message.error('Failed to create position');
            } finally {
                setLoading(false);
            }
            // setCompetencyModalVisible(false);
            // resetForms();
        });
    };

    const handleDeleteCompetency = (id: number) => {
        setCompetencies(competencies.filter(c => c.id !== id));
        message.success('Competency deleted successfully');
    };

    // Handlers for Job Family
    const showJobFamilyModal = (jobFamily: JobFamily | null = null) => {
        setSelectedJobFamily(jobFamily);
        if (jobFamily) {
            jobFamilyForm.setFieldsValue(jobFamily);
        } else {
            jobFamilyForm.resetFields();
        }
        setJobFamilyModalVisible(true);
    };

    const handleSaveJobFamily = () => {
        jobFamilyForm.validateFields().then(values => {
            if (selectedJobFamily) {
                // Update existing job family
                const updated = jobFamilies.map(jf =>
                    jf.id === selectedJobFamily.id ? { ...jf, ...values } : jf
                );
                setJobFamilies(updated);
                message.success('Job Family updated successfully');
            } else {
                // Add new job family
                const newJobFamily: JobFamily = {
                    id: Math.max(...jobFamilies.map(jf => jf.id), 0) + 1,
                    ...values
                };
                setJobFamilies([...jobFamilies, newJobFamily]);
                message.success('Job Family added successfully');
            }
            setJobFamilyModalVisible(false);
            resetForms();
        });
    };

    const handleDeleteJobFamily = (id: number) => {
        setJobFamilies(jobFamilies.filter(jf => jf.id !== id));
        setJobRoles(jobRoles.filter(jr => jr.jobFamilyId !== id));
        message.success('Job Family deleted successfully');
    };

    // Handlers for Job Role
    const showJobRoleModal = (jobRole: JobRole | null = null) => {
        setSelectedJobRoleForEdit(jobRole);
        if (jobRole) {
            jobRoleForm.setFieldsValue(jobRole);
        } else {
            jobRoleForm.resetFields();
        }
        setJobRoleModalVisible(true);
    };

    const handleSaveJobRole = () => {
        jobRoleForm.validateFields().then(values => {
            if (selectedJobRoleForEdit) {
                // Update existing job role
                const updated = jobRoles.map(jr =>
                    jr.id === selectedJobRoleForEdit.id ? { ...jr, ...values } : jr
                );
                setJobRoles(updated);
                message.success('Job Role updated successfully');
            } else {
                // Add new job role
                const newJobRole: JobRole = {
                    id: Math.max(...jobRoles.map(jr => jr.id), 0) + 1,
                    ...values,
                    jobProfile: {
                        jobRoleId: Math.max(...jobRoles.map(jr => jr.id), 0) + 1,
                        competencyIds: [],
                        rolesAndResponsibilities: "",
                        educationBackground: "",
                        experienceRequirements: "",
                        jobPurpose: "",
                        keyRolesAndResponsibilities1: "",
                        keyRolesAndResponsibilities2: "",
                        keyRolesAndResponsibilities3: ""
                    }
                };
                setJobRoles([...jobRoles, newJobRole]);
                message.success('Job Role added successfully');
            }
            setJobRoleModalVisible(false);
            resetForms();
        });
    };

    const handleDeleteJobRole = (id: number) => {
        setJobRoles(jobRoles.filter(jr => jr.id !== id));
        message.success('Job Role deleted successfully');
    };

    // Handlers for Job Profile
    const handleEditJobProfile = (jobRole: JobRole) => {
        setSelectedJobRole(jobRole);
        jobProfileForm.setFieldsValue({
            ...jobRole.jobProfile,
            jobRoleName: jobRole.name
        });
        setJobProfileModalVisible(true);
    };

    const handleSaveJobProfile = () => {
        jobProfileForm.validateFields().then(values => {
            if (isCreatingNewProfile) {
                // Create new job role with profile
                const newJobRole: JobRole = {
                    id: Math.max(...jobRoles.map(jr => jr.id), 0) + 1,
                    name: `New Role ${Math.max(...jobRoles.map(jr => jr.id), 0) + 1}`,
                    jobFamilyId: 1, // Default family, can be made configurable
                    description: "New role description",
                    jobProfile: {
                        jobRoleId: Math.max(...jobRoles.map(jr => jr.id), 0) + 1,
                        ...values
                    }
                };
                setJobRoles([...jobRoles, newJobRole]);
                message.success('Job Profile created successfully');
            } else {
                // Update existing profile
                const updatedJobRoles = jobRoles.map(role => {
                    if (role.id === selectedJobRole?.id) {
                        return {
                            ...role,
                            jobProfile: {
                                ...values,
                                jobRoleId: role.id
                            }
                        };
                    }
                    return role;
                });
                setJobRoles(updatedJobRoles);
                message.success('Job Profile updated successfully');
            }
            setJobProfileModalVisible(false);
            setIsCreatingNewProfile(false);
        });
    };

    // Table columns
    const competencyColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: Competency) => (
                <Space size="middle">
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => showCompetencyModal(record)}
                    />
                    <Popconfirm
                        title="Are you sure to delete this competency?"
                        onConfirm={() => handleDeleteCompetency(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const jobFamilyColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: JobFamily) => (
                <Space size="middle">
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => showJobFamilyModal(record)}
                    />
                    <Popconfirm
                        title="Are you sure to delete this job family?"
                        onConfirm={() => handleDeleteJobFamily(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const jobRoleColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Job Family',
            dataIndex: 'jobFamilyId',
            key: 'jobFamilyId',
            render: (id: number) => jobFamilies.find(f => f.id === id)?.name || 'N/A',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: JobRole) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleEditJobProfile(record)}>Edit Profile</Button>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => showJobRoleModal(record)}
                    />
                    <Popconfirm
                        title="Are you sure to delete this job role?"
                        onConfirm={() => handleDeleteJobRole(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // Render job profile cards
    const renderJobProfileCards = () => {
        if (jobRoles.length === 0) {
            return (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <Title level={4} style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                        No job profiles found
                    </Title>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            jobProfileForm.resetFields();
                            setIsCreatingNewProfile(true);
                            setSelectedJobRole(null);
                            setJobProfileModalVisible(true);
                        }}
                    >
                        Create First Job Profile
                    </Button>
                </div>
            );
        }

        return (
            <Row gutter={[16, 16]}>
                {jobRoles.map(jobRole => (
                    <Col xs={24} sm={12} md={8} lg={8} xl={6} key={jobRole.id}>
                        <Card
                            title={jobRole.name}
                            extra={
                                <Button
                                    type="link"
                                    icon={<EditOutlined />}
                                    onClick={() => {
                                        setSelectedJobRole(jobRole);
                                        setIsCreatingNewProfile(false);
                                        jobProfileForm.setFieldsValue({
                                            ...jobRole.jobProfile,
                                            jobRoleName: jobRole.name
                                        });
                                        setJobProfileModalVisible(true);
                                    }}
                                />
                            }
                            actions={[
                                <Button
                                    type="link"
                                    onClick={() => {
                                        setSelectedJobRole(jobRole);
                                        setIsCreatingNewProfile(false);
                                        jobProfileForm.setFieldsValue({
                                            ...jobRole.jobProfile,
                                            jobRoleName: jobRole.name
                                        });
                                        setJobProfileModalVisible(true);
                                    }}
                                >
                                    View Full Profile
                                </Button>
                            ]}
                        >
                            <div style={{ marginBottom: 16 }}>
                                <Text strong>Job Family: </Text>
                                <Text>{jobFamilies.find(f => f.id === jobRole.jobFamilyId)?.name || 'N/A'}</Text>
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <Text strong>Competencies: </Text>
                                <div style={{ marginTop: 8 }}>
                                    {jobRole.jobProfile.competencyIds.map(id => {
                                        const comp = competencies.find(c => c.id === id);
                                        return comp ? <Tag key={id}>{comp.name}</Tag> : null;
                                    })}
                                </div>
                            </div>
                            <Divider style={{ margin: '12px 0' }} />
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Statistic
                                        title="Key Responsibilities"
                                        value={3}
                                        prefix={<ProfileOutlined />}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Statistic
                                        title="Required Competencies"
                                        value={jobRole.jobProfile.competencyIds.length}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
        );
    };

    // Tab configuration
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Competencies',
            children: (
                <Card
                    title="Competencies"
                    extra={
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => showCompetencyModal()}
                        >
                            Add Competency
                        </Button>
                    }
                >
                    <Table
                        columns={competencyColumns}
                        dataSource={competencies}
                        rowKey="id"
                        pagination={false}
                    />
                </Card>
            ),
        },
        {
            key: '2',
            label: 'Job Families',
            children: (
                <Card
                    title="Job Families"
                    extra={
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => showJobFamilyModal()}
                        >
                            Add Job Family
                        </Button>
                    }
                >
                    <Table
                        columns={jobFamilyColumns}
                        dataSource={jobFamilies}
                        rowKey="id"
                        pagination={false}
                    />
                </Card>
            ),
        },
        {
            key: '3',
            label: 'Job Roles',
            children: (
                <Card
                    title="Job Roles"
                    extra={
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => showJobRoleModal()}
                        >
                            Add Job Role
                        </Button>
                    }
                >
                    <Table
                        columns={jobRoleColumns}
                        dataSource={jobRoles}
                        rowKey="id"
                        pagination={false}
                    />
                </Card>
            ),
        },
        {
            key: '4',
            label: 'Job Profiles',
            children: (
                <Card
                    title={
                        <Space>
                            <span>Job Profiles</span>
                            <Tag color="blue">{jobRoles.length} Profiles</Tag>
                        </Space>
                    }
                    extra={
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                jobProfileForm.resetFields();
                                setIsCreatingNewProfile(true);
                                setSelectedJobRole(null);
                                setJobProfileModalVisible(true);
                            }}
                        >
                            Create Job Profile
                        </Button>
                    }
                >
                    {renderJobProfileCards()}
                </Card>
            ),
        },
    ];

    return (
        <div className="page-wrapper">
            <div className="content">
                <div>
                    <Title level={2}>Job Profile Management</Title>

                    <Tabs defaultActiveKey="1" items={items} />

                    {/* Competency Modal */}
                    <Modal
                        title={selectedCompetency ? 'Edit Competency' : 'Add New Competency'}
                        open={competencyModalVisible}
                        onOk={handleSaveCompetency}
                        onCancel={() => {
                            setCompetencyModalVisible(false);
                            resetForms();
                        }}
                    >
                        <Form form={competencyForm} layout="vertical">
                            <Form.Item
                                name="competencyName"
                                label="Competency Name"
                                rules={[{ required: true, message: 'Please input the competency name!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="jobRoleId"
                                label="Job Role Id"
                            >
                                <Select
                                    showSearch
                                    placeholder="Search to Select"
                                    optionFilterProp="label"
                                    filterSort={(optionA: any, optionB: any) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={jobRoleList}
                                />
                            </Form.Item>
                        </Form>
                    </Modal>

                    {/* Job Family Modal */}
                    <Modal
                        title={selectedJobFamily ? 'Edit Job Family' : 'Add New Job Family'}
                        open={jobFamilyModalVisible}
                        onOk={handleSaveJobFamily}
                        onCancel={() => {
                            setJobFamilyModalVisible(false);
                            resetForms();
                        }}
                    >
                        <Form form={jobFamilyForm} layout="vertical">
                            <Form.Item
                                name="name"
                                label="Job Family Name"
                                rules={[{ required: true, message: 'Please input the job family name!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[{ required: true, message: 'Please input the description!' }]}
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                        </Form>
                    </Modal>

                    {/* Job Role Modal */}
                    <Modal
                        title={selectedJobRoleForEdit ? 'Edit Job Role' : 'Add New Job Role'}
                        open={jobRoleModalVisible}
                        onOk={handleSaveJobRole}
                        onCancel={() => {
                            setJobRoleModalVisible(false);
                            resetForms();
                        }}
                        width={800}
                    >
                        <Form form={jobRoleForm} layout="vertical">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="name"
                                        label="Job Role Name"
                                        rules={[{ required: true, message: 'Please input the job role name!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="jobFamilyId"
                                        label="Job Family"
                                        rules={[{ required: true, message: 'Please select a job family!' }]}
                                    >
                                        <Select placeholder="Select job family">
                                            {jobFamilies.map(family => (
                                                <Option key={family.id} value={family.id}>{family.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[{ required: true, message: 'Please input the description!' }]}
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                        </Form>
                    </Modal>

                    {/* Job Profile Modal */}
                    <Modal
                        centered={true}
                        title={isCreatingNewProfile ? 'Create New Job Profile' : `Edit Job Profile - ${selectedJobRole?.name || ''}`}
                        open={jobProfileModalVisible}
                        onOk={handleSaveJobProfile}
                        onCancel={() => {
                            setJobProfileModalVisible(false);
                            setIsCreatingNewProfile(false);
                        }}
                        width={800}
                        style={{
                            top: '20px',
                            maxHeight: 'calc(100vh - 40px)',
                            overflowY: 'auto'
                        }}
                        bodyStyle={{
                            padding: '24px',
                            maxHeight: 'calc(100vh - 200px)',
                            overflowY: 'auto'
                        }}
                    >
                        <Form form={jobProfileForm} layout="vertical">
                            {!isCreatingNewProfile && (
                                <Form.Item name="jobRoleName" label="Job Role">
                                    <Input disabled />
                                </Form.Item>
                            )}

                            <Form.Item
                                name="competencyIds"
                                label="Required Competencies"
                                rules={[{ required: true, message: 'Please select at least one competency!' }]}
                            >
                                <Select
                                    mode="multiple"
                                    placeholder="Select competencies"
                                    style={{ width: '100%' }}
                                >
                                    {competencies.map(comp => (
                                        <Option key={comp.id} value={comp.id}>{comp.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Divider orientation="left">Job Details</Divider>

                            <Form.Item
                                name="jobPurpose"
                                label="Job Purpose"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="rolesAndResponsibilities"
                                label="Roles and Responsibilities"
                            >
                                <Input />
                            </Form.Item>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="educationBackground"
                                        label="Education Background"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="experienceRequirements"
                                        label="Experience Requirements"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Divider orientation="left">Key Roles and Responsibilities</Divider>

                            <Row gutter={16}>
                                <Col span={8}>
                                    <Form.Item
                                        name="keyRolesAndResponsibilities1"
                                        label="Key Responsibility 1"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="keyRolesAndResponsibilities2"
                                        label="Key Responsibility 2"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="keyRolesAndResponsibilities3"
                                        label="Key Responsibility 3"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default JobProfilePage;