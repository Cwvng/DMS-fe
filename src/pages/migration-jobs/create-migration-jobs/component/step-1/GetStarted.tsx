import React from 'react';
import { FloatLabelInput } from '../../../../../components/input/FloatLabelInput.tsx';
import { Button, Card, Col, Form, FormInstance, Row } from 'antd';
import { FloatLabelSelect } from '../../../../../components/input/FloatLabelSelect.tsx';
import { MySQLInfo } from './MySQLInfo.tsx';
import { useDispatch } from '../../../../../redux/store';
import { updateStep } from '../../../../../redux/slices/migration-jobs.slice.ts';
import { SideModal } from '../../../../../components/side-modal/SideModal.tsx';
import { CreateJobBody } from '../../../../../requests/types/job.interface.ts';
import { MigrationType } from '../../../../../constant';

interface GetStartedProps {
  form: FormInstance<CreateJobBody>;
}
export const GetStarted: React.FC<GetStartedProps> = ({ form }) => {
  const [openModal, setOpenModal] = React.useState(false);

  const dispatch = useDispatch();
  return (
    <>
      <div className="text-lg font-bold mb-5 text-primary "> Describe your migration jobs</div>
      <Form form={form} className="flex flex-col gap-2">
        <Form.Item name="name" rules={[{ required: true }]}>
          <FloatLabelInput label="Migration job name" />
        </Form.Item>
        <Form.Item name="engine">
          <>
            <FloatLabelSelect
              label="Source database engine"
              defaultValue="MySQL"
              options={[{ value: 'MySQL', label: 'MySQL' }]}
            />
            <i className="p-2 text-xs font-medium">
              By default, destination database must have the same database engine as source database
            </i>
          </>
        </Form.Item>
        <Form.Item name="job_type" rules={[{ required: true }]}>
          <FloatLabelSelect
            label="Migration job type"
            defaultValue={form.getFieldValue('job_type')}
            options={[
              {
                value: MigrationType.ONE_TIME_MIGRATION,
                label: 'One time migration',
                title:
                  'Contain full dump & load existing data to destination database (only fulldump phase)'
              },
              {
                value: MigrationType.CONTINUOUS_MIGRATION,
                label: 'Continuous migration',
                title:
                  'Contain full dump & load existing data (fulldump phase) and capture incremental data to destination database (CDC phase)'
              }
            ]}
          />
        </Form.Item>
        <Card title="Before you continue, review the prerequisite" bordered className="shadow-lg">
          <Row>
            <Col span={20}>
              <div>MySQL source</div>
              <span className="text-sm font-medium">
                For this migration job to be able to pull data from MySQL, the database needs some
                specific configuration.
              </span>
            </Col>
            <Col span={4}>
              <Button onClick={() => setOpenModal(true)}>Open</Button>
            </Col>
          </Row>
        </Card>
        <Form.Item>
          <Button
            type="primary"
            onClick={async () => {
              await form.validateFields();
              dispatch(updateStep(1));
            }}
            className="mt-5">
            SAVE & CONTINUE
          </Button>
        </Form.Item>
      </Form>
      <SideModal
        title={<div className="font-semibold text-xl">MySQL source</div>}
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={null}>
        <MySQLInfo />
      </SideModal>
    </>
  );
};
