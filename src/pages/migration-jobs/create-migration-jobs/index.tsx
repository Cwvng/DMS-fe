import React from 'react';
import { Button, Form, Modal, Steps } from 'antd';
import { AppState, useDispatch, useSelector } from '../../../redux/store';
import { GetStarted } from './component/step-1/GetStarted.tsx';
import { DefineSource } from './component/step-2/DefineSource.tsx';
import { DefineDestination } from './component/step-3/DefineDestination.tsx';
import { TestAndCreate } from './component/step-4/TestAndCreate.tsx';
import { PageHeader } from '../../../components/page-header/PageHeader.tsx';
import { updateStep } from '../../../redux/slices/migration-jobs.slice.ts';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { CreateJobBody } from '../../../requests/types/job.interface.ts';
import { MigrationType } from '../../../constant';

export const CreateMigrationJobs: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: AppState) => state.migrationJob);
  const navigate = useNavigate();
  const [form] = useForm<CreateJobBody>();

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Create a migration jobs" />
      <div className="flex flex-1 flex-row">
        <div className="p-5 basis-1/3 border-r-1 border-border">
          <Steps
            direction="vertical"
            onChange={async (index) => {
              await form.validateFields();
              dispatch(updateStep(index));
            }}
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
        <Form
          form={form}
          initialValues={{
            name: '',
            job_type: MigrationType.ONE_TIME_MIGRATION,
            source_id: null,
            target_id: null
          }}
          className="p-5 basis-2/5">
          {state.step === 0 && <GetStarted form={form} />}
          {state.step === 1 && <DefineSource form={form} />}
          {state.step === 2 && <DefineDestination form={form} />}
          {state.step === 3 && <TestAndCreate form={form} />}
        </Form>
      </div>
    </div>
  );
};
