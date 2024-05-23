import { PageHeader } from '../../components/page-header/PageHeader.tsx';
import React, { useEffect } from 'react';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import { DMSButton } from '../../components/button/DMSButton.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deleteConnection,
  getConnectionDetail,
  updateConnection
} from '../../requests/connection.request.ts';
import { AppState, useSelector } from '../../redux/store';
import { Connection } from '../../requests/types/connection.interface.ts';
import { Loading } from '../../components/loading/Loading.tsx';
import { Col, Divider, Form, FormProps, Input, message, Modal, Row } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { FaX } from 'react-icons/fa6';

export const ConnectionDetails: React.FC = () => {
  const { id } = useParams();
  const projectId = useSelector((app: AppState) => app.migrationJob.projectId);
  const navigate = useNavigate();
  const [form] = useForm();

  const [connection, setConnection] = React.useState<Connection>();
  const [loading, setLoading] = React.useState(false);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const getConnection = async () => {
    try {
      setLoading(true);
      if (id) {
        const res = await getConnectionDetail(projectId, id);
        setConnection(res);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteSelectedConn = async () => {
    try {
      if (connection) {
        await deleteConnection(projectId, connection.conn_id);
        message.success('Deleted successfully');
        navigate(-1);
      }
    } finally {
    }
  };

  const confirmDelete = () => {
    Modal.confirm({
      centered: true,
      title: 'Do you want to delete these items?',
      icon: <ExclamationCircleFilled />,
      onOk() {
        deleteSelectedConn();
      },
      okText: 'Yes',
      cancelText: 'No',
      okButtonProps: { className: 'bg-primary' },
      cancelButtonProps: { className: 'border-primary text-primary' }
    });
  };

  const updateConnectionProfile: FormProps['onFinish'] = async (values) => {
    try {
      setIsUpdate(true);
      if (connection?.conn_id) {
        await updateConnection(projectId, connection.conn_id, values);
        message.success('Updated successfully');
        await getConnection();
      }
    } finally {
      setIsUpdate(false);
      setEdit(false);
    }
  };

  useEffect(() => {
    getConnection();
  }, []);
  if (loading) return <Loading />;
  if (!connection) return;
  return (
    <>
      <PageHeader
        title="Connection profile detail"
        button={
          <>
            {edit ? (
              <>
                <DMSButton icon={<FaX />} onClick={() => setEdit(false)} type="text" title="CANCEL">
                  CANCEL
                </DMSButton>
                <DMSButton
                  disabled={connection?.in_used_by === 1}
                  icon={<FaCheck />}
                  onClick={form.submit}
                  type="text"
                  loading={isUpdate}
                  title={
                    connection?.in_used_by === 1
                      ? 'You cannot action while this connection in used'
                      : 'SAVE'
                  }>
                  SAVE
                </DMSButton>
              </>
            ) : (
              <DMSButton
                disabled={connection?.in_used_by === 1}
                icon={<FaEdit />}
                onClick={() => setEdit(true)}
                type="text"
                title={
                  connection?.in_used_by === 1
                    ? 'You cannot action while this connection in used'
                    : 'EDIT'
                }>
                EDIT
              </DMSButton>
            )}

            <DMSButton
              disabled={connection?.in_used_by === 1}
              icon={<FaTrash />}
              type="text"
              title={
                connection?.in_used_by === 1
                  ? 'You cannot action while this connection in used'
                  : 'DELETE'
              }
              onClick={() => confirmDelete()}>
              DELETE
            </DMSButton>
          </>
        }
      />
      <Form
        form={form}
        initialValues={{
          name: connection?.name,
          host: connection?.host,
          engine: connection?.engine,
          port: connection?.port,
          username: connection?.username,
          password: connection?.password
        }}
        onFinish={updateConnectionProfile}
        className="w-1/2 p-5">
        <Row className="flex justify-between my-1">
          <Col>Connection profile id</Col>
          <Col>
            <span className="font-medium">{connection?.conn_id}</span>
          </Col>
        </Row>
        <Divider className="m-0" />
        <Row className="flex justify-between items-center my-1">
          <Col>Connection profile name</Col>
          <Col>
            {edit ? (
              <Form.Item className="m-0" name="name">
                <Input />
              </Form.Item>
            ) : (
              <span className="font-medium">{connection?.name}</span>
            )}
          </Col>
        </Row>
        <Divider className="m-0" />
        <Row className="flex justify-between my-1">
          <Col>Database engine</Col>
          <Col>
            {edit ? (
              <Form.Item className="m-0" name="engine">
                <Input />
              </Form.Item>
            ) : (
              <span className="font-medium">{connection?.engine}</span>
            )}
          </Col>
        </Row>
        <Divider className="m-0" />
        <Row className="flex justify-between items-center my-1">
          <Col>Host name or IP address</Col>
          <Col>
            {edit ? (
              <Form.Item className="m-0" name="host">
                <Input />
              </Form.Item>
            ) : (
              <span className="font-medium">{connection?.host}</span>
            )}
          </Col>
        </Row>
        <Divider className="m-0" />
        <Row className="flex justify-between my-1">
          <Col>Port</Col>
          <Col>
            {edit ? (
              <Form.Item className="m-0" name="port">
                <Input />
              </Form.Item>
            ) : (
              <span className="font-medium">{connection?.port}</span>
            )}
          </Col>
        </Row>
        <Divider className="m-0" />
        <Row className="flex justify-between my-1">
          <Col>Username</Col>
          <Col>
            {edit ? (
              <Form.Item className="m-0" name="username">
                <Input />
              </Form.Item>
            ) : (
              <span className="font-medium">{connection?.username}</span>
            )}
          </Col>
        </Row>
        <Row className="flex justify-between my-1">
          <Col>Password</Col>
          <Col>
            {edit ? (
              <Form.Item className="m-0" name="password">
                <Input.Password
                  className="w-[182px]"
                  visibilityToggle={{
                    visible: passwordVisible,
                    onVisibleChange: setPasswordVisible
                  }}
                />
              </Form.Item>
            ) : (
              <span className="font-medium">{connection?.password.replace(/./g, '•')}</span>
            )}
          </Col>
        </Row>
      </Form>

      <h4 className="p-5">
        In used by <span className="text-primary">{connection?.in_used_by}</span> migration jobs
      </h4>
      {/*TODO: Table go here*/}
    </>
  );
};
