import React from 'react';
import { FloatLabelInput } from '../../../../../components/input/FloatLabelInput.tsx';
import { Button, Card, Col, Form, Modal, Row } from 'antd';
import { FloatLabelSelect } from '../../../../../components/input/FloatLabelSelect.tsx';
import { MySQLInfo } from './MySQLInfo.tsx';
import { useDispatch } from '../../../../../redux/store';
import { updateStep } from '../../../../../redux/slices/migration-jobs.slice.ts';

export const GetStarted: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <div className="text-lg font-bold mb-5 "> Describe your migration jobs</div>
      <Form>
        <Form.Item>
          <FloatLabelInput label="Migration job name" name="email" />
        </Form.Item>
        <Form.Item>
          <FloatLabelSelect
            label="Source database engine"
            defaultValue="MySQL"
            options={[
              { value: 'MySQL', label: 'MySQL' },
              { value: 'MariaDb', label: 'MariaDb' }
            ]}
          />
          <i className="p-2 text-xs font-medium">
            By default, destination database must have the same database engine as source database
          </i>
        </Form.Item>
        <Form.Item>
          <FloatLabelSelect
            label="Migration job type"
            defaultValue="Continuous"
            options={[
              { value: 'One time', label: 'One time' },
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
          <Button
            type="primary"
            htmlType="submit"
            className="mt-5"
            onClick={() => dispatch(updateStep(1))}>
            SAVE & CONTINUE
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title={<div className="font-semibold text-xl">MySQL source</div>}
        className="w-2/5  m-0 float-right top-0 h-10 "
        visible={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={
          <Button type="primary" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        }>
        <MySQLInfo />
      </Modal>
    </>
  );
};
