import { DataTable } from '../../../components/profile/DataTable.tsx';
import React from 'react';
import { ProfileItem } from '../../../components/profile/type.tsx';
import { JobDetailResponse } from '../../../requests/types/job.interface.ts';
interface GeneralInformationProps {
  job: JobDetailResponse | undefined;
}
export const GeneralInformation: React.FC<GeneralInformationProps> = ({ job }) => {
  const tableInfo: ProfileItem[] = [
    { label: 'Migration job name', key: 'job_id' },
    { label: 'Migration job type', key: 'project_id' },
    { label: 'Source connection profile', key: 'job_type' },
    { label: 'Database engine', key: 'status' },
    { label: 'Connection profile name', key: 'phase' },
    { label: 'Hostname:Port', key: 'enable_debug' },
    { label: 'Destination connection profile', key: 'log_file' },
    { label: 'Database engine', key: 'log_post' },
    { label: 'Connection profile name', key: 'source_id' },
    { label: 'Hostname:Port', key: 'target_id' }
  ];

  if (job)
    return (
      <div className="w-1/2">
        <DataTable data={job} tableInfo={tableInfo} />
      </div>
    );
};
