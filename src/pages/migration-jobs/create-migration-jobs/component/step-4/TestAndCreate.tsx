import React from 'react';
import { ProfileTable } from '../../../../../components/profile/ProfileTable.tsx';
import { migrationJob, tableInfo } from './utils.tsx';
import { Button, Modal } from 'antd';
import { IoIosWarning } from 'react-icons/io';

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
