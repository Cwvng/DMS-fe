export enum JobAction {
  START = 'start',
  STOP = 'stop',
  RESTART = 'restart',
  RESUME = 'resume',
  DELETE = 'delete'
}

export enum JobStatus {
  NOT_STARTED = 'not started',
  STARTING = 'starting',
  RUNNING = 'running',
  STOPPED = 'stopped',
  STOPPING = 'stopping',
  FAILED = 'failed',
  COMPLETED = 'completed'
}
export enum Phase {
  FULL_DUMP = 'full dump',
  CDC = 'cdc',
  NONE = 'none'
}
export enum MigrationType {
  ONE_TIME_MIGRATION = 'one time migration',
  CONTINUOUS_MIGRATION = 'continuous migration'
}
