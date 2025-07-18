import React, { useState, useEffect } from 'react';
import {
  Layout,
  Card,
  Table,
  Tag,
  Space,
  Statistic,
  Progress,
  Row,
  Col,
  Select,
  DatePicker,
  Input,
  Avatar,
  Badge,
  Divider,
  Typography,
  Button
} from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
  MailOutlined,
  PhoneOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  appliedDate: string;
  interviewer?: string;
  resumeUrl?: string;
  skills: string[];
  experience: number;
  rating?: number;
}

interface RecruitmentStats {
  totalCandidates: number;
  newCandidates: number;
  hired: number;
  rejected: number;
  interviewScheduled: number;
  positions: {
    open: number;
    closed: number;
    total: number;
  };
}

const RecruitmentDashboard: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [stats, setStats] = useState<RecruitmentStats>({
    totalCandidates: 0,
    newCandidates: 0,
    hired: 0,
    rejected: 0,
    interviewScheduled: 0,
    positions: {
      open: 0,
      closed: 0,
      total: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [positionFilter, setPositionFilter] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<string[]>([]);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      try {
        // In a real app, you would fetch this from your backend
        const mockData: Candidate[] = [
          {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1 234 567 8901',
            position: 'Frontend Developer',
            status: 'interview',
            appliedDate: '2023-05-15',
            interviewer: 'Jane Smith',
            skills: ['React', 'TypeScript', 'CSS'],
            experience: 5,
            rating: 4
          },
          {
            id: '2',
            name: 'Alice Johnson',
            email: 'alice.j@example.com',
            position: 'UX Designer',
            status: 'screening',
            appliedDate: '2023-05-18',
            skills: ['Figma', 'User Research', 'Prototyping'],
            experience: 3,
            phone: '+1 345 678 9012',
            rating: 3
          },
          {
            id: '3',
            name: 'Michael Chen',
            email: 'michael.c@example.com',
            position: 'Backend Developer',
            status: 'offer',
            appliedDate: '2023-05-10',
            interviewer: 'Robert Taylor',
            skills: ['Node.js', 'Python', 'AWS'],
            experience: 7,
            phone: '+1 456 789 0123',
            rating: 5
          },
          {
            id: '4',
            name: 'Sarah Williams',
            email: 'sarah.w@example.com',
            position: 'Product Manager',
            status: 'hired',
            appliedDate: '2023-04-28',
            skills: ['Agile', 'Scrum', 'Product Strategy'],
            experience: 8,
            phone: '+1 567 890 1234',
            rating: 4
          },
          {
            id: '5',
            name: 'David Kim',
            email: 'david.k@example.com',
            position: 'Data Scientist',
            status: 'rejected',
            appliedDate: '2023-05-05',
            skills: ['Python', 'Machine Learning', 'SQL'],
            experience: 4,
            phone: '+1 678 901 2345',
            rating: 2
          },
          {
            id: '6',
            name: 'Emily Rodriguez',
            email: 'emily.r@example.com',
            position: 'Frontend Developer',
            status: 'applied',
            appliedDate: '2023-05-20',
            skills: ['JavaScript', 'React', 'HTML/CSS'],
            experience: 2,
            phone: '+1 789 012 3456',
            rating: 3
          }
        ];

        const mockStats: RecruitmentStats = {
          totalCandidates: mockData.length,
          newCandidates: mockData.filter(c => dayjs(c.appliedDate).isAfter(dayjs().subtract(7, 'days'))).length,
          hired: mockData.filter(c => c.status === 'hired').length,
          rejected: mockData.filter(c => c.status === 'rejected').length,
          interviewScheduled: mockData.filter(c => c.status === 'interview').length,
          positions: {
            open: 12,
            closed: 8,
            total: 20
          }
        };

        setCandidates(mockData);
        setStats(mockStats);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCandidates = candidates.filter(candidate => {
    // Search filter
    const matchesSearch =
      searchText === '' ||
      candidate.name.toLowerCase().includes(searchText.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchText.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchText.toLowerCase());

    // Status filter
    const matchesStatus =
      statusFilter.length === 0 || statusFilter.includes(candidate.status);

    // Position filter
    const matchesPosition =
      positionFilter.length === 0 || positionFilter.includes(candidate.position);

    // Date range filter
    const matchesDateRange =
      dateRange.length === 0 ||
      (dayjs(candidate.appliedDate).isAfter(dayjs(dateRange[0])) &&
      dayjs(candidate.appliedDate).isBefore(dayjs(dateRange[1])));

    return matchesSearch && matchesStatus && matchesPosition && matchesDateRange;
  });

  const columns: ColumnsType<Candidate> = [
    {
      title: 'Candidate',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div>{text}</div>
            <Text type="secondary">{record.email}</Text>
          </div>
        </Space>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      filters: [
        ...new Set(candidates.map(candidate => candidate.position))
      ].map(position => ({
        text: position,
        value: position
      })),
      onFilter: (value, record) => record.position.includes(value as string),
      sorter: (a, b) => a.position.localeCompare(b.position)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = '';
        let icon = <UserOutlined />;
        
        switch (status) {
          case 'applied':
            color = 'blue';
            icon = <FileTextOutlined />;
            break;
          case 'screening':
            color = 'geekblue';
            icon = <ClockCircleOutlined />;
            break;
          case 'interview':
            color = 'orange';
            icon = <UserOutlined />;
            break;
          case 'offer':
            color = 'purple';
            icon = <MailOutlined />;
            break;
          case 'hired':
            color = 'green';
            icon = <CheckCircleOutlined />;
            break;
          case 'rejected':
            color = 'red';
            icon = <CloseCircleOutlined />;
            break;
          default:
            color = 'default';
        }
        
        return (
          <Tag icon={icon} color={color}>
            {status.toUpperCase()}
          </Tag>
        );
      },
      filters: [
        { text: 'Applied', value: 'applied' },
        { text: 'Screening', value: 'screening' },
        { text: 'Interview', value: 'interview' },
        { text: 'Offer', value: 'offer' },
        { text: 'Hired', value: 'hired' },
        { text: 'Rejected', value: 'rejected' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Applied Date',
      dataIndex: 'appliedDate',
      key: 'appliedDate',
      render: (date: string) => dayjs(date).format('MMM D, YYYY'),
      sorter: (a, b) => dayjs(a.appliedDate).unix() - dayjs(b.appliedDate).unix()
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
      render: (exp: number) => `${exp} ${exp === 1 ? 'year' : 'years'}`,
      sorter: (a, b) => a.experience - b.experience
    },
    {
      title: 'Skills',
      dataIndex: 'skills',
      key: 'skills',
      render: (skills: string[]) => (
        <Space size="small">
          {skills.map(skill => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </Space>
      )
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating?: number) => (
        rating ? (
          <Progress 
            type="circle" 
            percent={(rating / 5) * 100} 
            width={40} 
            format={() => rating.toFixed(1)} 
          />
        ) : <Text type="secondary">N/A</Text>
      ),
      sorter: (a, b) => (a.rating || 0) - (b.rating || 0)
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<MailOutlined />} />
          <Button type="link" icon={<PhoneOutlined />} />
          <Button type="link">View</Button>
        </Space>
      )
    }
  ];

  const statusCounts = candidates.reduce((acc, candidate) => {
    acc[candidate.status] = (acc[candidate.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="page-wrapper">
      <div className="content">
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={3} style={{ margin: '16px 0' }}>Recruitment Dashboard</Title>
          <div>
            <Button type="primary" style={{ marginRight: 8 }}>New Candidate</Button>
            <Button>Reports</Button>
          </div>
        </div>
      </Header>
      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
        {/* Filters Section */}
        <Card style={{ marginBottom: 24 }}>
          <Row gutter={16}>
            <Col span={8}>
              <Input
                placeholder="Search candidates..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                allowClear
              />
            </Col>
            <Col span={6}>
              <Select
                mode="multiple"
                placeholder="Filter by status"
                style={{ width: '100%' }}
                onChange={setStatusFilter}
                value={statusFilter}
                allowClear
                suffixIcon={<FilterOutlined />}
              >
                <Option value="applied">Applied</Option>
                <Option value="screening">Screening</Option>
                <Option value="interview">Interview</Option>
                <Option value="offer">Offer</Option>
                <Option value="hired">Hired</Option>
                <Option value="rejected">Rejected</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Select
                mode="multiple"
                placeholder="Filter by position"
                style={{ width: '100%' }}
                onChange={setPositionFilter}
                value={positionFilter}
                allowClear
                suffixIcon={<FilterOutlined />}
              >
                {Array.from(new Set(candidates.map(c => c.position))).map(pos => (
                  <Option key={pos} value={pos}>{pos}</Option>
                ))}
              </Select>
            </Col>
            <Col span={4}>
              <RangePicker 
                style={{ width: '100%' }} 
                onChange={(dates, dateStrings) => setDateRange(dateStrings)}
              />
            </Col>
          </Row>
        </Card>

        {/* Stats Overview */}
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Candidates"
                value={stats.totalCandidates}
                valueStyle={{ color: '#1890ff' }}
              />
              <Progress 
                percent={100} 
                showInfo={false} 
                strokeColor="#1890ff" 
              />
              <Text type="secondary">{stats.newCandidates} new this week</Text>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Hired"
                value={stats.hired}
                valueStyle={{ color: '#52c41a' }}
              />
              <Progress 
                percent={(stats.hired / stats.totalCandidates) * 100} 
                showInfo={false} 
                strokeColor="#52c41a" 
              />
              <Text type="secondary">
                {stats.totalCandidates > 0 ? 
                  `${Math.round((stats.hired / stats.totalCandidates) * 100)}% success rate` : 
                  'No data'}
              </Text>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Rejected"
                value={stats.rejected}
                valueStyle={{ color: '#f5222d' }}
              />
              <Progress 
                percent={(stats.rejected / stats.totalCandidates) * 100} 
                showInfo={false} 
                strokeColor="#f5222d" 
              />
              <Text type="secondary">
                {stats.totalCandidates > 0 ? 
                  `${Math.round((stats.rejected / stats.totalCandidates) * 100)}% rejection rate` : 
                  'No data'}
              </Text>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Open Positions"
                value={stats.positions.open}
                suffix={`/ ${stats.positions.total}`}
                valueStyle={{ color: '#faad14' }}
              />
              <Progress 
                percent={(stats.positions.closed / stats.positions.total) * 100} 
                showInfo={false} 
                strokeColor="#faad14" 
              />
              <Text type="secondary">
                {stats.positions.closed} positions filled
              </Text>
            </Card>
          </Col>
        </Row>

        {/* Status Distribution */}
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={24}>
            <Card title="Application Status Distribution">
              <Row gutter={16}>
                {Object.entries(statusCounts).map(([status, count]) => (
                  <Col key={status} span={4}>
                    <Card size="small">
                      <Statistic
                        title={status.charAt(0).toUpperCase() + status.slice(1)}
                        value={count}
                      />
                      <Progress 
                        percent={(count / stats.totalCandidates) * 100} 
                        showInfo={false} 
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Candidates Table */}
        <Card
          title={`Candidates (${filteredCandidates.length})`}
          extra={
            <Space>
              <Button>Export</Button>
              <Button type="primary">Add Candidate</Button>
            </Space>
          }
        >
          <Table
            columns={columns}
            dataSource={filteredCandidates}
            rowKey="id"
            loading={loading}
            scroll={{ x: true }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} candidates`
            }}
          />
        </Card>
      </Content>
    </Layout>
    </div>
    </div>
  );
};

export default RecruitmentDashboard;