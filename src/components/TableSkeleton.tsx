import { Table, Skeleton, Space, Row, Col } from 'antd';
import React from 'react';

const EnhancedTableSkeleton = ({ columns = 5, rows = 5, showHeader = true }) => {
  const skeletonColumns = Array.from({ length: columns }).map((_, i) => ({
    key: i,
    render: () => (
      <Skeleton 
        active 
        paragraph={false} 
        title={{ width: '100%' }} 
      />
    ),
  }));

  const skeletonData = Array.from({ length: rows }).map((_, i) => ({
    key: i,
  }));

  return (
    <div>
      {showHeader && (
        <Row justify="space-between" align="middle" style={{ marginTop: 16, marginLeft: 16, marginBottom: 16 }}>
          <Col>
            <Skeleton.Input active size="large" style={{ width: 200 }} />
          </Col>
          <Col>
            <Space>
              <Skeleton.Button active size="default" />
              <Skeleton.Button active size="default" />
            </Space>
          </Col>
        </Row>
      )}
      
      <Table
        columns={skeletonColumns}
        dataSource={skeletonData}
        pagination={false}
      />
      
      <div style={{ marginTop: 16, textAlign: 'right', marginRight: 16, marginBottom: 16 }}>
        <Skeleton.Button active size="small" />
        <Skeleton.Button active size="small" style={{ marginLeft: 8 }} />
      </div>
    </div>
  );
};

export default EnhancedTableSkeleton;