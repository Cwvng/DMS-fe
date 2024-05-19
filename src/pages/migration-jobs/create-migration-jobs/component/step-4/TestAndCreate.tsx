import React, { useEffect } from 'react';
import { DataTable } from '../../../../../components/profile/DataTable.tsx';
import { Button, message, Modal, Skeleton } from 'antd';
import { IoIosWarning } from 'react-icons/io';
import { CreateJobBody } from '../../../../../requests/types/job.interface.ts';
import { createJob } from '../../../../../requests/job.request.ts';
import { AppState, useDispatch, useSelector } from '../../../../../redux/store';
import { useNavigate } from 'react-router-dom';
import { getConnectionDetail } from '../../../../../requests/connection.request.ts';
import { useMigrationJobContext } from '../../index.tsx';
import { Connection } from '../../../../../requests/types/connection.interface.ts';
import { updateStep } from '../../../../../redux/slices/migration-jobs.slice.ts';

export const TestAndCreate: React.FC = () => {
  const projectId = useSelector((app: AppState) => app.migrationJob.projectId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, type, srcId, tarId } = useMigrationJobContext();

  const [openModal, setOpenModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [connectionLoading, setConnectionLoading] = React.useState(false);
  const [data, setData] = React.useState<CreateJobBody>();
  const [srcDetail, setSrcDetail] = React.useState<Connection>();
  const [tarDetail, setTarDetail] = React.useState<Connection>();

  const createMigrationJob = async () => {
    try {
      setLoading(true);
      await createJob(projectId, data!);
      message.success('Created new migration job');
      dispatch(updateStep(0));
      navigate('/migration-jobs');
    } finally {
      setLoading(false);
    }
  };
  const getConnection = async () => {
    try {
      setConnectionLoading(true);
      if (tarId && srcId) {
        const srcRes = await getConnectionDetail(projectId, srcId);
        const tarRes = await getConnectionDetail(projectId, tarId);
        setSrcDetail(srcRes);
        setTarDetail(tarRes);
      }
    } finally {
      setConnectionLoading(false);
    }
  };

  useEffect(() => {
    setData({
      name,
      job_type: type,
      source_id: srcId,
      target_id: tarId
    });
  }, [name, type, srcId, tarId]);

  useEffect(() => {
    getConnection();
  }, []);

  return (
    <>
      <div className="text-lg font-bold ">Test and create your migration job</div>
      <div className="mt-3 font-medium">
        Review the details you entered for this migration job, and make sure to test it before
        creating. You can create this job without starting it, or start it immediately
      </div>
      <div className="mt-5">
        {data && data.name !== '' && (
          <>
            <>
              <h4 className="text-secondary">Migration job</h4>
              <DataTable
                data={data}
                tableInfo={[
                  { label: 'Migration job name', key: 'name' },
                  { label: 'Job type', key: 'job_type' }
                ]}
              />
            </>
            <Skeleton loading={connectionLoading} active />
            <Skeleton loading={connectionLoading} active />
            {srcDetail && (
              <>
                <h4 className="text-secondary">Source connection</h4>
                <DataTable
                  data={srcDetail}
                  tableInfo={[
                    { label: 'Source connection name', key: 'name' },
                    { label: 'Source connection engine', key: 'engine' },
                    { label: 'Hostname:Port', key: 'host port' }
                  ]}
                />
              </>
            )}
            {tarDetail && (
              <>
                <h4 className="text-secondary">Destination connection</h4>
                <DataTable
                  data={tarDetail}
                  tableInfo={[
                    { label: 'Destination connection name', key: 'name' },
                    { label: 'Destination connection engine', key: 'engine' },
                    { label: 'Hostname:Port', key: 'host port' }
                  ]}
                />
              </>
            )}
          </>
        )}
      </div>

      <div className="mt-5">
        <Button
          onClick={() => {
            navigate('/');
            dispatch(updateStep(0));
          }}
          className="mr-3">
          CANCEL
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
