import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector
} from 'react-redux';
import { userReducer } from '../slices/user.slice.ts';
import { migrationJobsReducer } from '../slices/migration-jobs.slice.ts';

export const store = configureStore({
  reducer: {
    user: userReducer,
    migrationJob: migrationJobsReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

const rootReducer = combineReducers({
  user: userReducer,
  migrationJob: migrationJobsReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const { dispatch } = store;
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;

export default store;
