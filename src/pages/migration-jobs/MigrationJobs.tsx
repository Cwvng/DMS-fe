import React, { useEffect } from 'react';
import { Col, Row, Tabs, TabsProps } from 'antd';
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

export const MigrationJobs: React.FC = () => {
  const navigate = useNavigate();
  const projectId = useSelector((app: AppState) => app.migrationJob.projectId);
  const jobs = useSelector((app: AppState) => app.migrationJob.jobList || []);
  const [selectedRow, setSelectedRow] = React.useState<JobResponse[]>();

  const dispatch = useDispatch();

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
              onClick={() => navigate('/migration-jobs/create')}
            />
            <DMSButton
              disabled={
                !selectedRow ||
                selectedRow.length !== 1 ||
                selectedRow[0]?.status !== JobStatus.NOT_STARTED
              }
              icon={<FaPlay />}
              type="text"
              title="START"
            />
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
              title="STOP"
            />
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
              type="text"
              title="RESUME"
            />
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
              title="RESTART"
            />
            <DMSButton
              disabled={
                !selectedRow ||
                selectedRow.length === 0 ||
                selectedRow[0]?.status === JobStatus.STOPPING
              }
              icon={<FaTrash />}
              type="text"
              title="DELETE"
            />
          </div>
        </Col>
      </Row>
      <Row className="p-5">
        <div className="font-normal">
          Migration jobs allow you to move data from source to destination databases
        </div>
      </Row>
      <div className="px-5">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </>
  );
};
