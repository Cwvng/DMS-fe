import React, { useEffect } from 'react';
import { Col, Row, Tabs, TabsProps } from 'antd';
import { DMSButton } from '../../components/button/DMSButton.tsx';
import { FaPlay, FaPlusSquare, FaSquare, FaTrash } from 'react-icons/fa';
import { BsBootstrapReboot } from 'react-icons/bs';
import { GrResume } from 'react-icons/gr';
import { JobsTable } from './jobs-table';
import { useNavigate } from 'react-router-dom';
import { getAllJobs } from '../../requests/job.request.ts';
import { Loading } from '../../components/loading/Loading.tsx';
import { JobResponse } from '../../requests/types/job.interface.ts';
import { AppState, useSelector } from '../../redux/store';

export const MigrationJobs: React.FC = () => {
  const navigate = useNavigate();
  const projectId = useSelector((app: AppState) => app.migrationJob.projectId);

  const [loading, setLoading] = React.useState(false);
  const [jobs, setJobs] = React.useState<JobResponse[]>([]);
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'JOBS',
      children: <JobsTable jobs={jobs} />
    }
  ];
  const getAllMigrationJobs = async () => {
    try {
      setLoading(true);
      const res = await getAllJobs(projectId);
      setJobs(res);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllMigrationJobs();
  }, [projectId]);
  if (loading) return <Loading />;
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
            <DMSButton disabled icon={<FaPlay />} type="text" title="START" />
            <DMSButton disabled icon={<FaSquare />} type="text" title="STOP" />
            <DMSButton disabled icon={<BsBootstrapReboot />} type="text" title="RESTART" />
            <DMSButton disabled icon={<GrResume />} type="text" title="RESUME" />
            <DMSButton disabled icon={<FaTrash />} type="text" title="DELETE" />
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
