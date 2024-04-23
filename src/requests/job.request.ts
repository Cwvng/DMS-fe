import { JobResponse } from './types/job.interface.ts';
import { api } from '../utils/api.util.ts';

export const getAllJobs = async (projectId: number) => {
  const { data } = await api.get<JobResponse[]>(`/${projectId}/jobs/`);
  return data;
};
