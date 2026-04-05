import React, { useState, useEffect, useRef } from 'react';
import {
    Table, Card, Button, Radio, Input, Popconfirm, Tag, Space,
    Row, Col, Statistic, Divider, Dropdown, Menu, Badge, Avatar, Modal, message, Tooltip
} from 'antd';
import {
    PlusOutlined, UnorderedListOutlined, AppstoreOutlined,
    EditOutlined, DeleteOutlined, FilterOutlined,
    MoreOutlined, SearchOutlined, DownloadOutlined,
    EyeOutlined, TeamOutlined, DollarOutlined, CalendarOutlined,
    FileAddOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PositionFilters from './positionFilters';
import PositionStatusChart from './positionStatusChart';
import { useAppDispatch } from '../../../core/data/redux/store';
import { getPositionBulkUpload, getPositionDownloadTemplate, getPositions, resetJobById } from '../../../core/data/redux/actions/requisitionActions';
import { deleteposition } from '../../../core/data/redux/actions/jobProfileActions';
import { removeEmptyParams } from '../../../utils/misc';
import { EllipsisOutlined } from '@ant-design/icons';
import JobPostAlertModal from '../../../core/modals/postJobAlertModal';
import { OverlayTrigger, Tooltip as BootstrapTooltip } from "react-bootstrap";


const PositionManagement = () => {
    const [viewMode, setViewMode] = useState('list');
    const [searchText, setSearchText] = useState('');
    const [filteredPositions, setFilteredPositions] = useState([] as any);
    const [selectedRows, setSelectedRows] = useState([] as any);
    const [loading, setLoading] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showAlertModal, setShowAlertModal] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Sample data
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        // Simulate API call
        setLoading(true);
        fetchPositions();
        dispatch(resetJobById());
    }, []);

    const fetchPositions = async (filters?: any) => {
        // Simulate API call
        // const filtersString = filters ? Object.entries(removeEmptyParams(filters)).map(([key, value]) => `${key}=${value}`).join('&') : '';
        const finalFilters = {
            ...filters,
            status: 'ACTIVE'
        };
        const filtersString = Object.entries(removeEmptyParams(finalFilters))
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        const response: any = await dispatch(getPositions(filtersString));
        const data = response.data?.content;
        if (response.status !== 200) {
            message.error('Error fetching positions!');
        } else {
            setTimeout(() => {
                setPositions(data);
                setFilteredPositions(data);
                setLoading(false);
            }, 500);
        }
    };

    // const handleSearch = (value: any) => {
    //     setSearchText(value);
    //     if (!value) {
    //         setFilteredPositions(positions);
    //         return;
    //     }
    //     const filtered = positions.filter((position: any) =>
    //         position?.name.toLowerCase().includes(value.toLowerCase()) ||
    //         position?.code.toLowerCase().includes(value.toLowerCase()) ||
    //         position?.jobCode.toLowerCase().includes(value.toLowerCase())
    //     );
    //     setFilteredPositions(filtered);
    // };
    const handleSearch = (value: string) => {
        setSearchText(value);
        if (!value) {
            setFilteredPositions(positions);
            return;
        }
        const search = value.toLowerCase();
        const filtered = positions.filter((position: any) =>
            (position?.name ?? '').toLowerCase().includes(search) ||
            (position?.code ?? '').toLowerCase().includes(search) ||
            (position?.jobCode ?? '').toLowerCase().includes(search)
        );
        setFilteredPositions(filtered);
    };

    const handleDelete = async (id: any) => {
        const positionId = Number(id);
        const response: any = await dispatch(deleteposition(positionId));
        const data = response.data;
        // console.log(data)
        if (response.status !== 200) {
            message.error("Error fetching position");
        } else {
            message.success('Position deleted successfully');
            // navigate('/positions');
            fetchPositions();
        }
    };

    const handleBulkDelete = () => {
        setPositions(positions.filter((position: any) => !selectedRows.includes(position.id)));
        setSelectedRows([]);
        message.success('Selected positions deleted successfully');
    };

    const handleEdit = (id: any) => {
        navigate(`/positions/edit/${id}`);
    };

    const handleView = (id: any) => {
        navigate(`/positions/view/${id}`);
    };

    const handleCreateJob = (id: any) => {
        navigate(`/create/job-requisition/?positionId=${id}`);
    };

    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        setPagination(pagination);
        // Add sorting/filtering logic here
    };

    const rowSelection = {
        selectedRowKeys: selectedRows,
        onChange: (selectedRowKeys: any) => setSelectedRows(selectedRowKeys),
    };

    const moreMenu = (record: any) => (
        <Menu>
            <Menu.Item icon={<EyeOutlined />} onClick={() => handleView(record.id)}>
                View Details
            </Menu.Item>
            <Menu.Item icon={<FileAddOutlined />} onClick={() => handleCreateJob(record.id)}>
                Create Job
            </Menu.Item>
            {/* <Menu.Item icon={<EditOutlined />} onClick={() => handleEdit(record.id)}>
                Edit
            </Menu.Item> */}
            <Menu.Divider />
            <Popconfirm
                title={`Do you really want to delete this position? `}
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
            >
                <Menu.Item
                    icon={<DeleteOutlined />}
                    danger
                // onClick={() => handleDelete(record.id)}
                //     Modal.confirm({
                //     title: 'Confirm Delete',
                //     content: `Are you sure you want to delete ${record.name}?`,
                //     onOk: () => handleDelete(record.id)
                // })}
                >
                    Delete
                </Menu.Item>
            </Popconfirm>
        </Menu>
    );

    const moreMenuForCard = (record: any) => (
        <Menu>
            <Menu.Item icon={<FileAddOutlined />} onClick={() => handleCreateJob(record.id)}>
                Create Job
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
                icon={<DeleteOutlined />}
                danger
                onClick={() => Modal.confirm({
                    title: 'Confirm Delete',
                    content: `Are you sure you want to delete ${record.name}?`,
                    onOk: () => handleDelete(record.id)
                })}
            >
                Delete
            </Menu.Item>
        </Menu>
    );

    const columns = [
        {
            title: 'Position Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            render: (text: any, record: any) => (
                <Button type="link" onClick={() => handleView(record.id)}>
                    {text}
                </Button>
            ),
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            sorter: true,
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            render: (department: any) => department?.name,
            sorter: (a: any, b: any) => a.department.name.localeCompare(b.department.name),
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            render: (location: any) => location?.name,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: any) => (
                <Tag color={status === 'ACTIVE' ? 'green' : status === 'INACTIVE' ? 'red' : 'orange'}>
                    {status === 'ACTIVE' ? 'Active' : status === 'INACTIVE' ? 'Inactive' : 'Draft'}
                </Tag>
            ),
            filters: [
                { text: 'Active', value: 1 },
                { text: 'Inactive', value: 0 },
            ],
            onFilter: (value: any, record: any) => record.status === value,
        },
        {
            title: 'Hiring Manager',
            dataIndex: 'hiringManager',
            key: 'hiringManager',
            render: (manager: any) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar size="small" src={manager?.avatar} style={{ marginRight: 8 }} />
                    {manager?.name}
                </div>
            ),
        },
        {
            title: 'Candidates',
            dataIndex: 'candidates',
            key: 'candidates',
            render: (count: any) => (
                <Badge count={count} style={{ backgroundColor: '#1890ff' }} />
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 100,
            render: (_: any, record: any) => (
                <Space>
                    <Tooltip title="Edit">
                        <Button
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(record.id)}
                        />
                    </Tooltip>
                    <Dropdown overlay={moreMenu(record)} trigger={['click']}>
                        <Button shape="circle" icon={<MoreOutlined />} />
                    </Dropdown>
                </Space>
            ),
        },
    ];

    const menu = (
        <Menu
            items={[
                {
                    key: 'download',
                    label: 'Download Template',
                    onClick: () => {
                        dispatch(getPositionDownloadTemplate());
                    },
                },
                {
                    key: 'import',
                    label: 'Import Template',
                    onClick: () => {
                        fileInputRef.current?.click(); // 🔥 opens file explorer
                    },
                },
            ]}
        />
    );



    return (
        <div className="page-wrapper">
            <div className="content">
                <div>
                    <Card
                        bordered={false}
                        style={{ boxShadow: 'none' }}
                        bodyStyle={{ padding: 20 }}
                    >
                        {/* Header Section */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 24
                        }}>
                            <div>
                                <h2 style={{
                                    fontSize: 24,
                                    marginBottom: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12
                                }}>
                                    <TeamOutlined style={{ color: '#1890ff' }} />
                                    Position Management
                                </h2>
                                <p style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 0 }}>
                                    Manage all positions in your organization
                                </p>
                            </div>

                            <Space>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                                    <Button
                                        type="primary"
                                        icon={<PlusOutlined />}
                                        onClick={() => navigate('/positions/create')}
                                    >
                                        Create Position
                                    </Button>

                                    {/* <Dropdown overlay={menu} trigger={['click']}>
                                        <Button className="three-dot-btn" >
                                            <EllipsisOutlined />
                                        </Button>
                                    </Dropdown>
                                     */}
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <BootstrapTooltip id="dot-tooltip" className="custom-tooltip">
                                                Import or export bulk templates
                                            </BootstrapTooltip>
                                        }
                                    >
                                        <span style={{ display: 'inline-block' }}>
                                            <Dropdown overlay={menu} trigger={['click']}>
                                                <Button className="three-dot-btn">
                                                    <EllipsisOutlined />
                                                </Button>
                                            </Dropdown>
                                        </span>
                                    </OverlayTrigger>
                                    {/* Hidden File Input */}
                                    <input
                                        type="file"
                                        accept=".xlsx"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];

                                            if (file) {
                                                if (!file.name.endsWith('.xlsx')) {
                                                    setAlertMessage("Only .xlsx files are allowed");
                                                    setShowAlertModal(true);
                                                    return;
                                                }

                                                dispatch(getPositionBulkUpload(file));
                                                e.target.value = ''; // reset
                                            }
                                        }}
                                    />

                                </div>
                            </Space>
                        </div>

                        {/* Stats Overview */}
                        <Row gutter={16} style={{ marginBottom: 24 }}>
                            <Col xs={24} sm={12} md={6}>
                                <Card>
                                    <Statistic
                                        title="Total Positions"
                                        value={positions?.length}
                                        prefix={<TeamOutlined />}
                                    />
                                </Card>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <Card>
                                    <Statistic
                                        title="Active Positions"
                                        value={positions?.filter((p: any) => p.status === 'ACTIVE')?.length}
                                        prefix={<TeamOutlined style={{ color: '#52c41a' }} />}
                                    />
                                </Card>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <Card>
                                    <Statistic
                                        title="Positions to Hire"
                                        value={positions?.filter((p: any) => p?.toBeHired)?.length}
                                        prefix={<DollarOutlined style={{ color: '#faad14' }} />}
                                    />
                                </Card>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <Card>
                                    <Statistic
                                        title="Expiring Soon"
                                        value={3} // This would be calculated in a real app
                                        prefix={<CalendarOutlined style={{ color: '#f5222d' }} />}
                                    />
                                </Card>
                            </Col>
                        </Row>

                        {/* Visualization */}
                        {/* <Card style={{ marginBottom: 24 }}>
          <PositionStatusChart data={positions} />
        </Card> */}

                        {/* Toolbar */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 16,
                            gap: 16,
                            flexWrap: 'wrap'
                        }}>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                <Input.Search
                                    placeholder="Search positions..."
                                    prefix={<SearchOutlined />}
                                    style={{ width: 280 }}
                                    allowClear
                                    enterButton
                                    onSearch={handleSearch}
                                />

                                <Button
                                    icon={<FilterOutlined />}
                                    onClick={() => setShowFilters(!showFilters)}
                                >
                                    Filters
                                </Button>

                                {selectedRows?.length > 0 && (
                                    <Popconfirm
                                        title={`Delete ${selectedRows?.length} selected positions?`}
                                        onConfirm={handleBulkDelete}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button danger icon={<DeleteOutlined />}>
                                            Delete Selected
                                        </Button>
                                    </Popconfirm>
                                )}
                            </div>

                            <div>
                                <Radio.Group
                                    value={viewMode}
                                    onChange={(e) => setViewMode(e.target.value)}
                                    buttonStyle="solid"
                                >
                                    <Radio.Button value="list"><UnorderedListOutlined /></Radio.Button>
                                    <Radio.Button value="grid"><AppstoreOutlined /></Radio.Button>
                                </Radio.Group>

                                <Button
                                    icon={<DownloadOutlined />}
                                    style={{ marginLeft: 8 }}
                                >
                                    Export
                                </Button>
                            </div>
                        </div>

                        {/* Filters Panel */}
                        {showFilters && (
                            <Card style={{ marginBottom: 16 }}>
                                <PositionFilters
                                    onFilter={(values) => {
                                        // Apply filters to positions
                                        console.log('Filter values:', values);
                                        fetchPositions(values);
                                    }}
                                />
                            </Card>
                        )}

                        {/* Divider */}
                        <Divider style={{ margin: '16px 0', paddingBottom: '50px' }} />

                        {/* Main Content */}
                        {viewMode === 'list' ? (
                            <Table
                                className="table datanew dataTable no-footer"
                                columns={columns}
                                dataSource={filteredPositions}
                                rowKey="id"
                                loading={loading}
                                bordered
                                rowSelection={rowSelection}
                                pagination={{
                                    locale: { items_per_page: "" },
                                    nextIcon: <i className="ti ti-chevron-right" />,
                                    prevIcon: <i className="ti ti-chevron-left" />,
                                    defaultPageSize: 10,
                                    showSizeChanger: true,
                                    pageSizeOptions: ["10", "20", "30"],
                                    showTotal: (total, range) => `Showing ${range[0]} - ${range[1]} of ${total} entries`,
                                }}
                                onChange={handleTableChange}
                                scroll={{ x: 'max-content' }}
                            />
                        ) : (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                gap: '16px'
                            }}>
                                {filteredPositions.map((position: any) => (
                                    <Card
                                        key={position.id}
                                        hoverable
                                        cover={
                                            <div style={{
                                                height: 120,
                                                background: '#f0f2f5',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <TeamOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                                            </div>
                                        }
                                        actions={[
                                            <Tooltip title="View">
                                                <EyeOutlined onClick={() => handleView(position.id)} />
                                            </Tooltip>,
                                            <Tooltip title="Edit">
                                                <EditOutlined onClick={() => handleEdit(position.id)} />
                                            </Tooltip>,
                                            <Dropdown overlay={moreMenuForCard(position)} trigger={['click']}>
                                                <Button shape="circle" icon={<MoreOutlined />} />
                                            </Dropdown>
                                        ]}
                                    >
                                        <Card.Meta
                                            title={
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>{position.name}</span>
                                                    <Tag color={position.status === 'ACTIVE' ? 'green' : 'red'}>
                                                        {position.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                                                    </Tag>
                                                </div>
                                            }
                                            description={
                                                <div style={{ marginTop: 12 }}>
                                                    <p><strong>Code:</strong> {position.code}</p>
                                                    <p><strong>Department:</strong> {position.department?.name}</p>
                                                    <p><strong>Location:</strong> {position.location?.name}</p>
                                                    <p><strong>Pay Grade:</strong> {position.payGrad}</p>
                                                    <p>
                                                        <strong>Candidates:</strong>
                                                        <Badge count={position.candidates} style={{
                                                            backgroundColor: '#1890ff',
                                                            marginLeft: 8
                                                        }} />
                                                    </p>
                                                </div>
                                            }
                                        />
                                    </Card>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>
            </div>
            {showAlertModal && (
                <JobPostAlertModal
                    message={alertMessage}
                    onClose={() => setShowAlertModal(false)}
                />
            )}
        </div>
    );
};

export default PositionManagement;