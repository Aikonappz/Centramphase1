import React, { useEffect } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router';

const FinalStep: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('stepper2Id');
        localStorage.removeItem('stepper3Id');
        localStorage.removeItem('stepper4Id');
    }, []);

    return (
        <Result
            icon={<SmileOutlined />}
            title="Great, Requisiton created successfully!"
            extra={<Button type="primary" onClick={() => { navigate('/job-grid') }} >Go to Job lists!</Button>}
        />
    )
};

export default FinalStep;