export interface SrcConnection {
  conn_id: string;
  project_id: string;
  name: string;
  host: string;
  port: string;
  username: string;
  password: string;
  engine: string;
}
export interface CreateSrcTargetConnectionBody {
  name: string;
  host: string;
  username: string;
  password: string;
}
export type UpdateConnectionBody = Partial<SrcConnection>;
