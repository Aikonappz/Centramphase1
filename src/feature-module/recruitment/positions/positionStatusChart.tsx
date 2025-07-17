import React from 'react';
import { Card, Row, Col, Divider } from 'antd';
// import { Pie, Bar } from '@ant-design/charts';
import { 
  TeamOutlined,
  DollarOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

interface PositionStatusChartProps {
  data: Array<{
    id: number;
    name: string;
    status: number;
    toBeHired: boolean;
    department: any;
    payGrad: string;
   
      code: any,
      startDate: any,
      jobCode: any,
      fte: any,
      locationId: any,
      costCenter: any,
      endDate: any,
      standardHour: any,
      minPay: any,
      midPay: any,
      maxPay: any,
      departmentId: any,
      organisationId: any,
      divisionId: any,
      businessUnitId: any
  }>;
}

const PositionStatusChart: React.FC<PositionStatusChartProps> = ({ data }) => {
  // Prepare data for charts
  const statusData = [
    { type: 'Active', value: data.filter(p => p.status === 1).length },
    { type: 'Inactive', value: data.filter(p => p.status === 0).length },
    { type: 'Draft', value: data.filter(p => p.status === 2).length },
  ];

  const hiringData = [
    { type: 'To Be Hired', value: data.filter(p => p.toBeHired).length },
    { type: 'Filled', value: data.filter(p => !p.toBeHired).length },
  ];

  const departmentCount = data.reduce((acc: Record<string, number>, position) => {
    const deptName = position.department?.name || 'Unknown';
    acc[deptName] = (acc[deptName] || 0) + 1;
    return acc;
  }, {});

  const departmentData = Object.entries(departmentCount).map(([type, value]) => ({
    type,
    value
  }));

  const payGradeCount = data.reduce((acc: Record<string, number>, position) => {
    const grade = position.payGrad || 'Unknown';
    acc[grade] = (acc[grade] || 0) + 1;
    return acc;
  }, {});

  const payGradeData = Object.entries(payGradeCount).map(([type, value]) => ({
    type,
    value
  }));

  const pieConfig = {
    appendPadding: 10,
    data: statusData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'inner',
      offset: '-30%',
      content: '{value}',
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
    color: ['#52c41a', '#f5222d', '#faad14'],
    legend: {
      position: 'bottom',
    },
  };

  const barConfig = {
    data: departmentData.sort((a, b) => b.value - a.value),
    xField: 'value',
    yField: 'type',
    seriesField: 'type',
    legend: {
      position: 'bottom',
    },
    height: 300,
  };

  return (
    <div className="position-status-chart">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card title="Position Status Distribution">
            {/* <Pie {...pieConfig} /> */}
          </Card>
        </Col>
        
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card title="Positions by Department">
            {/* <Bar {...barConfig} /> */}
          </Card>
        </Col>
        
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card title="Hiring Status">
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <Row gutter={16}>
                <Col span={12}>
                  <div style={{ fontSize: 48, color: '#1890ff' }}>
                    <TeamOutlined />
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 'bold' }}>
                    {data.filter(p => p.toBeHired).length}
                  </div>
                  <div style={{ color: 'rgba(0,0,0,0.45)' }}>Open Positions</div>
                </Col>
                <Col span={12}>
                  <div style={{ fontSize: 48, color: '#52c41a' }}>
                    <CheckCircleOutlined />
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 'bold' }}>
                    {data.filter(p => !p.toBeHired).length}
                  </div>
                  <div style={{ color: 'rgba(0,0,0,0.45)' }}>Filled Positions</div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card title="Pay Grade Distribution">
            <div style={{ padding: '16px 0' }}>
              <Row gutter={[8, 16]}>
                {payGradeData
                  .sort((a, b) => a.type.localeCompare(b.type))
                  .map(item => (
                    <Col key={item.type} xs={12} sm={12} md={8} lg={8} xl={6}>
                      <Card 
                        size="small" 
                        hoverable
                        style={{ textAlign: 'center' }}
                      >
                        <div style={{ 
                          fontSize: 20,
                          color: '#1890ff',
                          marginBottom: 8
                        }}>
                          <DollarOutlined />
                        </div>
                        <div style={{ 
                          fontSize: 18,
                          fontWeight: 'bold',
                          marginBottom: 4
                        }}>
                          {item.value}
                        </div>
                        <div style={{ color: 'rgba(0,0,0,0.45)' }}>
                          {item.type}
                        </div>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PositionStatusChart;