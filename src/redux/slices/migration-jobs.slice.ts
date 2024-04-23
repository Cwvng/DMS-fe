import { createSlice } from '@reduxjs/toolkit';
import { MeetingReducers, MigrationJobState } from '../../types/migration-jobs-state.type.ts';
const initialState: MigrationJobState = {
  step: 0,
  projectId: 0
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
  }
});

export const { updateStep, selectProjectId } = migrationJobsSlice.actions;

export const migrationJobsReducer = migrationJobsSlice.reducer;
