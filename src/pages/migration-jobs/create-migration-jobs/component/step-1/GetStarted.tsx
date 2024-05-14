import React from 'react';
import { FloatLabelInput } from '../../../../../components/input/FloatLabelInput.tsx';
import { Button, Card, Col, Form, FormProps, Row } from 'antd';
import { FloatLabelSelect } from '../../../../../components/input/FloatLabelSelect.tsx';
import { MySQLInfo } from './MySQLInfo.tsx';
import { useDispatch } from '../../../../../redux/store';
import { updateStep } from '../../../../../redux/slices/migration-jobs.slice.ts';
import { SideModal } from '../../../../../components/side-modal/SideModal.tsx';
import { useForm } from 'antd/es/form/Form';

interface GetStartedProps {
  setType: any;
  setName: any;
}
export const GetStarted: React.FC<GetStartedProps> = ({ setType, setName }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const dispatch = useDispatch();

  const [form] = useForm();
  const saveForm: FormProps['onFinish'] = (values) => {
    setType(values.type);
    setName(values.name);
    dispatch(updateStep(1));
  };

  return (
    <>
      <div className="text-lg font-bold mb-5 "> Describe your migration jobs</div>
      <Form form={form} onFinish={saveForm}>
        <Form.Item name="name">
          <FloatLabelInput label="Migration job name" name="email" />
        </Form.Item>
        <Form.Item initialValue="MySQL">
          <FloatLabelSelect
            label="Source database engine"
            options={[{ value: 'MySQL', label: 'MySQL' }]}
          />
          <i className="p-2 text-xs font-medium">
            By default, destination database must have the same database engine as source database
          </i>
        </Form.Item>
        <Form.Item name="type">
          <FloatLabelSelect
            label="Migration job type"
            options={[
              { value: 'One-time', label: 'One-time' },
              { value: 'Continuous', label: 'Continuous' }
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
          <Button type="primary" htmlType="submit" className="mt-5">
            SAVE & CONTINUE
          </Button>
        </Form.Item>
      </Form>
      <SideModal
        title={<div className="font-semibold text-xl">MySQL source</div>}
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={
          <Button type="primary" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        }>
        <MySQLInfo />
      </SideModal>
    </>
  );
};
