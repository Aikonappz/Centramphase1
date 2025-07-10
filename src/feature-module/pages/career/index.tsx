// src/pages/CareerPage.tsx
import React from 'react';
import { Layout, Typography, Card, Row, Col, Button, Divider, List, Space, Tag } from 'antd';
import { 
  RocketOutlined, 
  TeamOutlined, 
  DollarOutlined, 
  GlobalOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import "../../../style/css/career.css";
const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

type JobPosition = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
};

const CareerPage: React.FC = () => {
  // Sample job data - in a real app, you would fetch this from an API
  const jobPositions: JobPosition[] = [
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
    }
  ];

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

          <Divider />

          <Row gutter={[16, 16]}>
            {jobPositions.map((job) => (
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
                {/* In a real app, replace with your actual image */}
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