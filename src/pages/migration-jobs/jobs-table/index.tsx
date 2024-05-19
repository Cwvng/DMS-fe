import { Dropdown, Menu, message, Modal, Table, Tag } from 'antd';
import React, { useEffect } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { JobResponse } from '../../../requests/types/job.interface.ts';
import { Link, useNavigate } from 'react-router-dom';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { AppState, useDispatch, useSelector } from '../../../redux/store';
import { deleteJob } from '../../../requests/job.request.ts';
import { getJobList } from '../../../redux/slices/migration-jobs.slice.ts';
import { JobStatus } from '../../../constant';
import { Connection } from '../../../requests/types/connection.interface.ts';
import { getConnectionByProjectId } from '../../../requests/connection.request.ts';
import { Loading } from '../../../components/loading/Loading.tsx';

const getStatusTagColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case JobStatus.NOT_STARTED:
      return 'geekblue';
    case JobStatus.FAILED:
      return 'volcano';
    default:
      return 'green';
  }
};

interface JobsTableProps {
  jobs: JobResponse[];
  setSelectedRow: React.Dispatch<React.SetStateAction<JobResponse[] | undefined>>;
}

export const JobsTable: React.FC<JobsTableProps> = ({ jobs, setSelectedRow }) => {
  const projectId = useSelector((app: AppState) => app.migrationJob.projectId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [connectionList, setConnectionList] = React.useState<Connection[]>();

  const rowSelection = {
    onChange: (_: React.Key[], selectedRows: JobResponse[]) => {
      setSelectedRow(selectedRows);
    },
    getCheckboxProps: (record: JobResponse) => ({
      disabled: record.name === 'Disabled User',
      name: record.name
    })
  };

  const getConnectionList = async () => {
    try {
      setLoading(true);
      const res = await getConnectionByProjectId(projectId);
      setConnectionList(res);
    } finally {
      setLoading(false);
    }
  };

  const mapConnectionName = (connId: string) => {
    if (connectionList) return connectionList.filter((item) => item.conn_id === connId)[0].name;
    else return null;
  };

  const confirmDelete = (jobId: string) => {
    Modal.confirm({
      centered: true,
      title: 'Do you want to delete these items?',
      icon: <ExclamationCircleFilled />,
      onOk() {
        deleteSelectedJob(jobId);
      },
      okText: 'Yes',
      cancelText: 'No',
      okButtonProps: { className: 'bg-primary' },
      cancelButtonProps: { className: 'border-primary text-primary' }
    });
  };
  const deleteSelectedJob = async (jobId: string) => {
    try {
      await deleteJob(projectId, jobId);
      message.success('Deleted successfully');
      dispatch(getJobList(projectId));
    } finally {
    }
  };

  const renderDropdownMenu = (job: JobResponse) => (
    <Menu
      items={[
        {
          label: <span>Detail</span>,
          key: 'detail',
          onClick: () => navigate(`/migration-jobs/${job.job_id}`)
        },
        {
          label: <span>Delete</span>,
          key: 'delete',
          onClick: () => confirmDelete(job.job_id)
        }
      ]}
    />
  );

  useEffect(() => {
    getConnectionList();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection
        }}
        className="w-full"
        columns={[
          {
            title: 'Migration job name',
            dataIndex: 'name',
            key: 'name',
            filterSearch: true,
            onFilter: (value, record) => record.name.startsWith(value as string),
            render: (text: string, record) => (
              <Link to={`/migration-jobs/${record.job_id}`}>{text}</Link>
            )
          },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            sorter: {
              compare: (a: any, b: any) => a.status.localeCompare(b.status),
              multiple: 1
            },
            render: (status) => {
              const color = getStatusTagColor(status);
              return (
                <Tag color={color} key={status}>
                  {status?.toUpperCase()}
                </Tag>
              );
            }
          },
          {
            title: 'Phase',
            dataIndex: 'phase',
            key: 'phase',
            align: 'center',
            render: (text: string) => <span>{text?.toUpperCase()}</span>
          },
          {
            title: 'Source connection profile',
            key: 'src',
            dataIndex: 'source_id',
            render: (id: string) => (
              <Link to={`/connection-profiles/${id}`}>{mapConnectionName(id)}</Link>
            )
          },
          {
            title: 'Destination ID',
            key: 'destination',
            dataIndex: 'target_id',
            render: (id: string) => (
              <Link to={`/connection-profiles/${id}`}>{mapConnectionName(id)}</Link>
            )
          },
          {
            title: 'Action',
            key: 'action',
            dataIndex: 'job_id',
            align: 'center',
            render: (_, record) => (
              <Dropdown
                overlay={renderDropdownMenu(record)}
                trigger={['click']}
                placement="bottomRight"
                arrow>
                <FaEllipsisV style={{ cursor: 'pointer' }} />
              </Dropdown>
            )
          }
        ]}
        dataSource={jobs}
        rowKey={(record) => record.job_id}
        pagination={{
          position: ['bottomCenter']
        }}
      />
    </>
  );
};
