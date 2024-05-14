import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MeetingReducers, MigrationJobState } from '../../types/migration-jobs-state.type.ts';
import { getAllJobs } from '../../requests/job.request.ts';
const initialState: MigrationJobState = {
  step: 0,
  projectId: 123,
  jobList: null
};
export const migrationJobsSlice = createSlice<MigrationJobState, MeetingReducers>({
  name: 'MigrationJobs',
  initialState,
  reducers: {
    updateStep: (state, action) => {
      state.step = action.payload;
    },
    selectProjectId: (state, action) => {
      state.projectId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJobList.pending, () => {})
      .addCase(getJobList.fulfilled, (state, action) => {
        state.jobList = action.payload;
      })
      .addCase(getJobList.rejected, () => {});
  }
});
export const getJobList = createAsyncThunk('/jobs', async (projectId: number) => {
  return await getAllJobs(projectId);
});
export const { updateStep, selectProjectId } = migrationJobsSlice.actions;

export const migrationJobsReducer = migrationJobsSlice.reducer;
