import { Row, Col, Card, Skeleton } from 'antd';
import React from 'react';

const CardGridSkeleton = ({ count = 4 }) => {
  return (
    <Row gutter={[16, 16]}>
      {Array.from({ length: count }).map((_, index) => (
        <Col key={index} xs={24} sm={12} md={8} lg={6}>
          <Card
            cover={
              <div style={{ width: '100%', height: 100 }}>
                <Skeleton.Image active style={{ marginTop: 16, marginLeft: 16, width: '100%', height: '100%' }} />
              </div>
            }
            actions={[
              <Skeleton.Button active size="small" />,
              <Skeleton.Button active size="small" />,
            ]}
          >
            <Skeleton active paragraph={{ rows: 2 }} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CardGridSkeleton;