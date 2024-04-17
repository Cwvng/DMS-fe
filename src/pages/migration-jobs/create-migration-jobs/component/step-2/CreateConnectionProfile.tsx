import { Col, Form, Row } from 'antd';
import { FloatLabelSelect } from '../../../../../components/input/FloatLabelSelect.tsx';
import React from 'react';
import { FloatLabelInput } from '../../../../../components/input/FloatLabelInput.tsx';

export const CreateConnectionProfile: React.FC = () => {
  return (
    <div>
      <div>
        Connection profile represent the information required to connect to a data location. Choose
        a database engine and the details needed for that type of connection profile appear{' '}
        <a>Learn more</a>
      </div>

      <Form className="mt-5">
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
        <Form.Item>
          <FloatLabelInput label="Connection profile name" required />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item>
              <FloatLabelInput label="Hostname/IP address" required />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <FloatLabelInput label="Port" required />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <FloatLabelInput label="Username" required />
        </Form.Item>
        <Form.Item>
          <FloatLabelInput type="password" label="Password" required />
        </Form.Item>
      </Form>
    </div>
  );
};
