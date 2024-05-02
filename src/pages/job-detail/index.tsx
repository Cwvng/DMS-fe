import { Tabs, TabsProps } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { JobDetailResponse } from '../../requests/types/job.interface.ts';
import { getJobById } from '../../requests/job.request.ts';
import { AppState, useSelector } from '../../redux/store';
import { GeneralInformation } from './component/GeneralInformation.tsx';
import { Loading } from '../../components/loading/Loading.tsx';
import { TaskResponse } from '../../requests/types/task.interface.ts';
import { getTasksByJobId } from '../../requests/task.request.ts';
import { Tasks } from './component/Tasks.tsx';

export const JobDetail: React.FC = () => {
  const { id } = useParams();
  const projectId = useSelector((app: AppState) => app.migrationJob.projectId);

  const [jobDetail, setJobDetail] = React.useState<JobDetailResponse>();
  const [tasks, setTasks] = React.useState<TaskResponse[]>();
  const [loading, setLoading] = React.useState(false);

  const getJobDetailById = async () => {
    try {
      if (id) {
        setLoading(true);
        const res = await getJobById(projectId, id);
        setJobDetail(res);
      }
    } finally {
      setLoading(false);
    }
  };
  const getTasksByJob = async () => {
    try {
      if (id) {
        setLoading(true);
        const res = await getTasksByJobId(projectId, id);
        setTasks(res);
      }
    } finally {
      setLoading(false);
    }
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'General Information',
      children: <GeneralInformation job={jobDetail} />
    },
    {
      key: '2',
      label: 'Tasks',
      children: <Tasks tasks={tasks} />
    }
  ];

  useEffect(() => {
    getJobDetailById();
    getTasksByJob();
  }, []);
  if (loading) return <Loading />;
  return (
    <div className="px-5">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};
