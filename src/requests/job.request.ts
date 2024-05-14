import {
  CreateJobBody,
  JobDetailResponse,
  JobResponse,
  UpdateJobBody
} from './types/job.interface.ts';
import { api } from '../utils/api.util.ts';

export const getAllJobs = async (projectId: number) => {
  const { data } = await api.get<JobResponse[]>(`/${projectId}/jobs/`);
  return data;
};
export const getJobById = async (projectId: number, id: string) => {
  const { data } = await api.get<JobDetailResponse>(`/${projectId}/jobs/${id}/`);
  return data;
};
export const createJob = async (projectId: number, body: CreateJobBody) => {
  const { data } = await api.post<JobResponse>(`/${projectId}/jobs/`, body);
  return data;
};
export const deleteJob = async (projectId: number, id: string) => {
  const { data } = await api.delete(`/${projectId}/jobs/${id}/`);
  return data;
};
export const updateJob = async (projectId: number, id: string, body: UpdateJobBody) => {
  const { data } = await api.patch<JobResponse>(`/${projectId}/jobs/${id}/`, body);
  return data;
};
