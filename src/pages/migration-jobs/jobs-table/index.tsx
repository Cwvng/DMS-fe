import { Dropdown, Input, Menu, message, Modal, Spin, Table, Tag } from 'antd';
import React from 'react';
import { FaCheck, FaEllipsisV } from 'react-icons/fa';
import { JobResponse } from '../../../requests/types/job.interface.ts';
import { Link } from 'react-router-dom';
import { ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons';
import { AppState, useDispatch, useSelector } from '../../../redux/store';
import { deleteJob, updateJob } from '../../../requests/job.request.ts';
import { getJobList } from '../../../redux/slices/migration-jobs.slice.ts';

const getStatusTagColor = (status: string): string => {
  switch (status) {
    case 'not started':
      return 'geekblue';
    case 'Failed':
      return 'volcano';
    default:
      return 'green';
  }
};

interface JobsTableProps {
  jobs: JobResponse[];
}

export const JobsTable: React.FC<JobsTableProps> = ({ jobs }) => {
  const projectId = useSelector((app: AppState) => app.migrationJob.projectId);
  const dispatch = useDispatch();

  const [selectedJob, setSelectedJob] = React.useState<JobResponse | null>();
  const [selectedName, setSelectedName] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);

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

  const updateSelectedJob = async (jobId: string) => {
    try {
      setLoading(true);
      await updateJob(projectId, jobId, { name: selectedName });
      setSelectedJob(null);
      message.success('Updated successfully');
      dispatch(getJobList(projectId));
    } finally {
      setLoading(false);
    }
  };

  const renderDropdownMenu = (job: JobResponse) => (
    <Menu
      items={[
        {
          label: <span>Edit</span>,
          key: 'edit',
          onClick: () => {
            setSelectedJob(job);
            setSelectedName(job.name);
          }
        },
        {
          label: <span>Delete</span>,
          key: 'delete',
          onClick: () => confirmDelete(job.job_id)
        }
      ]}
    />
  );

  return (
    <>
      <Table
        rowSelection={{ type: 'checkbox' }}
        className="w-full"
        columns={[
          {
            title: 'Migration job name',
            dataIndex: 'name',
            key: 'name',
            filterSearch: true,
            onFilter: (value, record) => record.name.startsWith(value as string),
            render: (text: string, record) => {
              return record.job_id === selectedJob?.job_id ? (
                <Input
                  value={selectedName}
                  onChange={(e) => setSelectedName(e.target.value)}
                  suffix={
                    loading ? (
                      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                    ) : (
                      <FaCheck
                        className="cursor-pointer text-primary"
                        onClick={() => updateSelectedJob(record.job_id)}
                      />
                    )
                  }
                />
              ) : (
                <Link to={`/migration-jobs/${record.job_id}`}>{text}</Link>
              );
            }
          },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
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
            render: (text: string) => <span>{text?.toUpperCase()}</span>
          },
          {
            title: 'Source connection profile',
            key: 'src',
            dataIndex: 'source_id',
            render: (text: string) => <a>{text}</a>
          },
          {
            title: 'Destination ID',
            key: 'destination',
            dataIndex: 'target_id',
            render: (text: string) => <a>{text}</a>
          },
          {
            key: 'action',
            dataIndex: 'job_id',
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
        pagination={{
          position: ['bottomCenter']
        }}
      />
    </>
  );
};
