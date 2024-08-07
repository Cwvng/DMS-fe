export interface Connection {
  conn_id: string;
  project_id: string;
  name: string;
  host: string;
  port: string;
  username: string;
  password: string;
  engine: string;
  in_used_by: number;
}
export interface CreateConnectionBody {
  name: string;
  host: string;
  username: string;
  password: string;
  port?: string;
}
export type UpdateConnectionBody = Partial<Connection>;
