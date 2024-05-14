import React from 'react';
import { DataTable } from '../../../../../components/profile/DataTable.tsx';
import { Button, message, Modal, Spin } from 'antd';
import { IoIosWarning } from 'react-icons/io';
import { CreateJobBody } from '../../../../../requests/types/job.interface.ts';
import { createJob } from '../../../../../requests/job.request.ts';
import { AppState, useSelector } from '../../../../../redux/store';
import { useNavigate } from 'react-router-dom';
import { getConnectionDetail, testConnection } from '../../../../../requests/connection.request.ts';
import { LoadingOutlined } from '@ant-design/icons';

interface TestAndCreateProps {
  data: CreateJobBody | undefined;
}
export const TestAndCreate: React.FC<TestAndCreateProps> = ({ data }) => {
  const projectId = useSelector((app: AppState) => app.migrationJob.projectId);
  const navigate = useNavigate();

  const [openModal, setOpenModal] = React.useState(false);
  const [openTest, setOpenTest] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [srcLoading, setSrcLoading] = React.useState(false);
  const [tarLoading, setTarLoading] = React.useState(false);

  const createMigrationJob = async () => {
    try {
      setLoading(true);
      if (data) await createJob(projectId, data);
      message.success('Created new migration job');
      navigate('/migration-jobs');
    } finally {
      setLoading(false);
    }
  };
  const testMigrationJob = async () => {
    try {
      if (data?.source_id && data.target_id) {
        setSrcLoading(true);
        setTarLoading(true);
        setOpenTest(true);
        const srdDetail = await getConnectionDetail(projectId, data.source_id);
        const targetDetail = await getConnectionDetail(projectId, data.target_id);
        const srcRes = await testConnection(projectId, data?.source_id, srdDetail);
        const targetRes = await testConnection(projectId, data?.source_id, targetDetail);
        message.success('Target ' + srcRes.message);
        message.success('Destination ' + targetRes.message);
      }
    } finally {
      setSrcLoading(false);
      setTarLoading(false);
      setOpenTest(false);
    }
  };
  return (
    <>
      <div className="text-lg font-bold ">Test and create your migration job</div>
      <div className="mt-3 font-medium">
        Review the details you entered for this migration job, and make sure to test it before
        creating. You can create this job without starting it, or start it immediately
      </div>
      <div className="mt-5">
        {data && (
          <DataTable
            data={data}
            tableInfo={[
              { label: 'Migration job name', key: 'name' },
              { label: 'Source database engine', key: 'source_id' },
              { label: 'Destination database engine', key: 'destination' },
              { label: 'Type', key: 'type' },
              { label: 'Connection profile name', key: 'connectionName' },
              { label: 'Destination connection profile name', key: 'target_id' },
              { label: 'Hostname:Port', key: 'hostname' }
            ]}
          />
        )}
      </div>
      <div className="text-lg font-bold mt-5">Test the migration job</div>
      <div className="mt-3 font-medium">
        Test your job to make sure all prerequisites were fulfilled to ensure your source can
        connect to your destination
      </div>
      {openTest && (
        <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-3 p-5">
          <div className="flex gap-5 items-center">
            <Spin
              spinning={srcLoading}
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
            {srcLoading ? <>Connecting to source connection profile ...</> : <></>}
          </div>
          <div className="mt-2 flex gap-5 items-center">
            <Spin
              spinning={tarLoading}
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
            {tarLoading ? <>Connecting to destination connection profile ...</> : <></>}
          </div>
        </div>
      )}
      <div className="mt-5">
        <Button className="mr-5" onClick={() => testMigrationJob()}>
          TEST JOB
        </Button>
        <Button loading={loading} onClick={createMigrationJob} className="mr-2" type="primary">
          CREATE JOB
        </Button>
        {/*<Button type="primary" onClick={() => setOpenModal(true)}>*/}
        {/*  CREATE AND START JOB*/}
        {/*</Button>*/}
      </div>
      <Modal
        title={<div className="font-semibold text-xl">Create & start migration job?</div>}
        open={openModal}
        centered
        onCancel={() => setOpenModal(false)}
        onOk={() => setOpenModal(false)}
        okText="CREATE & START"
        cancelText="CANCEL">
        <div>
          <div className="bg-hoverBg my-3 p-3 flex items-center gap-3">
            <div>
              <IoIosWarning className="text-xl text-primary" />
            </div>
            <div>
              The source and migration job configuration test returned with warnings. This means
              after the job is started, it may fail
            </div>
          </div>
          Starting the migration job will begin the full dump process on the source. Note: This will
          briefly lock your database as DMS reads from the source. Are you sure you want to start
          the job?
        </div>
      </Modal>
    </>
  );
};
