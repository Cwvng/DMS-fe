import React from 'react';
import { Button, Col, Row } from 'antd';
export const MigrationJobs: React.FC = () => {
  return (
    <>
      <Row className="p-5 border-x-0 border-t-0 border-b border-gray-200 border-solid">
        <Col span={4}>
          <span className="text-xl font-medium">Migration jobs</span>
        </Col>
        <Col span={20}>
          <div className="flex gap-10 justify-start">
            <Button type="text" className="font-medium">
              CREATE MIGRATION JOB
            </Button>
            <Button>START</Button>
            <Button>STOP</Button>
            <Button>RESTART</Button>
            <Button>RESUME</Button>
            <Button>DELETE</Button>
          </div>
        </Col>
      </Row>
    </>
  );
};
