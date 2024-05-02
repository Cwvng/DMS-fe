export interface TaskResponse {
  task_id: string;
  job_id: string;
  startTime: string;
  total_migration_time: number | null;
  total_ddls: number | null;
  total_rows: number | null;
  status: string;
  task_mode: string;
}
