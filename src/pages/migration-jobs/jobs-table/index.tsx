import { Table, TableProps, Tag } from 'antd';
import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { JobResponse } from '../../../requests/types/job.interface.ts';
import { Link } from 'react-router-dom';

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

const columns: TableProps<JobResponse>['columns'] = [
  {
    title: 'Migration job name',
    dataIndex: 'name',
    key: 'name',
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value as string),
    render: (text: string, record) => <Link to={`/migration-jobs/${record.job_id}`}>{text}</Link>
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: {
      compare: (a, b) => a.status.localeCompare(b.status),
      multiple: 1
    },
    render: (status) => {
      const color = getStatusTagColor(status);
      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    }
  },
  {
    title: 'Phase',
    dataIndex: 'phase',
    key: 'phase',
    render: (text: string) => <span>{text.toUpperCase()}</span>
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
    dataIndex: 'action',
    render: () => <FaEllipsisV />
  }
];

interface JobsTableProps {
  jobs: JobResponse[];
}
export const JobsTable: React.FC<JobsTableProps> = ({ jobs }) => {
  return (
    <Table
      rowSelection={{ type: 'checkbox' }}
      className="w-full"
      columns={columns}
      dataSource={jobs}
      pagination={{
        position: ['bottomCenter']
      }}
    />
  );
};
