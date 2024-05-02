export interface JobResponse {
  db_wildcard: string;
  enable_debug: boolean;
  job_id: string;
  job_type: string;
  log_file: string;
  log_pos: number;
  name: string;
  phase: string;
  project_id: string;
  source_id: string;
  status: string;
  target_id: string;
}
export interface JobDetailResponse {
  job_id: string;
  project_id: string;
  name: string;
  job_type: string;
  status: string;
  phase: string;
  enable_debug: boolean;
  log_file: string;
  log_post: string;
  source_id: string;
  target_id: string;
}
