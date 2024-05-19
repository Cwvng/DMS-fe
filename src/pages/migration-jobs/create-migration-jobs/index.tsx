import React, { createContext, useContext, useState, useEffect } from 'react';
import { Button, Modal, Steps } from 'antd';
import { AppState, useDispatch, useSelector } from '../../../redux/store';
import { GetStarted } from './component/step-1/GetStarted.tsx';
import { DefineSource } from './component/step-2/DefineSource.tsx';
import { DefineDestination } from './component/step-3/DefineDestination.tsx';
import { TestAndCreate } from './component/step-4/TestAndCreate.tsx';
import { CreateJobBody } from '../../../requests/types/job.interface.ts';
import { PageHeader } from '../../../components/page-header/PageHeader.tsx';
import { updateStep } from '../../../redux/slices/migration-jobs.slice.ts';
import { getConnectionByProjectId } from '../../../requests/connection.request.ts';
import { Connection } from '../../../requests/types/connection.interface.ts';
import { Loading } from '../../../components/loading/Loading.tsx';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleFilled } from '@ant-design/icons';
interface MigrationJobContextProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  srcId: string;
  setSrcId: React.Dispatch<React.SetStateAction<string>>;
  tarId: string;
  setTarId: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  data?: CreateJobBody;
  connectionList: Connection[];
}
// Create a context
const MigrationJobContext = createContext<MigrationJobContextProps>({
  name: '',
  setName: () => null,
  srcId: '',
  setSrcId: () => null,
  tarId: '',
  setTarId: () => null,
  type: 'One-time',
  setType: () => null,
  connectionList: []
});

// Create a custom hook to use the context
const useMigrationJobContext = () => useContext(MigrationJobContext);

export const CreateMigrationJobs: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: AppState) => state.migrationJob);
  const navigate = useNavigate();
  const projectId = useSelector((state) => state.migrationJob.projectId);

  const [name, setName] = useState<string>('');
  const [srcId, setSrcId] = useState<string>('');
  const [tarId, setTarId] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [connectionList, setConnectionList] = useState<Connection[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getConnectionList = async () => {
    try {
      setLoading(true);
      const res = await getConnectionByProjectId(projectId);
      setConnectionList(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConnectionList();
  }, []);

  if (loading) return <Loading />;

  return (
    <MigrationJobContext.Provider
      value={{
        name,
        setName,
        srcId,
        setSrcId,
        tarId,
        setTarId,
        type,
        setType,
        connectionList
      }}>
      <div className="flex flex-col h-full">
        <PageHeader title="Create a migration jobs" />
        <div className="flex flex-1 flex-row">
          <div className="p-5 basis-1/3 border-r-1 border-border">
            <Steps
              direction="vertical"
              onChange={(index) => dispatch(updateStep(index))}
              current={state.step}
              items={[
                { title: 'Get started' },
                { title: 'Define a source connection' },
                { title: 'Define a destination connection' },
                { title: 'Test and create migration job' }
              ]}
            />
            <div className="mt-3">
              <Button onClick={() => navigate('/')} className="mr-3" type="primary">
                SAVE AND EXIT
              </Button>
              <Button
                onClick={() => {
                  Modal.confirm({
                    centered: true,
                    title: "All form data won't be save, are you sure to discard draft?",
                    icon: <ExclamationCircleFilled />,
                    onOk() {
                      dispatch(updateStep(0));
                      navigate('/');
                    },
                    okButtonProps: { className: 'bg-primary' },
                    okText: 'Yes',
                    cancelText: 'No'
                  });
                }}>
                DISCARD DRAFT
              </Button>
            </div>
          </div>
          <div className="p-5 basis-2/5">
            {state.step === 0 && <GetStarted />}
            {state.step === 1 && <DefineSource />}
            {state.step === 2 && <DefineDestination />}
            {state.step === 3 && <TestAndCreate />}
          </div>
        </div>
      </div>
    </MigrationJobContext.Provider>
  );
};

export { useMigrationJobContext };
