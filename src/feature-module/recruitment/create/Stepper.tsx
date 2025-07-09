import React, { useEffect, useState } from 'react';
import { Steps, Button, Card, Row, Col } from 'antd';

import CreateRequisition from './CreateRequisition';
import Step2 from './step2';
import Step3 from './step3';
import FinalStep from './finalStep';
import Step4 from './step4';

const { Step } = Steps;

// Step components

const Approver1 = () => (
  <div>
    <h2>Approver 1</h2>
    <p>Approver 1 content goes here.</p>
  </div>
);

const Approver2 = () => (
  <div>
    <h2>Approver 2</h2>
    <p>Approver 2 content goes here.</p>
  </div>
);

const Approver3 = () => (
  <div>
    <h2>Approver 3</h2>
    <p>Approver 3 content goes here.</p>
  </div>
);

const Approver4 = () => (
  <div>
    <h2>Approver 4</h2>
    <p>Approver 4 content goes here.</p>
  </div>
);

const Completed = () => (
  <div>
    <h2>Completed</h2>
    <p>The requisition process is now complete.</p>
  </div>
);

const StepperForm = (props: any) => {
  const { setCurrentStep } = props;
  const [current, setCurrent] = useState(() => {
    const saved = localStorage.getItem('currentStep');
    return saved !== null ? parseInt(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('currentStep', current.toString());
  }, [current]);


  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: 'Create Requisition',
      content: <CreateRequisition currentStep={current} setCurrent={setCurrent} prev={prev} />,
      nextButtonText: 'Move to Approver 1'
    },
    {
      title: 'Approver 1',
      content: <Step2 currentStep={current} setCurrent={setCurrent} prev={prev} />,
      nextButtonText: 'Move to Approver 2'
    },
    {
      title: 'Approver 2',
      content: <Step3 currentStep={current} setCurrent={setCurrent} prev={prev} />,
      nextButtonText: 'Move to Approver 3'
    },
    {
      title: 'Approver 3',
      content: <Step4 currentStep={current} setCurrent={setCurrent} prev={prev} />,
      nextButtonText: 'Move to Approver 4'
    },
    {
      title: 'Completed',
      content: <FinalStep />,
      nextButtonText: 'Finish'
    }
  ];

  const next = () => {
    setCurrent(current + 1);
  };
  

  const handleStepClick = (step: any) => {
    setCurrent(step);
  };

  return (
    <div>
      <Steps current={current} size="small">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <Card style={{ margin: '24px 0', minHeight: '300px' }}>
        {steps[current].content}
      </Card>

      {/* <Row justify="space-between">
        <Col>
          {current > 0 && (
            <Button
              style={{ margin: '0 8px' }}
              onClick={() => prev()}
              icon={<ArrowLeftOutlined />}
            >
              Previous
            </Button>
          )}

          <Button
            type="text"
            danger
            style={{ margin: '0 8px' }}
            icon={<CloseOutlined />}
          >
            Cancel
          </Button>
        </Col>

        <Col>
          <Button
            style={{ margin: '0 8px' }}
            icon={<SaveOutlined />}
          >
            Save
          </Button>

          {current < steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => next()}
              icon={<ArrowRightOutlined />}
            >
              {steps[current].nextButtonText}
            </Button>
          )}
        </Col>
      </Row> */}
    </div>
  );
};

export default StepperForm;