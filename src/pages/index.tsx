import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../layout/app/AppLayout.tsx';
import { MigrationJobs } from './migration-jobs/MigrationJobs.tsx';
import { ConnectionProfiles } from './connection-profiles';
import { PrivateConnectivity } from './private-connectivity/PrivateConnectivity.tsx';
import { ConversionWorkspaces } from './conversion-workspaces/ConversionWorkspaces.tsx';
import { Error404 } from '../components/errors/Error404.tsx';
import { Error403 } from '../components/errors/Error403.tsx';
import { CreateMigrationJobs } from './migration-jobs/create-migration-jobs';
import { JobDetail } from './job-detail';
import { TaskDetail } from './job-detail/component/TaskDetail.tsx';
import { ConnectionDetails } from './connection-profiles/ConnectionDetails.tsx';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      error pages
      <Route path="/*" element={<Error404 />} />
      <Route path="/403" element={<Error403 />} />
      {/* auth routes */}
      {/*<Route*/}
      {/*    element={*/}
      {/*        <AuthLayout>*/}
      {/*            <Outlet />*/}
      {/*        </AuthLayout>*/}
      {/*    }*/}
      {/*>*/}
      {/*    <Route path="/login" element={<Login />} />*/}
      {/*    <Route path="/signup" element={<Signup />} />*/}
      {/*</Route>*/}
      {/* authenticated routes */}
      <Route
        element={
          <AppLayout>
            <Outlet />
          </AppLayout>
        }>
        <Route path="/" element={<Navigate to="/migration-jobs" replace={true} />} />

        <Route path="/migration-jobs" element={<MigrationJobs />} />
        <Route path="/migration-jobs/:id" element={<JobDetail />} />
        <Route path="/migration-jobs/:id/tasks/:taskId" element={<TaskDetail />} />
        <Route path="/migration-jobs/create" element={<CreateMigrationJobs />} />

        <Route path="/connection-profiles" element={<ConnectionProfiles />} />
        <Route path="/connection-profiles/:id" element={<ConnectionDetails />} />

        <Route path="/private-connectivity" element={<PrivateConnectivity />} />
        <Route path="/conversion-workspaces" element={<ConversionWorkspaces />} />
      </Route>
    </Routes>
  );
};
