import React, { useEffect, useState } from 'react';
import { Col, message, Modal, Row, Tabs, TabsProps } from 'antd';
import { DMSButton } from '../../components/button/DMSButton.tsx';
import { FaPlay, FaPlusSquare, FaSquare, FaTrash } from 'react-icons/fa';
import { BsBootstrapReboot } from 'react-icons/bs';
import { GrResume } from 'react-icons/gr';
import { JobsTable } from './jobs-table';
import { useNavigate } from 'react-router-dom';
import { AppState, useDispatch, useSelector } from '../../redux/store';
import { getJobList } from '../../redux/slices/migration-jobs.slice.ts';
import { JobResponse } from '../../requests/types/job.interface.ts';
import { JobStatus, Phase } from '../../constant';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { actionJob, deleteJob } from '../../requests/job.request.ts';
import { VscDebugRestart } from 'react-icons/vsc';

export const MigrationJobs: React.FC = () => {
  const navigate = useNavigate();
  const projectId = useSelector((app: AppState) => app.migrationJob.projectId);
  const jobs = useSelector((app: AppState) =>
    (app.migrationJob.jobList || []).slice().sort((a, b) => a.name.localeCompare(b.name))
  );
  const dispatch = useDispatch();

  const [selectedRow, setSelectedRow] = React.useState<JobResponse[]>();
  const [loadingButton, setLoadingButton] = useState<string | null>(null);

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'JOBS',
      children: <JobsTable jobs={jobs} setSelectedRow={setSelectedRow} />
    }
  ];

  const deleteSelectedJobs = async () => {
    try {
      setLoadingButton('delete');
      if (selectedRow)
        selectedRow.map(async (item) => {
          await deleteJob(projectId, item.job_id);
          message.success('Deleted successfully');
          dispatch(getJobList(projectId));
        });
    } finally {
      setLoadingButton(null);
      setSelectedRow([]);
    }
  };

  const startJob = async () => {
    try {
      setLoadingButton('start');
      if (selectedRow?.[0].job_id) {
        const startJobBody = {
          status: 'not started',
          action: 'start'
        };
        await actionJob(projectId, selectedRow[0].job_id, startJobBody);
        message.success('Started a job');
        dispatch(getJobList(projectId));
      }
    } finally {
      setLoadingButton(null);
      setSelectedRow([]);
    }
  };

  const stopJob = async () => {
    try {
      setLoadingButton('stop');
      if (selectedRow?.[0].job_id) {
        const stopJobBody = {
          status: 'stopped'
        };
        await actionJob(projectId, selectedRow[0].job_id, stopJobBody);
        message.success('Stopped a job');
        dispatch(getJobList(projectId));
      }
    } finally {
      setLoadingButton(null);
      setSelectedRow([]);
    }
  };

  const resumeJob = async () => {
    try {
      setLoadingButton('resume');
      if (selectedRow?.[0].job_id) {
        const resumeJobBody = {
          status: 'stopped',
          phase: 'cdc',
          action: 'resume'
        };
        await actionJob(projectId, selectedRow[0].job_id, resumeJobBody);
        message.success('Resumed a job');
        dispatch(getJobList(projectId));
      }
    } finally {
      setLoadingButton(null);
      setSelectedRow([]);
    }
  };
  const restartJob = async () => {
    try {
      setLoadingButton('restart');
      if (selectedRow?.[0].job_id) {
        const resumeJobBody = {
          status: 'stopped',
          phase: 'full dump',
          action: 'restart'
        };
        await actionJob(projectId, selectedRow[0].job_id, resumeJobBody);
        message.success('Restarted a job');
        dispatch(getJobList(projectId));
      }
    } finally {
      setLoadingButton(null);
      setSelectedRow([]);
    }
  };

  useEffect(() => {
    dispatch(getJobList(projectId));
  }, [projectId]);

  return (
    <>
      <Row className="px-5 py-2 border-b-1 border-solid border-border">
        <Col span={4}>
          <span className="text-xl font-bold">Migration jobs</span>
        </Col>
        <Col span={20}>
          <div className="flex gap-2 justify-start">
            <DMSButton
              icon={<FaPlusSquare />}
              type="text"
              title="CREATE MIGRATION JOB"
              onClick={() => navigate('/migration-jobs/create')}>
              CREATE MIGRATION JOB
            </DMSButton>
            <DMSButton
              disabled={
                !selectedRow ||
                selectedRow.length !== 1 ||
                !(
                  selectedRow[0]?.status === JobStatus.NOT_STARTED &&
                  (selectedRow[0]?.source_id || selectedRow[0]?.target_id)
                )
              }
              icon={<FaPlay />}
              onClick={() => startJob()}
              type="text"
              loading={loadingButton === 'start'}
              title="START">
              START
            </DMSButton>
            <DMSButton
              disabled={
                !selectedRow ||
                selectedRow.length !== 1 ||
                !(
                  (selectedRow[0]?.status === JobStatus.RUNNING &&
                    selectedRow[0]?.phase === Phase.FULL_DUMP) ||
                  (selectedRow[0]?.status === JobStatus.RUNNING &&
                    selectedRow[0]?.phase === Phase.CDC)
                )
              }
              icon={<FaSquare />}
              type="text"
              loading={loadingButton === 'stop'}
              onClick={() => stopJob()}
              title="STOP">
              STOP
            </DMSButton>
            <DMSButton
              disabled={
                !selectedRow ||
                selectedRow.length !== 1 ||
                !(
                  (selectedRow[0]?.status === JobStatus.STOPPED &&
                    selectedRow[0]?.phase === Phase.CDC) ||
                  (selectedRow[0]?.status === JobStatus.FAILED &&
                    selectedRow[0]?.phase === Phase.CDC)
                )
              }
              icon={<BsBootstrapReboot />}
              onClick={() => resumeJob()}
              type="text"
              loading={loadingButton === 'resume'}
              title="RESUME">
              RESUME
            </DMSButton>
            <DMSButton
              disabled={
                !selectedRow ||
                selectedRow.length !== 1 ||
                !(
                  (selectedRow[0]?.status === JobStatus.STOPPED &&
                    selectedRow[0]?.phase === Phase.FULL_DUMP) ||
                  (selectedRow[0]?.status === JobStatus.FAILED &&
                    selectedRow[0]?.phase === Phase.FULL_DUMP)
                )
              }
              icon={<GrResume />}
              type="text"
              loading={loadingButton === 'restart'}
              onClick={() => restartJob()}
              title="RESTART">
              RESTART
            </DMSButton>
            <DMSButton
              disabled={
                !selectedRow ||
                selectedRow.length === 0 ||
                selectedRow[0]?.status === JobStatus.STOPPING
              }
              loading={loadingButton === 'delete'}
              icon={<FaTrash />}
              onClick={() => {
                Modal.confirm({
                  centered: true,
                  title: 'Do you want to delete these items?',
                  icon: <ExclamationCircleFilled />,
                  onOk() {
                    deleteSelectedJobs();
                  },
                  okText: 'Yes',
                  cancelText: 'No',
                  okButtonProps: { className: 'bg-primary' },
                  cancelButtonProps: { className: 'border-primary text-primary' }
                });
              }}
              type="text"
              title="DELETE">
              DELETE
            </DMSButton>
          </div>
        </Col>
      </Row>
      <Row className="p-5">
        <div className="font-normal">
          Migration jobs allow you to move data from source to destination databases automatically
        </div>
      </Row>
      <div className="px-5 relative">
        <VscDebugRestart
          className="absolute top-5 right-10 z-50 text-primary text-xl hover:cursor-pointer"
          title="Refresh"
          onClick={() => {
            dispatch(getJobList(projectId));
          }}
        />
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </>
  );
};
