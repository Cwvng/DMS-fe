import { Table, TableProps, Tag } from 'antd';
import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';

interface DataType {
  key: string;
  name: string;
  status: string;
  phase: string;
  src: string;
  destination: string;
}

const getStatusTagColor = (status: string): string => {
  switch (status) {
    case 'Not started':
      return 'geekblue';
    case 'error':
      return 'volcano';
    default:
      return 'green';
  }
};

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Migration job name',
    dataIndex: 'name',
    key: 'name',
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value as string),
    render: (text: string) => <span>{text}</span>
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
    key: 'phase'
  },
  {
    title: 'Source connection profile',
    key: 'src',
    dataIndex: 'src',
    render: (text: string) => <a>{text}</a>
  },
  {
    title: 'Destination ID',
    key: 'destination',
    dataIndex: 'destination',
    render: (text: string) => <a>{text}</a>
  },
  {
    key: 'action',
    dataIndex: 'action',
    render: () => <FaEllipsisV />
  }
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    phase: 'Progress',
    src: 'New York No. 1 Lake Park',
    status: 'Not started',
    destination: 'example'
  },
  {
    key: '2',
    name: 'John Brown',
    phase: 'Progress',
    src: 'New York No. 1 Lake Park',
    status: 'Done',
    destination: 'example'
  }
];

export const JobsTable: React.FC = () => {
  return (
    <Table
      rowSelection={{ type: 'checkbox' }}
      className="w-full"
      columns={columns}
      dataSource={data}
      pagination={{
        position: ['bottomCenter']
      }}
    />
  );
};
