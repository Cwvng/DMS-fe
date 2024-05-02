import React, { useEffect } from 'react';
import { TaskResponse } from '../../../requests/types/task.interface.ts';
import { Loading } from '../../../components/loading/Loading.tsx';
import { useParams } from 'react-router-dom';
import { getTasksById } from '../../../requests/task.request.ts';
import { AppState, useSelector } from '../../../redux/store';

export const TaskDetail: React.FC = () => {
  const [task, setTask] = React.useState<TaskResponse>();
  const [loading, setLoading] = React.useState(false);

  const { id, taskId } = useParams();
  const projectId = useSelector((app: AppState) => app.migrationJob.projectId);

  const getTaskDetail = async () => {
    try {
      setLoading(true);
      if (taskId && id) {
        const res = await getTasksById(projectId, id, taskId);
        setTask(res);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTaskDetail();
  }, []);

  if (loading) return <Loading />;
  return <>{JSON.stringify(task)}</>;
};
