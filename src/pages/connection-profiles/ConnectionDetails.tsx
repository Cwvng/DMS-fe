import { PageHeader } from '../../components/page-header/PageHeader.tsx';
import React, { useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { DMSButton } from '../../components/button/DMSButton.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteConnection, getConnectionDetail } from '../../requests/connection.request.ts';
import { AppState, useSelector } from '../../redux/store';
import { Connection } from '../../requests/types/connection.interface.ts';
import { Loading } from '../../components/loading/Loading.tsx';
import { Col, Divider, message, Modal, Row } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

export const ConnectionDetails: React.FC = () => {
  const { id } = useParams();
  const projectId = useSelector((app: AppState) => app.migrationJob.projectId);
  const navigate = useNavigate();

  const [connection, setConnection] = React.useState<Connection>();
  const [loading, setLoading] = React.useState(false);

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

  useEffect(() => {
    getConnection();
  }, []);
  if (loading) return <Loading />;
  return (
    <>
      <PageHeader
        title="Connection profile detail"
        button={
          <>
            <DMSButton
              disabled={connection?.in_used_by === '0'}
              icon={<FaEdit />}
              type="text"
              title="EDIT"
            />
            <DMSButton
              icon={<FaTrash />}
              type="text"
              title="DELETE"
              onClick={() => confirmDelete()}
            />
          </>
        }
      />
      <div className="w-1/2 p-5">
        <Row className="flex justify-between my-1">
          <Col>Connection profile name</Col>
          <Col>
            <span className="font-medium">{connection?.name}</span>
          </Col>
        </Row>
        <Divider className="m-0" />
        <Row className="flex justify-between my-1">
          <Col>Connection profile id</Col>
          <Col>
            <span className="font-medium">{connection?.conn_id}</span>
          </Col>
        </Row>
        <Divider className="m-0" />
        <Row className="flex justify-between my-1">
          <Col>Database engine</Col>
          <Col>
            <span className="font-medium">{connection?.engine}</span>
          </Col>
        </Row>
        <Divider className="m-0" />
        <Row className="flex justify-between my-1">
          <Col>Host name or IP address</Col>
          <Col>
            <span className="font-medium">{connection?.host}</span>
          </Col>
        </Row>
        <Divider className="m-0" />
        <Row className="flex justify-between my-1">
          <Col>Port</Col>
          <Col>
            <span className="font-medium">{connection?.port}</span>
          </Col>
        </Row>
        <Divider className="m-0" />
        <Row className="flex justify-between my-1">
          <Col>Username</Col>
          <Col>
            <span className="font-medium">{connection?.username}</span>
          </Col>
        </Row>
      </div>

      <h4 className="p-5">
        In used by <span className="text-primary">{connection?.in_used_by}</span> migration jobs
      </h4>
      {/*TODO: Table go here*/}
    </>
  );
};
