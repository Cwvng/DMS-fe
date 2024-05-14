import { Col, Form, FormProps, message, Row } from 'antd';
import { FloatLabelSelect } from '../input/FloatLabelSelect.tsx';
import React from 'react';
import { FloatLabelInput } from '../input/FloatLabelInput.tsx';
import { AppState, useSelector } from '../../redux/store';
import { createSrcTargetConnection } from '../../requests/connection.request.ts';
import { useForm } from 'antd/es/form/Form';
import { CreateSrcTargetConnectionBody } from '../../requests/types/connection.interface.ts';

interface CreateConnectionProfileProps {
  closeModal: () => void;
}
export const CreateConnectionProfile: React.FC<CreateConnectionProfileProps> = ({ closeModal }) => {
  const projectId = useSelector((app: AppState) => app.migrationJob.projectId);
  const [form] = useForm();
  const createTargetOrSrcConnection: FormProps<CreateSrcTargetConnectionBody>['onFinish'] = async (
    values
  ) => {
    try {
      const body = {
        name: values.name.trim(),
        host: values.host.trim(),
        username: values.username.trim(),
        password: values.password.trim()
      };

      await createSrcTargetConnection(projectId, body);
      message.success('Created new connections');
      closeModal();
    } finally {
    }
  };
  return (
    <div>
      <div>
        Connection profile represent the information required to connect to a data location. Choose
        a database engine and the details needed for that type of connection profile appear{' '}
        <a>Learn more</a>
      </div>

      <Form id="myForm" form={form} onFinish={createTargetOrSrcConnection} className="mt-5">
        <Form.Item>
          <FloatLabelSelect
            label="Database engine"
            defaultValue="MySQL"
            options={[
              { value: 'MySQL', label: 'MySQL' },
              { value: 'MariaDb', label: 'MariaDb' }
            ]}
          />
        </Form.Item>
        <Form.Item name="name">
          <FloatLabelInput label="Connection profile name" required />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="host">
              <FloatLabelInput label="Hostname/IP address" required />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="port">
              <FloatLabelInput label="Port" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="username">
          <FloatLabelInput label="Username" required />
        </Form.Item>
        <Form.Item name="password">
          <FloatLabelInput type="password" label="Password" required />
        </Form.Item>
      </Form>
    </div>
  );
};
