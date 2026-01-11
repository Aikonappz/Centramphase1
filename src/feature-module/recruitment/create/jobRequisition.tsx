import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, message } from 'antd';
import StepperForm from './Stepper';

interface RequisitionData {
  id: string;
  title: string;
  description: string;
  status: string;
  // Add other fields as needed
}

const RequisitionPage: React.FC = () => {
  const { id, positionId } = useParams<{ id: string, positionId: string }>();
  const navigate = useNavigate();
  const [requisition, setRequisition] = useState<RequisitionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [title, setTitle] = useState('Create Requisition Via Position');
  
  // Fetch requisition data when component mounts or ID changes
  useEffect(() => {
    const fetchRequisition = async () => {
      try {
        setLoading(true);

        // Simulate API call
        // In a real app, you would replace this with an actual API call
        const mockRequisition: RequisitionData = {
          id: id || 'new',
          title: `Requisition ${id || 'New'}`,
          description: `Description for requisition ${id || 'new'}`,
          status: 'draft',
        };

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        setRequisition(mockRequisition);
        setIsEditing(!!id); // If we have an ID, we're in edit mode
      } catch (error) {
        message.error('Failed to load requisition');
        console.error('Error fetching requisition:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequisition();
  }, [id]);

  const handleSave = () => {
    // In a real app, this would call your API to save the requisition
    message.success(`Requisition ${isEditing ? 'updated' : 'created'} successfully`);
    navigate('/requisitions'); // Navigate back to list view after save
  };

  const handleCancel = () => {
    navigate('/requisitions');
  };

  switch (currentStep) {
    case 1:
      setTitle('Approver 1');
      localStorage.setItem('currentStep', '1');
      break;
    case 2:
      setTitle('Approver 2');
      localStorage.setItem('currentStep', '2');
      break;
    case 3:
      setTitle('Approver 3');
      localStorage.setItem('currentStep', '3');
      break;
    case 4:
      setTitle('Approver 4');
      localStorage.setItem('currentStep', '4');
      break;
    case 5:
      setTitle('Completed');
      localStorage.setItem('currentStep', '5');
      break;

    default:
      break;
  }

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* Breadcrumb */}
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div className="my-auto mb-2">
            <h2 className="mb-1">{isEditing ? `Edit Requisition #${id} - ${title}` : `${title}`}</h2>
          </div>
        </div>
        {<StepperForm setCurrentStep={setCurrentStep} />}
      </div>
    </div>
  );
};

export default RequisitionPage;