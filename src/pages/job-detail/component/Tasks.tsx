import { Button, Form, Input, Modal, Table, TableProps, Tag } from 'antd';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TaskResponse } from '../../../requests/types/task.interface.ts';
import { getTasksByJobId } from '../../../requests/task.request.ts';
import { AppState, useSelector } from '../../../redux/store';
import { Loading } from '../../../components/loading/Loading.tsx';
import { FaPlus } from 'react-icons/fa';
import { useForm } from 'antd/es/form/Form';

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = React.useState<TaskResponse[]>();
  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const { id } = useParams();
  const projectId = useSelector((app: AppState) => app.migrationJob.projectId);
  const [form] = useForm();

  const getTasksByJob = async () => {
    try {
      if (id) {
        setLoading(true);
        const res = await getTasksByJobId(projectId, id);
        setTasks(res);
      }
    } finally {
      setLoading(false);
    }
  };
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
  useEffect(() => {
    getTasksByJob();
  }, []);
  if (loading) return <Loading />;
  return (
    <>
      <Button
        className="flex mr-3 ml-auto mb-2"
        type="primary"
        title="Create new task"
        shape="circle"
        onClick={() => setOpenModal(true)}
        icon={<FaPlus />}
      />
      <Table
        rowSelection={{ type: 'checkbox' }}
        className="w-full"
        columns={columns}
        dataSource={tasks}
        pagination={{
          position: ['bottomCenter']
        }}
      />
      <Modal
        title={<span className="text-xl font-bold text-primary">Create new task</span>}
        centered
        open={openModal}
        onCancel={() => setOpenModal(false)}
        okText="Create"
        onOk={form.submit}>
        <Form layout="vertical" form={form}>
          <Form.Item name="name" label={<span className="font-medium">Group chat name</span>}>
            <Input size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
