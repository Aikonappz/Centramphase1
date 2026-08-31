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
import { RootState, useAppDispatch } from '../../../core/data/redux/store';
import { createCompentancy, createJobFamily, createJobRole, getCompentancy, getJobCode_NextCode, getJobFamily, getJobProfile, getJobRole, postJobProfile } from '../../../core/data/redux/actions/jobProfileActions';
import { transformArrayToLabelValue } from '../../../utils/misc';
import { useSelector } from 'react-redux';
import { deleteJobFamily, deleteJobRole, deleteJobProfile, deleteCompetency } from '../../../core/data/redux/actions/jobProfileActions';
import { OverlayTrigger, Tooltip as BootstrapTooltip } from "react-bootstrap";
import { InfoCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { Option } = Select;
const { TextArea } = Input;
const { useBreakpoint } = Grid;

// Types
interface Competency {
    id: number;
    competencyName: string;
    jobRoleId: number;
}

interface JobFamily {
    id: number;
    jobFamilyName: string;
}

interface JobRole {
    id?: any;
    jobRoleName: string;
    jobFamilyId: number;
    jobCodeId?: number;
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
    const [selectedJobRole, setSelectedJobRole] = useState<any | null>(null);
    const [selectedJobProfile, setSelectedJobProfile] = useState<any | null>(null);
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
    const profile: any = useSelector((state: RootState) => state.jobProfile) || [];
    const [jobRoles, setJobRoles] = useState<any>(profile.jobRoleList?.content || []);
    const [competencies, setCompetencies] = useState<any>(profile.compentencyList?.content || []);
    const [jobFamilies, setJobFamilies] = useState<any>(profile.jobFamilyList?.content || []);
    const [jobProfiles, setjobProfiles] = useState<any>(profile.jobProfile?.content || []);

    const [nextJobCode, setNextJobCode] = useState('');

    console.log(jobRoles)
    console.log(jobProfiles)

    useEffect(() => {
        dispatch(getJobRole());
        dispatch(getJobFamily());
        dispatch(getCompentancy());
        dispatch(getJobProfile());
    }, []);

    const fetchNextJobCode = async () => {
        const response: any = await dispatch(getJobCode_NextCode());

        if (response?.data) {
            const code = String(response.data);

            jobRoleForm.setFieldsValue({
                jobCodeId: code
            });

            setNextJobCode(code);
        }
    };

    useEffect(() => {
        fetchNextJobCode();
    }, [dispatch]);


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

    const handleSaveCompetency = () => {
        competencyForm.validateFields().then(async (values) => {
            let updatedValues;
            if (selectedCompetency) {
                // Update existing competency
                const updated = competencies.map((c: { id: number; }) =>
                    c.id === selectedCompetency.id ? { ...c, ...values } : c
                );
                setCompetencies(updated);
                updatedValues = values;
            } else {
                // Add new competency
                const newCompetency: Competency = {
                    id: null,
                    ...values,
                    jobRoleId: values.jobRoleId,
                };
                setCompetencies([...competencies, newCompetency]);
                updatedValues = newCompetency;
            }
            setLoading(true);
            try {
                // Format dates before submission
                const response: any = await dispatch(createCompentancy(updatedValues));
                if (response.status === 200) {
                    message.success('Competency updated successfully!');
                    // navigate('/positions');
                    setCompetencyModalVisible(false);
                    resetForms();
                    const res: any = await dispatch(getCompentancy());
                    const data = res.data;
                    setCompetencies(data.content)
                } else {
                    console.log(response);
                    message.error('Failed!');
                }
            } catch (error) {
                message.error('Failed to create position');
            } finally {
                setLoading(false);
            }
        });
    };

    const handleDeleteCompetency = async (id: number) => {
        const response: any = await dispatch(deleteCompetency(id));
        const data = response.data;
        // console.log(data)
        if (response.status !== 200) {
            message.error("Error fetching position");
            const res1: any = await dispatch(getJobProfile());
            setjobProfiles(res1?.data?.content ?? []);
        } else {
            message.success('Competency deleted successfully');
            const res: any = await dispatch(getCompentancy());
            setCompetencies(res?.data?.content ?? []);
            const res1: any = await dispatch(getJobProfile());
            setjobProfiles(res1?.data?.content ?? []);
        }
        // setCompetencies(competencies.filter((c: { id: number; }) => c.id !== id));
        // message.success('Competency deleted successfully');
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
        jobFamilyForm.validateFields().then(async (values) => {
            setLoading(true);
            try {
                let updatedValue;
                // Format dates before submission
                if (selectedJobFamily) {
                    // Update existing job family
                    const updated = jobFamilies.map((jf: { id: number; }) =>
                        jf.id === selectedJobFamily.id ? { ...jf, ...values } : jf
                    );
                    setJobFamilies(updated);
                    updatedValue = values;
                    // message.success('Job Family updated successfully');
                } else {
                    // Add new job family
                    const newJobFamily: JobFamily = {
                        id: null,
                        ...values
                    };
                    setJobFamilies([...jobFamilies, newJobFamily]);
                    updatedValue = newJobFamily;
                    // message.success('Job Family added successfully');
                }
                const response: any = await dispatch(createJobFamily(updatedValue));
                if (response.status === 200) {
                    message.success('Job Family added successfully!');
                    // navigate('/positions');
                    setJobFamilyModalVisible(false);
                    resetForms();
                    const res: any = await dispatch(getJobFamily());
                    setJobFamilies(res.data.content)
                } else {
                    console.log(response);
                    message.error('Failed!');
                }
            } catch (error) {
                message.error('Failed to create position');
            } finally {
                setLoading(false);
            }
        });
    };

    const handleDeleteJobFamily = async (id: number) => {
        try {
            const response: any = await dispatch(deleteJobFamily(id));

            if (response?.status !== 200) {
                message.error("Failed to delete Job Family");
                return;
            }

            message.success("Job Family deleted successfully");
            const [
                jobFamilyRes,
                jobRoleRes,
                competencyRes,
                jobProfileRes
            ]: any[] = await Promise.all([
                dispatch(getJobFamily()),
                dispatch(getJobRole()),
                dispatch(getCompentancy()),
                dispatch(getJobProfile())
            ]);
            setJobFamilies(jobFamilyRes?.data?.content ?? []);
            setJobRoles(jobRoleRes?.data?.content ?? []);
            setCompetencies(competencyRes?.data?.content ?? []);
            setjobProfiles(jobProfileRes?.data?.content ?? []);
        } catch (error) {
            message.error("Something went wrong while deleting Job Family");
        }
    };

    // Handlers for Job Role
    const showJobRoleModal = async (jobRole: JobRole | null = null) => {
        setSelectedJobRoleForEdit(jobRole);
        if (jobRole) {
            jobRoleForm.setFieldsValue(jobRole);
        } else {
            jobRoleForm.resetFields();

            // 🔥 Always get fresh code when creating
            await fetchNextJobCode();
        }
        setJobRoleModalVisible(true);
    };

    const handleSaveJobRole = () => {
        jobRoleForm.validateFields().then(async (values) => {
            let updatedValues;
            if (selectedJobRoleForEdit) {
                // Update existing job role
                const updated = jobRoles.map((jr: { id: number; }) =>
                    jr.id === selectedJobRoleForEdit.id ? { ...jr, ...values } : jr
                );
                setJobRoles(updated);
                updatedValues = values;
                // message.success('Job Role updated successfully');
            } else {
                // Add new job role
                const newJobRole: JobRole = {
                    id: null,
                    ...values,
                };
                setJobRoles([...jobRoles, newJobRole]);
                updatedValues = newJobRole;
                // message.success('Job Role added successfully');
            }
            try {
                // Format dates before submission
                const response: any = await dispatch(createJobRole(updatedValues));
                if (response.status === 200) {
                    message.success('Job Role saved successfully!');
                    // navigate('/positions');
                    setJobRoleModalVisible(false);
                    resetForms();
                    // 🔥 CALL AGAIN HERE
                    await fetchNextJobCode();

                    const res: any = await dispatch(getJobRole());
                    setJobRoles(res.data.content)
                } else {
                    console.log(response);
                    message.error('Failed!');
                }
            } catch (error) {
                message.error('Failed to create position');
            } finally {
                setLoading(false);
            }
        });
    };

    const handleDeleteJobRole = async (id: number) => {
        const response: any = await dispatch(deleteJobRole(id));

        if (response?.status !== 200) {
            message.error("Error deleting JobRole");
            return;
        }
        message.success("JobRole deleted successfully");
        const jobRoleRes: any = await dispatch(getJobRole());
        const competencyRes: any = await dispatch(getCompentancy());
        const jobProfileRes: any = await dispatch(getJobProfile());

        setJobRoles(jobRoleRes?.data?.content ?? []);
        setCompetencies(competencyRes?.data?.content ?? []);
        setjobProfiles(jobProfileRes?.data?.content ?? []);
    };

    // Handlers for Job Profile
    const handleEditJobProfile = (jobRole: JobRole) => {
        setSelectedJobRole(jobRole);
        jobProfileForm.setFieldsValue({
            ...jobRole,
            id: jobRole.id,
            jobRoleName: jobRole.jobRoleName
        });
        setJobProfileModalVisible(true);
    };

    // const handleSaveJobProfile = () => {
    //     jobProfileForm.validateFields().then(async (values) => {
    //         console.log(values)
    //         let updatedValues;
    //         if (isCreatingNewProfile) {
    //             // Create new job role with profile
    //             setjobProfiles([...jobProfiles, values]);
    //             updatedValues = values;
    //             // message.success('Job Profile created successfully');
    //         } else {
    //             // Update existing profile
    //             const updatedJobRoles = jobProfiles.map((role: { id: number | undefined; }) => {
    //                 if (role.id === values?.id) {
    //                     return {
    //                         ...role,
    //                         values
    //                     };
    //                 }
    //                 return role;
    //             });
    //             setjobProfiles(updatedJobRoles);
    //             updatedValues = {
    //                 id: values.id,
    //                 ...values
    //             };
    //             // message.success('Job Profile updated successfully');
    //         }
    //         try {
    //             // Format dates before submission
    //             const response: any = await dispatch(postJobProfile(updatedValues));
    //             if (response.status === 200) {
    //                 message.success('Job Profile created successfully!');
    //                 // navigate('/positions');
    //                 setJobProfileModalVisible(false);
    //                 setIsCreatingNewProfile(false);
    //                 dispatch(getJobProfile());
    //                 resetForms();
    //             } else {
    //                 console.log(response);
    //                 message.error('Failed!');
    //             }
    //         } catch (error) {
    //             message.error('Failed to create position');
    //         } finally {
    //             setLoading(false);
    //         }
    //     });
    // };
    const handleSaveJobProfile = () => {
        jobProfileForm.validateFields().then(async (values) => {
            let updatedValues;
            if (isCreatingNewProfile) {
                updatedValues = values;
            } else {
                const updatedJobRoles = jobProfiles.map((role: any) =>
                    role.id === values?.id ? { ...role, ...values } : role
                );
                setjobProfiles(updatedJobRoles);

                updatedValues = {
                    id: values.id,
                    ...values
                };
            }
            try {
                const response: any = await dispatch(postJobProfile(updatedValues));

                if (response?.status === 200) {
                    message.success('Job Profile created successfully!');

                    // ✅ ADD ONLY ONCE (after API success)
                    if (isCreatingNewProfile) {
                        setjobProfiles((prev: any) => {
                            const safePrev = Array.isArray(prev) ? prev : [];
                            return [...safePrev, response.data];
                        });
                    }
                    setJobProfileModalVisible(false);
                    setIsCreatingNewProfile(false);
                    resetForms();
                } else {
                    alert("Already have a Job Role mapped to Job Profile So you cant create any changes means do modify")
                    setJobProfileModalVisible(false);
                    setIsCreatingNewProfile(false);
                    message.error('Failed!');
                }
            } catch {
                message.error('Failed to create position');
            } finally {
                setLoading(false);
            }
        });
    };


    // const handleDeleteJobProfile = async (id: number) => {
    //     if (id === undefined || id === null) {
    //         message.error('Invalid Job Profile ID');
    //         return;
    //     }
    //     const response: any = await dispatch(deleteJobProfile(id));
    //     if (response && response.status === 200) {
    //         message.success('Job Profile deleted successfully');

    //         const res: any = await dispatch(getJobProfile());
    //         setjobProfiles(res?.data?.content ?? []);
    //     } else {
    //         message.error('Failed to delete Job Profile');
    //     }
    // };
    const handleDeleteJobProfile = async (id: number) => {
        if (id == null) {
            message.error('Invalid Job Profile ID');
            return;
        }
        const response: any = await dispatch(deleteJobProfile(id));
        if (response?.status === 200) {
            message.success('Job Profile deleted successfully');
            // ✅ remove locally, NO getAll call
            setjobProfiles((prev: any[]) =>
                Array.isArray(prev) ? prev.filter(p => p.id !== id) : []
            );
        } else {
            message.error('Failed to delete Job Profile');
        }
    };


    // Table columns
    const competencyColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'competencyName',
            key: 'competencyName',
        },
        {
            title: 'Job Role',
            dataIndex: 'jobRoleId',
            key: 'jobRoleId',
            render: (id: number) => jobRoles.find((f: { id: number; }) => f.id === id)?.jobRoleName || 'N/A'
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
                    {/* <Popconfirm
                        title="Are you sure to delete this competency?"
                        onConfirm={() => handleDeleteCompetency(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />} />
                    </Popconfirm> */}
                </Space>
            ),
        },
    ];

    const jobFamilyColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'jobFamilyName',
            key: 'jobFamilyName',
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
            dataIndex: 'jobRoleName',
            key: 'jobRoleName',
        },
        {
            title: 'Job Family',
            dataIndex: 'jobFamilyId',
            key: 'jobFamilyId',
            render: (id: number) => jobFamilies.find((f: { id: number; }) => f.id === id)?.jobFamilyName || 'N/A',
        },
        {
            title: 'Job Code',
            dataIndex: 'jobCodeId',
            key: 'jobCodeId',
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
        if (jobProfiles.length === 0) {
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
                {jobProfiles.map((jobProfile: any) => (
                    <Col xs={24} sm={12} md={8} lg={8} xl={6} key={jobProfile.id}>
                        <Card
                            title={jobFamilies.find((f: { id: number; }) => f.id === jobProfile.jobRoleId)?.jobFamilyName || 'N/A'}
                            extra={
                                <>
                                    <Button
                                        type="link"
                                        icon={<EditOutlined />}
                                        onClick={() => {
                                            setSelectedJobProfile(jobProfile);
                                            setIsCreatingNewProfile(false);
                                            jobProfileForm.setFieldsValue({
                                                ...jobProfile,
                                                jobRoleName: jobRoles.find((f: { id: number; }) => f.id === jobProfile.jobRoleId)?.jobRoleName || 'N/A'
                                            });
                                            setJobProfileModalVisible(true);
                                        }}
                                    />
                                    <Popconfirm
                                        title="Are you sure to delete this job profile?"
                                        onConfirm={() => handleDeleteJobProfile(jobProfile.id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type="link" danger icon={<DeleteOutlined />} />
                                    </Popconfirm>
                                </>
                            }
                            actions={[
                                <Button
                                    type="link"
                                    onClick={() => {
                                        setSelectedJobProfile(jobProfile);
                                        setIsCreatingNewProfile(false);
                                        jobProfileForm.setFieldsValue({
                                            ...jobProfile,
                                            jobRoleName: jobRoles.find((f: { id: number; }) => f.id === jobProfile.jobRoleId)?.jobRoleName || 'N/A'
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
                                <Text>{jobFamilies.find((f: { id: any; }) => f.id === jobProfile.jobRoleId)?.jobFamilyName || 'N/A'}</Text>
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <Text strong>Competencies: </Text>
                                <div style={{ marginTop: 8 }}>
                                    {jobProfile?.competencyIds?.map((id: React.Key | null | undefined) => {
                                        const comp = competencies.find((c: { id: any; }) => c.id === id);
                                        return comp ? <Tag key={id}>{comp.competencyName}</Tag> : null;
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
                                        value={jobProfile?.competencyIds?.length}
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
            label: 'Job Cluster',
            children: (
                <Card
                    title="Job Cluster"
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
            key: '2',
            label: 'Talent Role',
            children: (
                <Card
                    title="Talent Role"
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
        }, {
            key: '3',
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
            key: '4',
            label: 'Talent Architecture Hierarchy',
            children: (
                <Card
                    title={
                        <Space>
                            <span>Talent Architecture Hierarchy</span>
                            <Tag color="blue">{jobProfiles.length} Profiles</Tag>
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
                                name="id"
                                label="ID"
                                rules={[{ required: false }]}
                                hidden
                            >
                                <Input hidden />
                            </Form.Item>
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
                                <Select placeholder="Select job role">
                                    {jobRoles.map((roles: any) => (
                                        <Option key={roles.id} value={roles.id}>{roles.jobRoleName}</Option>
                                    ))}
                                </Select>
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
                                name="id"
                                label="ID"
                                rules={[{ required: false }]}
                                hidden
                            >
                                <Input hidden />
                            </Form.Item>
                            <Form.Item
                                name="jobFamilyName"
                                label="Job Family Name"
                                rules={[{ required: true, message: 'Please input the job family name!' }]}
                            >
                                <Input />
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
                                        name="id"
                                        label="ID"
                                        rules={[{ required: false }]}
                                        hidden
                                    >
                                        <Input hidden />
                                    </Form.Item>
                                    <Form.Item
                                        name="jobRoleName"
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
                                            {jobFamilies.map((family: any) => (
                                                <Option key={family.id} value={family.id}>{family.jobFamilyName}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            {/* <Form.Item
                                name="jobCodeId"
                                label="Job Code"
                                rules={[{ required: true, message: 'Please input the description!' }]}
                            >
                                <Input />
                            </Form.Item> */}
                            <Form.Item
                                name="jobCodeId"
                                label={
                                    <span>
                                        Job Code{" "}
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <BootstrapTooltip className="custom-tooltip">
                                                    Job Code is automatically generated and cannot be edited
                                                </BootstrapTooltip>
                                            }
                                        >
                                            <InfoCircleOutlined
                                                style={{ color: '#ffbb3c', cursor: 'pointer' }}
                                            />
                                        </OverlayTrigger>
                                    </span>
                                }
                                rules={[
                                    { required: true, message: 'Please enter the job code!' }
                                ]}
                            >
                                <Input placeholder="Auto-generated" readOnly />
                            </Form.Item>

                        </Form>
                    </Modal>

                    {/* Job Profile Modal */}
                    <Modal
                        centered={true}
                        title={isCreatingNewProfile ? 'Create New Job Profile' : `Edit Job Profile - ${jobRoles.find((f: { id: number; }) => f.id === selectedJobProfile?.jobRoleId)?.jobRoleName || 'N/A'}`}
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
                            <Form.Item
                                name="id"
                                label="ID"
                                hidden
                            >
                                <Input hidden />
                            </Form.Item>
                            <Form.Item
                                name="jobRoleId"
                                label="Job Role Id"
                            >
                                <Select placeholder="Select job role">
                                    {jobRoles.map((roles: any) => (
                                        <Option key={roles.id} value={roles.id}>{roles.jobRoleName}</Option>
                                    ))}
                                </Select>
                            </Form.Item>

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
                                    {competencies.map((comp: any) => (
                                        <Option key={comp.id} value={comp.id}>{comp.competencyName}</Option>
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