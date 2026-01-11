import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, InputNumber, Select, Switch, message, Row, Col, Card, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { getPositionById, getPositions, savePosition } from '../../../core/data/redux/actions/requisitionActions';
import { useAppDispatch } from '../../../core/data/redux/store';

const { Option } = Select;

const EditPosition = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchPosition = async () => {
            try {
                // Simulate API call
                const response: any = await dispatch(getPositionById(id));
                const data = response.data;
                console.log(response)
                if(response.status !== 200) {
                    message.error('Error fetching position');
                } else {
                   setTimeout(() => {
                    form.setFieldsValue({
                        ...data,
                        startDate: moment(data?.startDate),
                        endDate: data.endDate ? moment(data?.endDate) : null
                    });
                    setLoading(false);
                }, 500); 
                }
            } catch (error) {
                message.error('Failed to load position data');
                setLoading(false);
            }
        };

        fetchPosition();
    }, [id, form]);

    const onFinish = async (values: any) => {
        setSubmitting(true);
        try {
            // Format dates before submission
            const formattedValues = {
                ...values,
                startDate: values.startDate.format('YYYY-MM-DD'),
                endDate: values.endDate?.format('YYYY-MM-DD') || null
            };
            console.log('Updated values:', formattedValues);
            const response: any = await dispatch(savePosition(formattedValues));
            if (response.status === 200) {
                message.success('Position created successfully!');
                navigate('/positions');
            } else {
                console.log(response);
                message.error('Failed!');
            }
        } catch (error) {
            message.error('Failed to update position');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="page-wrapper">
            <div className="content">
                <div>
                    <Card
                        title="Edit Position"
                        bordered={false}
                        style={{ maxWidth: '1200px', margin: '0 auto' }}
                        headStyle={{ borderBottom: 'none' }}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
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
                                        name="jobCode"
                                        label="Job Code"
                                        rules={[{ required: true, message: 'Please input the job code!' }]}
                                    >
                                        <Input placeholder="e.g. 1234" />
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
                                        name="costCenter"
                                        label="Cost Center"
                                        rules={[{ required: true, message: 'Please input the cost center!' }]}
                                    >
                                        <Input placeholder="e.g. CC-TECH" />
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
                                        name="locationId"
                                        label="Location ID"
                                    >
                                        <InputNumber style={{ width: '100%' }} />
                                    </Form.Item>

                                    <Form.Item
                                        name="departmentId"
                                        label="Department ID"
                                    >
                                        <InputNumber style={{ width: '100%' }} />
                                    </Form.Item>

                                    <Form.Item
                                        name="organisationId"
                                        label="Organization ID"
                                    >
                                        <InputNumber style={{ width: '100%' }} />
                                    </Form.Item>

                                    <Form.Item
                                        name="divisionId"
                                        label="Division ID"
                                    >
                                        <InputNumber style={{ width: '100%' }} />
                                    </Form.Item>

                                    <Form.Item
                                        name="businessUnitId"
                                        label="Business Unit ID"
                                    >
                                        <InputNumber style={{ width: '100%' }} />
                                    </Form.Item>

                                    <Form.Item
                                        name="hiringManager"
                                        label="Hiring Manager"
                                    >
                                        <InputNumber style={{ width: '100%' }} />
                                    </Form.Item>

                                    <Form.Item
                                        name="headOfBusinessUnit"
                                        label="Head Of Business Unit"
                                    >
                                        <InputNumber style={{ width: '100%' }} />
                                    </Form.Item>

                                    <Form.Item
                                        name="headOfRecruitment"
                                        label="Head Of Recruitment"
                                    >
                                        <InputNumber style={{ width: '100%' }} />
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
                                    disabled={submitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={submitting}
                                >
                                    Update Position
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default EditPosition;