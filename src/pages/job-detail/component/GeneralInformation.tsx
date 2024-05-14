import { DataTable } from '../../../components/profile/DataTable.tsx';
import React, { useEffect } from 'react';
import { JobDetailResponse } from '../../../requests/types/job.interface.ts';
import { useParams } from 'react-router-dom';
import { AppState, useSelector } from '../../../redux/store';
import { getJobById } from '../../../requests/job.request.ts';
import { Loading } from '../../../components/loading/Loading.tsx';

export const GeneralInformation: React.FC = () => {
  const { id } = useParams();
  const projectId = useSelector((app: AppState) => app.migrationJob.projectId);

  const [jobDetail, setJobDetail] = React.useState<JobDetailResponse>();
  const [loading, setLoading] = React.useState(false);

  const getJobDetailById = async () => {
    try {
      if (id) {
        setLoading(true);
        const res = await getJobById(projectId, id);
        setJobDetail(res);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getJobDetailById();
  }, []);

  if (loading) return <Loading />;
  if (jobDetail)
    return (
      <div className="w-1/2 flex flex-col gap-3">
        <div>
          <DataTable
            data={jobDetail}
            tableInfo={[
              { label: 'Migration job name', key: 'name' },
              { label: 'Migration job type', key: 'job_type' }
            ]}
          />
        </div>
        <div>
          <h4 className="text-secondary">Source connection profile</h4>
          <DataTable
            data={jobDetail}
            tableInfo={[
              { label: 'Database engine', key: 'log_post' },
              { label: 'Connection profile name', key: 'target_id' },
              { label: 'Hostname:Port', key: 'target_id' }
            ]}
          />
        </div>
        <div>
          <h4 className="text-secondary">Destination connection profile</h4>
          <DataTable
            data={jobDetail}
            tableInfo={[
              { label: 'Database engine', key: 'log_post' },
              { label: 'Connection profile name', key: 'target_id' },
              { label: 'Hostname:Port', key: 'target_id' }
            ]}
          />
        </div>
      </div>
    );
};
