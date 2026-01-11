import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Button, 
  Row, 
  Col, 
  Space,
  Tag,
  Divider
} from 'antd';
import { 
  FilterOutlined, 
  CloseOutlined,
  CheckOutlined,
  SyncOutlined
} from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface PositionFiltersProps {
  onFilter: (values: any) => void;
  onReset?: () => void;
}

const PositionFilters: React.FC<PositionFiltersProps> = ({ onFilter, onReset }) => {
  const [form] = Form.useForm();
  const [tags, setTags] = useState<string[]>([]);

  const statusOptions = [
    { value: 'ACTIVE', label: 'Active' },
    { value: 'INACTIVE', label: 'Inactive' },
    { value: 'DRAFT', label: 'Draft' },
  ];

  const departmentOptions = [
    { value: 101, label: 'Engineering' },
    { value: 102, label: 'Product' },
    { value: 103, label: 'Marketing' },
    { value: 104, label: 'HR' },
  ];

  const locationOptions = [
    { value: 12345, label: 'San Francisco' },
    { value: 12346, label: 'New York' },
    { value: 12347, label: 'Remote' },
  ];

  const handleSubmit = (values: any) => {
    const activeFilters = Object.entries(values)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .map(([key]) => key);
    
    setTags(activeFilters);
    onFilter(values);
  };

  const handleReset = () => {
    form.resetFields();
    setTags([]);
    if (onReset) onReset();
  };

  const removeTag = (tag: string) => {
    form.setFieldsValue({ [tag]: undefined });
    setTags(tags.filter(t => t !== tag));
  };

  return (
    <div className="position-filters">
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="name" label="Position Name">
              <Input placeholder="Search by name" />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="code" label="Position Code">
              <Input placeholder="Search by code" />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="status" label="Status">
              <Select 
                placeholder="Select status" 
                // mode="tags"
                allowClear
              >
                {statusOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="department" label="Department">
              <Select 
                placeholder="Select department" 
                // mode="tags"
                allowClear
              >
                {departmentOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="location" label="Location">
              <Select 
                placeholder="Select location" 
                // mode="tags"
                allowClear
              >
                {locationOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="payGrade" label="Pay Grade">
              <Input placeholder="Enter pay grade" />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="dateRange" label="Date Range">
              <RangePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="toBeHired" label="Hiring Status">
              <Select placeholder="Select hiring status" allowClear>
                <Option value={true}>To Be Hired</Option>
                <Option value={false}>Filled</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Active filters tags */}
        {tags.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <Divider orientation="left" plain>
              Active Filters
            </Divider>
            <Space size={[8, 8]} wrap>
              {tags.map(tag => (
                <Tag
                  key={tag}
                  closable
                  onClose={() => removeTag(tag)}
                  icon={<SyncOutlined spin />}
                >
                  {tag.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Tag>
              ))}
            </Space>
          </div>
        )}

        <div style={{ textAlign: 'right' }}>
          <Space>
            <Button 
              type="default" 
              icon={<CloseOutlined />} 
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button 
              type="primary" 
              icon={<CheckOutlined />} 
              htmlType="submit"
            >
              Apply Filters
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default PositionFilters;