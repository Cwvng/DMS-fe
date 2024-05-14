import React, { useEffect } from 'react';
import { Button, Col, Dropdown, Input, Menu, message, Modal, Row, Spin, Table } from 'antd';
import { DMSButton } from '../../components/button/DMSButton.tsx';
import { FaCheck, FaEllipsisV, FaPlusSquare } from 'react-icons/fa';
import { CreateConnectionProfile } from '../../components/profile/CreateConnectionProfile.tsx';
import { SideModal } from '../../components/side-modal/SideModal.tsx';
import { SrcConnection } from '../../requests/types/connection.interface.ts';
import { AppState, useSelector } from '../../redux/store';
import {
  deleteConnection,
  getConnectionByProjectId,
  testConnection,
  updateConnection
} from '../../requests/connection.request.ts';
import { ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const ConnectionProfiles: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [connectLoading, setConnectLoading] = React.useState(false);
  const [connectionList, setConnectionList] = React.useState<SrcConnection[]>();
  const [selectedConn, setSelectedConn] = React.useState<SrcConnection | null>();
  const [selectedTestConn, setSelectedTestConn] = React.useState<SrcConnection | null>();
  const [selectedName, setSelectedName] = React.useState<string | undefined>();

  const projectId = useSelector((app: AppState) => app.migrationJob.projectId);

  const getAllConnectionList = async () => {
    try {
      const res = await getConnectionByProjectId(projectId);
      setConnectionList(res);
    } finally {
    }
  };

  const deleteSelectedConn = async (connId: string) => {
    try {
      await deleteConnection(projectId, connId);
      message.success('Deleted successfully');
      await getAllConnectionList();
    } finally {
    }
  };

  const updateSelectedConn = async (connId: string) => {
    try {
      setLoading(true);
      await updateConnection(projectId, connId, { name: selectedName });
      message.success('Updated successfully');
      await getAllConnectionList();
    } finally {
      setSelectedConn(null);
      setLoading(false);
    }
  };

  const confirmDelete = (connId: string) => {
    Modal.confirm({
      centered: true,
      title: 'Do you want to delete these items?',
      icon: <ExclamationCircleFilled />,
      onOk() {
        deleteSelectedConn(connId);
      },
      okText: 'Yes',
      cancelText: 'No',
      okButtonProps: { className: 'bg-primary' },
      cancelButtonProps: { className: 'border-primary text-primary' }
    });
  };
  const testSelectedConnection = async (data: SrcConnection) => {
    try {
      setConnectLoading(true);
      const res = await testConnection(projectId, data.conn_id, data);
      message.success(res.message);
    } finally {
      setConnectLoading(false);
    }
  };

  const renderDropdownMenu = (conn: SrcConnection) => (
    <Menu
      items={[
        {
          label: <span>Test connection</span>,
          key: 'connection',
          onClick: () => {
            setSelectedTestConn(conn);
            testSelectedConnection(conn);
          }
        },
        {
          label: <span>Edit</span>,
          key: 'edit',
          onClick: () => {
            setSelectedConn(conn);
            setSelectedName(conn.name);
          }
        },
        {
          label: <span>Delete</span>,
          key: 'delete',
          onClick: () => confirmDelete(conn.conn_id)
        }
      ]}
    />
  );

  useEffect(() => {
    getAllConnectionList();
  }, []);
  useEffect(() => {
    getAllConnectionList();
  }, [openModal]);

  return (
    <>
      <Row className="px-5 py-2 border-b-1 border-solid border-border">
        <Col span={4}>
          <span className="text-xl font-bold">Connection profiles</span>
        </Col>
        <Col span={20}>
          <div className="flex gap-2 justify-start">
            <DMSButton
              icon={<FaPlusSquare />}
              type="text"
              title="CREATE PROFILE"
              onClick={() => setOpenModal(true)}
            />
          </div>
        </Col>
      </Row>
      <Row className="p-5">
        <div className="font-normal">
          Connection profiles represent all the info you need to connect to data source.{' '}
          <span>
            <a>Learn more</a>
          </span>
        </div>
      </Row>
      <div className="px-5">
        <Table
          rowSelection={{ type: 'checkbox' }}
          className="w-full"
          columns={[
            {
              title: 'Display name',
              dataIndex: 'name',
              key: 'name',
              filterSearch: true,
              onFilter: (value, record) => record.name.startsWith(value as string),
              render: (text: string, record) => {
                return record.conn_id === selectedConn?.conn_id ? (
                  <Input
                    value={selectedName}
                    onChange={(e) => setSelectedName(e.target.value)}
                    onBlur={() => setSelectedConn(null)}
                    suffix={
                      loading ? (
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                      ) : (
                        <FaCheck
                          className="cursor-pointer text-primary"
                          onClick={() => updateSelectedConn(record.conn_id)}
                        />
                      )
                    }
                  />
                ) : (
                  <Link to={`/connection-profiles/${record.conn_id}`}>{text}</Link>
                );
              }
            },
            {
              title: 'In use by',
              dataIndex: 'inUseBy',
              key: 'inUseBy'
            },
            {
              title: 'Database engine',
              dataIndex: 'engine',
              key: 'dbEngine'
            },
            {
              title: 'Hostname',
              key: 'host',
              dataIndex: 'host'
            },
            {
              title: 'IP:Port',
              key: 'port',
              dataIndex: 'port'
            },
            {
              key: 'action',
              dataIndex: 'conn_id',
              render: (_, record) => {
                return record.conn_id === selectedTestConn?.conn_id && connectLoading ? (
                  <div className="flex items-center gap-2">
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />{' '}
                  </div>
                ) : (
                  <Dropdown
                    overlay={renderDropdownMenu(record)}
                    trigger={['click']}
                    placement="bottomRight"
                    arrow>
                    <FaEllipsisV style={{ cursor: 'pointer' }} />
                  </Dropdown>
                );
              }
            }
          ]}
          dataSource={connectionList}
          pagination={{
            position: ['bottomCenter']
          }}
        />
      </div>
      <SideModal
        title={<div className="font-semibold text-xl">Create connection profile</div>}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={[
          <Button type="primary" form="myForm" key="submit" htmlType="submit">
            Submit
          </Button>
        ]}
        okText="CREATE"
        cancelText="CANCEL">
        <CreateConnectionProfile closeModal={() => setOpenModal(false)} />
      </SideModal>
    </>
  );
};
