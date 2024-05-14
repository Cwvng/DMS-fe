import { Button, Col, Row, Steps } from 'antd';
import React, { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AppState, useSelector } from '../../../redux/store';
import { GetStarted } from './component/step-1/GetStarted.tsx';
import { DefineSource } from './component/step-2/DefineSource.tsx';
import { DefineDestination } from './component/step-3/DefineDestination.tsx';
import { TestAndCreate } from './component/step-4/TestAndCreate.tsx';
import { CreateJobBody } from '../../../requests/types/job.interface.ts';

export const CreateMigrationJobs: React.FC = () => {
  const navigate = useNavigate();
  const state = useSelector((state: AppState) => state.migrationJob);

  const [name, setName] = React.useState();
  const [srcId, setSrcId] = React.useState();
  const [tarId, setTarId] = React.useState();
  const [type, setType] = React.useState();
  const [data, setData] = React.useState<CreateJobBody>();

  useEffect(() => {
    setData({ name, source_id: srcId, job_type: type, target_id: tarId });
  }, [name, srcId, type, tarId]);

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
          <Steps
            direction="vertical"
            current={state.step}
            items={[
              { title: 'Get started' },
              {
                title: 'Define a source connection'
              },
              {
                title: 'Define a destination connection'
              },
              {
                title: 'Test and create migration job'
              }
            ]}
          />
          <div className="mt-3">
            <Button className="mr-3" type="primary">
              SAVE AND EXIT
            </Button>
            <Button>DISCARD DRAFT</Button>
          </div>
        </div>
        <div className="p-5 basis-2/5 ">
          {state.step === 0 && <GetStarted setType={setType} setName={setName} />}
          {state.step === 1 && <DefineSource setSrcId={setSrcId} />}
          {state.step === 2 && <DefineDestination setTarId={setTarId} />}
          {state.step === 3 && <TestAndCreate data={data} />}
        </div>
      </div>
    </div>
  );
};
