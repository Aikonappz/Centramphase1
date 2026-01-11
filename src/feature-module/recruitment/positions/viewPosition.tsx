import React from 'react';
import {
    Card,
    Descriptions,
    Tag,
    Divider,
    Button,
    Space,
    Row,
    Col,
    Statistic,
    Avatar,
    Tabs,
    Timeline,
    Badge,
    message,
    Modal
} from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    ArrowLeftOutlined,
    TeamOutlined,
    DollarOutlined,
    CalendarOutlined,
    EnvironmentOutlined,
    ApartmentOutlined,
    ClockCircleOutlined,
    UserOutlined,
    FileTextOutlined,
    HistoryOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

const { TabPane } = Tabs;

interface Position {
    id: number;
    name: string;
    code: string;
    status: number;
    startDate: string;
    jobCode: string;
    fte: number;
    location: {
        id: number;
        name: string;
        address?: string;
    };
    costCenter: string;
    endDate: string;
    payGrad: string;
    standardHour: number;
    toBeHired: boolean;
    minPay: number;
    midPay: number;
    maxPay: number;
    department: {
        id: number;
        name: string;
    };
    organisation: {
        id: number;
        name: string;
    };
    division: {
        id: number;
        name: string;
    };
    businessUnit: {
        id: number;
        name: string;
    };
    hiringManager: {
        id: number;
        name: string;
        email: string;
        avatar?: string;
    };
    candidates?: number;
    lastUpdated?: string;
    description?: string;
}

const PositionDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Mock data - in a real app, this would come from an API
    const positionData: Position = {
        id: 14,
        name: "Senior Software Engineer",
        code: "POS020",
        status: 1,
        startDate: "2025-07-17",
        jobCode: "1234",
        fte: 1.0,
        location: {
            id: 12345,
            name: "San Francisco HQ",
            address: "123 Tech Street, San Francisco, CA 94107"
        },
        costCenter: "CC-TECH",
        endDate: "2026-07-17",
        payGrad: "G7",
        standardHour: 40,
        toBeHired: true,
        minPay: 50000.00,
        midPay: 75000.00,
        maxPay: 100000.00,
        department: { id: 101, name: "Engineering" },
        organisation: { id: 201, name: "Tech Division" },
        division: { id: 301, name: "Product Development" },
        businessUnit: { id: 401, name: "Software Engineering" },
        hiringManager: {
            id: 1,
            name: "John Doe",
            email: "john.doe@company.com",
            avatar: "https://i.pravatar.cc/150?img=1"
        },
        candidates: 5,
        lastUpdated: "2023-05-15T10:30:00Z",
        description: "We are looking for a Senior Software Engineer to join our team. The ideal candidate will have 5+ years of experience in full-stack development and a passion for building scalable applications."
    };

    const handleEdit = () => {
        navigate(`/positions/edit/${id}`);
    };

    const handleDelete = () => {
        Modal.confirm({
            title: 'Delete Position',
            content: 'Are you sure you want to delete this position? This action cannot be undone.',
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                // Delete logic would go here
                message.success('Position deleted successfully');
                navigate('/positions');
            },
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const statusTag = (status: number) => {
        switch (status) {
            case 1: return <Tag color="green">Active</Tag>;
            case 0: return <Tag color="red">Inactive</Tag>;
            default: return <Tag color="orange">Draft</Tag>;
        }
    };

    const hiringStatusTag = (toBeHired: boolean) => {
        return toBeHired
            ? <Tag icon={<ClockCircleOutlined />} color="blue">To Be Hired</Tag>
            : <Tag icon={<CheckCircleOutlined />} color="green">Filled</Tag>;
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <div>
                    <Button
                        type="text"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/positions')}
                        style={{ marginBottom: 16 }}
                    >
                        Back to Positions
                    </Button>

                    <Card
                        title={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <TeamOutlined style={{ fontSize: 24, marginRight: 12, color: '#1890ff' }} />
                                <span style={{ fontSize: 20 }}>{positionData.name}</span>
                                <div style={{ marginLeft: 'auto' }}>
                                    <Space>
                                        <Button icon={<EditOutlined />} onClick={handleEdit}>
                                            Edit
                                        </Button>
                                        <Button
                                            danger
                                            icon={<DeleteOutlined />}
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </Button>
                                    </Space>
                                </div>
                            </div>
                        }
                        bordered={false}
                        style={{ boxShadow: 'none' }}
                    >
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={<span><FileTextOutlined /> Overview</span>} key="1">
                                <Row gutter={[24, 16]}>
                                    <Col xs={24} sm={24} md={16}>
                                        <Card title="Position Details" style={{ marginBottom: 24 }}>
                                            <Descriptions column={1} bordered>
                                                <Descriptions.Item label="Position Code">
                                                    <Tag color="blue">{positionData.code}</Tag>
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Job Code">
                                                    {positionData.jobCode}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Status">
                                                    {statusTag(positionData.status)} {hiringStatusTag(positionData.toBeHired)}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Description">
                                                    {positionData.description || 'No description provided'}
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </Card>

                                        <Card title="Employment Details" style={{ marginBottom: 24 }}>
                                            <Descriptions column={2} bordered>
                                                <Descriptions.Item label="Start Date">
                                                    <CalendarOutlined style={{ marginRight: 8 }} />
                                                    {formatDate(positionData.startDate)}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="End Date">
                                                    <CalendarOutlined style={{ marginRight: 8 }} />
                                                    {positionData.endDate ? formatDate(positionData.endDate) : 'N/A'}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="FTE">
                                                    {positionData.fte}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Standard Hours">
                                                    {positionData.standardHour} hrs/week
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Cost Center">
                                                    {positionData.costCenter}
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </Card>

                                        <Card title="Compensation">
                                            <Row gutter={16}>
                                                <Col xs={24} sm={8}>
                                                    <Statistic
                                                        title="Minimum Pay"
                                                        value={positionData.minPay}
                                                        prefix={<DollarOutlined />}
                                                        valueStyle={{ color: '#3f8600' }}
                                                    />
                                                </Col>
                                                <Col xs={24} sm={8}>
                                                    <Statistic
                                                        title="Mid Pay"
                                                        value={positionData.midPay}
                                                        prefix={<DollarOutlined />}
                                                        valueStyle={{ color: '#1890ff' }}
                                                    />
                                                </Col>
                                                <Col xs={24} sm={8}>
                                                    <Statistic
                                                        title="Maximum Pay"
                                                        value={positionData.maxPay}
                                                        prefix={<DollarOutlined />}
                                                        valueStyle={{ color: '#cf1322' }}
                                                    />
                                                </Col>
                                            </Row>
                                            <Divider />
                                            <Descriptions column={1}>
                                                <Descriptions.Item label="Pay Grade">
                                                    <Tag color="purple">{positionData.payGrad}</Tag>
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </Card>
                                    </Col>

                                    <Col xs={24} sm={24} md={8}>
                                        <Card title="Organizational Structure" style={{ marginBottom: 24 }}>
                                            <Timeline>
                                                <Timeline.Item dot={<ApartmentOutlined style={{ fontSize: '16px' }} />}>
                                                    <strong>Organization:</strong> {positionData.organisation.name}
                                                </Timeline.Item>
                                                <Timeline.Item dot={<ApartmentOutlined style={{ fontSize: '16px' }} />}>
                                                    <strong>Division:</strong> {positionData.division.name}
                                                </Timeline.Item>
                                                <Timeline.Item dot={<ApartmentOutlined style={{ fontSize: '16px' }} />}>
                                                    <strong>Business Unit:</strong> {positionData.businessUnit.name}
                                                </Timeline.Item>
                                                <Timeline.Item dot={<ApartmentOutlined style={{ fontSize: '16px' }} />}>
                                                    <strong>Department:</strong> {positionData.department.name}
                                                </Timeline.Item>
                                            </Timeline>
                                        </Card>

                                        <Card title="Location" style={{ marginBottom: 24 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                                                <EnvironmentOutlined style={{ fontSize: 20, color: '#1890ff', marginRight: 12 }} />
                                                <div>
                                                    <div style={{ fontWeight: 'bold' }}>{positionData.location.name}</div>
                                                    {positionData.location.address && (
                                                        <div style={{ color: 'rgba(0,0,0,0.45)' }}>
                                                            {positionData.location.address}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Card>

                                        <Card title="Hiring Manager">
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                                                <Avatar
                                                    size={64}
                                                    src={positionData.hiringManager.avatar}
                                                    icon={<UserOutlined />}
                                                />
                                                <div style={{ marginLeft: 16 }}>
                                                    <div style={{ fontWeight: 'bold', fontSize: 16 }}>
                                                        {positionData.hiringManager.name}
                                                    </div>
                                                    <div style={{ color: 'rgba(0,0,0,0.45)' }}>
                                                        {positionData.hiringManager.email}
                                                    </div>
                                                </div>
                                            </div>
                                            <Button type="primary" block>
                                                Contact Manager
                                            </Button>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>

                            <TabPane
                                tab={
                                    <span>
                                        <TeamOutlined /> Candidates <Badge count={positionData.candidates} style={{ backgroundColor: '#52c41a' }} />
                                    </span>
                                }
                                key="2"
                            >
                                <Card>
                                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                        <TeamOutlined style={{ fontSize: 48, color: '#1890ff', marginBottom: 16 }} />
                                        <h3>Candidates Management</h3>
                                        <p>View and manage candidates for this position</p>
                                        <Button type="primary">View Candidates</Button>
                                    </div>
                                </Card>
                            </TabPane>

                            <TabPane tab={<span><HistoryOutlined /> Activity</span>} key="3">
                                <Card>
                                    <Timeline mode="alternate">
                                        <Timeline.Item color="green">
                                            Created position
                                            <div style={{ color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>
                                                {formatDateTime(positionData.lastUpdated || positionData.startDate)}
                                            </div>
                                        </Timeline.Item>
                                        <Timeline.Item color="blue">
                                            Approved by HR
                                            <div style={{ color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>
                                                May 16, 2023 11:30 AM
                                            </div>
                                        </Timeline.Item>
                                        <Timeline.Item color="orange">
                                            Budget approved
                                            <div style={{ color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>
                                                May 17, 2023 09:15 AM
                                            </div>
                                        </Timeline.Item>
                                        <Timeline.Item>
                                            Posted to job boards
                                            <div style={{ color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>
                                                May 18, 2023 02:00 PM
                                            </div>
                                        </Timeline.Item>
                                    </Timeline>
                                </Card>
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PositionDetails;