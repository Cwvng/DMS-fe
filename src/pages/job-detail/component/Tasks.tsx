import { Table, TableProps, Tag } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { TaskResponse } from '../../../requests/types/task.interface.ts';

interface TasksProps {
  tasks: TaskResponse[] | undefined;
}
export const Tasks: React.FC<TasksProps> = ({ tasks }) => {
  const getStatusTagColor = (status: string): string => {
    switch (status) {
      case 'failed':
        return 'volcano';
      default:
        return 'green';
    }
  };
  const columns: TableProps<TaskResponse>['columns'] = [
    {
      title: 'Task ID',
      dataIndex: 'task_id',
      key: 'task_id',
      filterSearch: true,
      render: (text: string, record) => (
        <Link to={`/migration-jobs/${record.job_id}/tasks/${record.task_id}`}>{text}</Link>
      )
    },
    {
      title: 'Start time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text: string) => {
        const startTime = new Date(text);
        const formattedTime = startTime.toLocaleString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        return <span>{formattedTime}</span>;
      }
    },
    {
      title: 'Total migration time',
      dataIndex: 'total_migration_time',
      key: 'total_migration_time',
      render: (text: string) => <span>{text}</span>
    },
    {
      title: 'Total DDL queries migrated',
      dataIndex: 'total_ddls',
      key: 'total_ddls',
      render: (text: string) => <span>{text}</span>
    },
    {
      title: 'Total rows migrated',
      dataIndex: 'total_rows',
      key: 'total_rows',
      render: (text: string) => <span>{text}</span>
    },
    {
      title: 'Task mode',
      dataIndex: 'task_mode',
      key: 'task_mode',
      render: (text: string) => <span>{text}</span>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = getStatusTagColor(status);
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      }
    }
  ];
  return (
    <Table
      rowSelection={{ type: 'checkbox' }}
      className="w-full"
      columns={columns}
      dataSource={tasks}
      pagination={{
        position: ['bottomCenter']
      }}
    />
  );
};
