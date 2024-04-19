import React from 'react';
import { ProfileTable } from '../../../../../components/profile/ProfileTable.tsx';
import { migrationJob, tableInfo } from './utils.tsx';
import { Button, Modal } from 'antd';

export const TestAndCreate: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);
  return (
    <>
      <div className="text-lg font-bold ">Test and create your migration job</div>
      <div className="mt-3 font-medium">
        Review the details you entered for this migration job, and make sure to test it before
        creating. You can create this job without starting it, or start it immediately
      </div>
      <div className="mt-5">
        <ProfileTable profile={migrationJob} tableInfo={tableInfo} />
      </div>
      <div className="text-lg font-bold mt-5">Test the migration job</div>
      <div className="mt-3 font-medium">
        Test your job to make sure all prerequisites were fulfilled to ensure your source can
        connect to your destination
      </div>
      <Button className="mt-5">TEST JOB</Button>
      <div className="mt-5">
        <Button className="mr-2" type="primary">
          CREATE JOB
        </Button>
        <Button type="primary" onClick={() => setOpenModal(true)}>
          CREATE AND START JOB
        </Button>
      </div>
      <Modal
        title={<div className="font-semibold text-xl">Create & start migration job?</div>}
        visible={openModal}
        centered
        onCancel={() => setOpenModal(false)}
        onOk={() => setOpenModal(false)}
        okText="CREATE"
        cancelText="CANCEL"></Modal>
    </>
  );
};
