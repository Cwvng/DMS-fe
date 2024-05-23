import { Col, Form, FormProps, message, Row } from 'antd';
import { FloatLabelSelect } from '../input/FloatLabelSelect.tsx';
import React from 'react';
import { FloatLabelInput } from '../input/FloatLabelInput.tsx';
import { AppState, useSelector } from '../../redux/store';
import { createConnection, updateConnection } from '../../requests/connection.request.ts';
import { useForm } from 'antd/es/form/Form';
import { CreateConnectionBody, Connection } from '../../requests/types/connection.interface.ts';

interface ConnectionProfileFormProps {
  closeModal: () => void;
  initialValue?: Connection;
  id: string;
}
export const ConnectionProfileForm: React.FC<ConnectionProfileFormProps> = ({
  closeModal,
  initialValue,
  id
}) => {
  const projectId = useSelector((app: AppState) => app.migrationJob.projectId);
  const [form] = useForm();
  const createNewConnection: FormProps<CreateConnectionBody>['onFinish'] = async (values) => {
    try {
      const body = {
        name: values.name.trim(),
        host: values.host.trim(),
        username: values.username.trim(),
        password: values.password.trim()
      };

      await createConnection(projectId, body);
      message.success('Created new connections');
    } finally {
      closeModal();
    }
  };

  const updateSelectedConnection: FormProps<CreateConnectionBody>['onFinish'] = async (values) => {
    try {
      if (initialValue?.conn_id) {
        await updateConnection(projectId, initialValue.conn_id, values);
        message.success('Updated successfully');
      }
    } finally {
      closeModal();
    }
  };
  return (
    <div>
      <div>
        Connection profile represent the information required to connect to a data location. Choose
        a database engine and the details needed for that type of connection profile appear{' '}
      </div>

      <Form
        initialValues={{
          name: initialValue?.name,
          host: initialValue?.host,
          port: initialValue?.port || '3306',
          username: initialValue?.username,
          password: initialValue?.password
        }}
        id={id}
        form={form}
        onFinish={initialValue ? updateSelectedConnection : createNewConnection}
        className="mt-5">
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
            <Form.Item
              name="host"
              rules={[
                {
                  required: true,
                  message: 'Host value is invalid',
                  pattern: new RegExp(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/)
                }
              ]}>
              <FloatLabelInput label="Hostname/IP address" required />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="port"
              rules={[
                {
                  required: true,
                  message: 'Port require number value',
                  pattern: new RegExp(/^[0-9]+$/)
                }
              ]}>
              <FloatLabelInput label="Port" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="username" className="mt-1.5">
          <FloatLabelInput label="Username" required />
        </Form.Item>
        <Form.Item name="password">
          <FloatLabelInput type="password" label="Password" required />
        </Form.Item>
      </Form>
    </div>
  );
};
