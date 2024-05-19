import { api } from '../utils/api.util.ts';
import {
  CreateConnectionBody,
  Connection,
  UpdateConnectionBody
} from './types/connection.interface.ts';

export const getConnectionByProjectId = async (projectId: number) => {
  const { data } = await api.get<Connection[]>(`/${projectId}/conns/`);
  return data;
};
export const createConnection = async (projectId: number, body: CreateConnectionBody) => {
  const { data } = await api.post<Connection[]>(`/${projectId}/conns/`, body);
  return data;
};

export const deleteConnection = async (projectId: number, connId: string) => {
  const { data } = await api.delete(`/${projectId}/conns/${connId}/`);
  return data;
};

export const updateConnection = async (
  projectId: number,
  connId: string,
  body: UpdateConnectionBody
) => {
  const { data } = await api.patch(`/${projectId}/conns/${connId}/`, body);
  return data;
};

export const getConnectionDetail = async (projectId: number, connId: string) => {
  const { data } = await api.get<Connection>(`/${projectId}/conns/${connId}/`);
  return data;
};
export const testConnection = async (projectId: number, connId: string, body: Connection) => {
  const { data } = await api.put(`/${projectId}/conns/${connId}/test-connection/`, body);
  return data;
};
