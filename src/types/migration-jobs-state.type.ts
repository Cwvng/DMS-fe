import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { JobResponse } from '../requests/types/job.interface.ts';

export interface MigrationJobState {
  step: number;
  projectId: number;
  jobList: JobResponse[] | null;
  loading: boolean;
}

export type MeetingCaseReducer<P = any> = CaseReducer<MigrationJobState, PayloadAction<P>>;

export type MeetingReducers = {
  [K: string]: MeetingCaseReducer;
} & {
  updateStep: MeetingCaseReducer<number>;
  selectProjectId: MeetingCaseReducer<number>;
};
