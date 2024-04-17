import { Button, Col, Row } from 'antd';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { CreateSteps } from './component/CreateSteps.tsx';
import { stepItems } from './component/utils.tsx';
import { AppState, useSelector } from '../../../redux/store';

export const CreateMigrationJobs: React.FC = () => {
  const navigate = useNavigate();
  const state = useSelector((state: AppState) => state.migrationJob);
  return (
    <div className="flex flex-col h-full">
      <Row className="px-5 py-2 border-b-1 border-solid border-border">
        <Col span={24}>
          <FaArrowLeft
            className="text-primary hover:cursor-pointer"
            onClick={() => navigate('/')}
          />
          <span className="text-xl font-bold"> Create a migration jobs</span>
        </Col>
      </Row>
      <div className="flex flex-1 flex-row">
        <div className="p-5 basis-1/3 border-r-1 border-border">
          <CreateSteps />
          <div className="mt-3">
            <Button className="mr-3" type="primary">
              SAVE AND EXIT
            </Button>
            <Button>DISCARD DRAFT</Button>
          </div>
        </div>
        <div className="p-5 basis-2/5 ">
          <div>{stepItems[state.step].content}</div>
        </div>
      </div>
    </div>
  );
};
