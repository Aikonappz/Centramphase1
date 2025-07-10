// src/pages/CareerPage.tsx
import React, { useState } from 'react';
import { 
  Layout, 
  Typography, 
  Card, 
  Row, 
  Col, 
  Button, 
  Divider, 
  List, 
  Space, 
  Tag, 
  Input,
  Select, 
  Empty,
  Pagination
} from 'antd';
import { 
  RocketOutlined, 
  TeamOutlined, 
  DollarOutlined, 
  GlobalOutlined,
  CheckCircleOutlined,
  SearchOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import '../../../style/css/career.css'

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

type JobPosition = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
};
const PAGE_SIZE = 3; // Number of jobs per page
const CareerPage: React.FC = () => {
  // Sample job data
  const allJobPositions: JobPosition[] = [
    {
      id: '1',
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces and implementing features using React and TypeScript.',
      requirements: [
        '3+ years of experience with React',
        'Proficiency in TypeScript',
        'Experience with state management (Redux, MobX, or Context API)',
        'Familiarity with Ant Design or other UI libraries',
        'Strong understanding of responsive design'
      ]
    },
    {
      id: '2',
      title: 'UX Designer',
      department: 'Design',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Join our design team to create beautiful, intuitive user experiences for our products. You will work closely with product managers and engineers to bring designs to life.',
      requirements: [
        'Portfolio demonstrating UX/UI design skills',
        'Experience with Figma or Sketch',
        'Understanding of user-centered design principles',
        'Ability to create wireframes and prototypes',
        '2+ years of professional design experience'
      ]
    },
    {
      id: '3',
      title: 'Backend Engineer',
      department: 'Engineering',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'We need a Backend Engineer to develop and maintain our server infrastructure. You will work with Node.js, databases, and cloud services to build scalable APIs.',
      requirements: [
        'Experience with Node.js and Express',
        'Knowledge of SQL and NoSQL databases',
        'Familiarity with cloud platforms (AWS, GCP, or Azure)',
        'Understanding of RESTful API design',
        'Experience with authentication and authorization'
      ]
    },
    {
      id: '4',
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      type: 'Full-time',
      description: 'Lead our product development efforts by defining product vision, strategy, and roadmap. Work with cross-functional teams to deliver exceptional products.',
      requirements: [
        '5+ years of product management experience',
        'Strong analytical and problem-solving skills',
        'Excellent communication and leadership abilities',
        'Experience with Agile methodologies',
        'Technical background is a plus'
      ]
    },
    {
      id: '5',
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Austin, TX',
      type: 'Full-time',
      description: 'Implement and maintain our CI/CD pipelines and cloud infrastructure. Ensure high availability and scalability of our systems.',
      requirements: [
        'Experience with Docker and Kubernetes',
        'Knowledge of infrastructure as code (Terraform, CloudFormation)',
        'Familiarity with monitoring tools (Prometheus, Grafana)',
        'Strong scripting skills (Bash, Python)',
        '3+ years of DevOps experience'
      ]
    }
  ];

  const [jobPositions, setJobPositions] = useState<JobPosition[]>(allJobPositions);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [filteredJobs, setFilteredJobs] = useState<JobPosition[]>(allJobPositions);
  const [displayedJobs, setDisplayedJobs] = useState<JobPosition[]>(allJobPositions.slice(0, PAGE_SIZE));
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(allJobPositions.length);

  // Get unique locations for filter dropdown
  const locations = Array.from(new Set(allJobPositions.map(job => job.location)));

  // Filter jobs based on search term and location
  // Filter jobs based on search term and location
  const filterJobs = (term: string, location: string | null, page: number = 1) => {
    let filtered = [...allJobPositions];
    
    if (term) {
      const lowerTerm = term.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(lowerTerm) ||
        job.department.toLowerCase().includes(lowerTerm) ||
        job.description.toLowerCase().includes(lowerTerm) ||
        job.requirements.some(req => req.toLowerCase().includes(lowerTerm))
      );
    }
    
    if (location) {
      filtered = filtered.filter(job => job.location === location);
    }
    
    // Update filtered jobs and pagination
    setFilteredJobs(filtered);
    setTotalJobs(filtered.length);
    setCurrentPage(1); // Reset to first page when filters change
    
    // Update displayed jobs
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    setDisplayedJobs(filtered.slice(startIndex, endIndex));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    setDisplayedJobs(filteredJobs.slice(startIndex, endIndex));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterJobs(value, locationFilter);
  };

  const handleLocationChange = (value: string | null) => {
    setLocationFilter(value);
    filterJobs(searchTerm, value);
  };

  const clearFilters = () => {
     setSearchTerm('');
    setLocationFilter(null);
    setCurrentPage(1);
    setFilteredJobs(allJobPositions);
    setDisplayedJobs(allJobPositions.slice(0, PAGE_SIZE));
    setTotalJobs(allJobPositions.length);
  };

  const benefits = [
    {
      icon: <DollarOutlined style={{ fontSize: '24px' }} />,
      title: 'Competitive Salary',
      description: 'We offer market-competitive compensation packages'
    },
    {
      icon: <GlobalOutlined style={{ fontSize: '24px' }} />,
      title: 'Remote Work',
      description: 'Work from anywhere in the world'
    },
    {
      icon: <TeamOutlined style={{ fontSize: '24px' }} />,
      title: 'Great Team',
      description: 'Collaborate with talented and passionate colleagues'
    },
    {
      icon: <RocketOutlined style={{ fontSize: '24px' }} />,
      title: 'Career Growth',
      description: 'Opportunities for professional development and advancement'
    }
  ];

  return (
    <Layout className="career-layout">
      <Header className="career-header">
        <Title level={2} style={{ color: 'white', margin: 0 }}>
          Join Our Team
        </Title>
        <Paragraph style={{ color: 'white', marginBottom: 0 }}>
          Help us build the future of technology
        </Paragraph>
      </Header>

      <Content className="career-content">
        {/* Hero Section */}
        <section className="hero-section">
          <Title level={1}>Build Your Career With Us</Title>
          <Paragraph style={{ fontSize: '18px' }}>
            We're looking for talented individuals to join our growing team. 
            Explore our open positions and find where you fit in.
          </Paragraph>
          <Button type="primary" size="large" href="#open-positions">
            View Open Positions
          </Button>
        </section>

        {/* Why Join Us Section */}
        <section className="section-why-join">
          <Title level={2}>Why Join Our Team?</Title>
          <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
            {benefits.map((benefit, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <Card hoverable className="benefit-card">
                  <Space direction="vertical" align="center" style={{ textAlign: 'center' }}>
                    {benefit.icon}
                    <Title level={4} style={{ marginTop: '16px' }}>{benefit.title}</Title>
                    <Paragraph>{benefit.description}</Paragraph>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Open Positions Section */}
        <section id="open-positions" className="section-open-positions">
          <Title level={2}>Open Positions</Title>
          <Paragraph>
            Check out our current job openings. Don't see a perfect match? 
            We're always interested in meeting talented people - feel free to send us your resume.
          </Paragraph>

          {/* Search and Filter Section */}
          <div className="search-filters">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={12}>
                <Search
                  placeholder="Search by job title, department, or skills"
                  allowClear
                  enterButton={<Button type="primary"><SearchOutlined /> Search</Button>}
                  size="large"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  onSearch={handleSearch}
                  className="search-input"
                />
              </Col>
              <Col xs={24} md={8}>
                <Select
                  placeholder="Filter by location"
                  size="large"
                  style={{ width: '100%' }}
                  onChange={handleLocationChange}
                  value={locationFilter}
                  allowClear
                  suffixIcon={<EnvironmentOutlined />}
                >
                  {locations.map(location => (
                    <Option key={location} value={location}>{location}</Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} md={4}>
                <Button 
                  size="large" 
                  onClick={clearFilters}
                  disabled={!searchTerm && !locationFilter}
                  style={{ width: '100%' }}
                >
                  Clear Filters
                </Button>
              </Col>
            </Row>
          </div>

          <Divider />

          {filteredJobs.length === 0 ? (
          <Card>
            <Empty
              description={
                <span>
                  No jobs found matching your criteria
                </span>
              }
            >
              <Button type="primary" onClick={clearFilters}>
                Clear filters
              </Button>
            </Empty>
          </Card>
        ) : (
          <>
            <Row gutter={[16, 16]}>
              {displayedJobs.map((job) => (
                <Col span={24} key={job.id}>
                  <Card hoverable className="job-card">
                    <div className="job-card-header">
                      <Title level={4} style={{ margin: 0 }}>{job.title}</Title>
                      <Space>
                        <Tag color="blue">{job.department}</Tag>
                        <Tag color="green">{job.location}</Tag>
                        <Tag color="orange">{job.type}</Tag>
                      </Space>
                    </div>
                    
                    <Paragraph style={{ margin: '16px 0' }}>
                      {job.description}
                    </Paragraph>

                    <Title level={5}>Requirements:</Title>
                    <List
                      size="small"
                      dataSource={job.requirements}
                      renderItem={(item) => (
                        <List.Item>
                          <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                          {item}
                        </List.Item>
                      )}
                    />

                    <Button type="primary" style={{ marginTop: '16px' }}>
                      Apply Now
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>

            <div className="pagination-container">
              <Pagination
  current={currentPage}
  total={totalJobs}
  pageSize={PAGE_SIZE}
  onChange={handlePageChange}
  showSizeChanger={true} // Enable page size changer
  pageSizeOptions={['3', '5', '10']} // Custom page sizes
  showQuickJumper={true} // Enable quick jump to page
  showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total} positions`}
/>
            </div>
          </>
        )}
        </section>

        {/* Culture Section */}
        <section className="section-culture">
          <Title level={2}>Our Culture</Title>
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12}>
              <Paragraph>
                At our company, we believe in fostering a culture of innovation, collaboration, 
                and continuous learning. We value diversity and inclusion, and we're committed 
                to creating an environment where everyone can thrive.
              </Paragraph>
              <Paragraph>
                Our team members enjoy regular hackathons, knowledge-sharing sessions, 
                and opportunities to work on cutting-edge technologies. We celebrate 
                successes together and support each other through challenges.
              </Paragraph>
              <Button type="default" size="large">
                Learn More About Us
              </Button>
            </Col>
            <Col xs={24} md={12}>
              <div className="culture-image">
                <div style={{ 
                  background: '#f0f2f5', 
                  height: '300px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  borderRadius: '8px'
                }}>
                  <Text type="secondary">Our Team Photo</Text>
                </div>
              </div>
            </Col>
          </Row>
        </section>
      </Content>

      <Footer className="career-footer">
        <Paragraph>
          Have questions about our hiring process? <a href="mailto:careers@example.com">Contact our HR team</a>
        </Paragraph>
        <Paragraph>
          © {new Date().getFullYear()} Centram. All rights reserved.
        </Paragraph>
      </Footer>
    </Layout>
  );
};

export default CareerPage;