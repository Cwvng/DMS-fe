import { api } from '../utils/api.util.ts';
import { TaskResponse } from './types/task.interface.ts';

export const getTasksByJobId = async (projectId: number, id: string) => {
  const { data } = await api.get<TaskResponse[]>(`/${projectId}/jobs/${id}/tasks/`);
  return data;
};
export const getTasksById = async (projectId: number, id: string, taskId: string) => {
  const { data } = await api.get<TaskResponse>(`/${projectId}/jobs/${id}/tasks/${taskId}/`);
  return data;
};
