import { Form, Input, Modal, Table, TableProps, Tag } from 'antd';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TaskResponse } from '../../../requests/types/task.interface.ts';
import { getTasksByJobId } from '../../../requests/task.request.ts';
import { AppState, useSelector } from '../../../redux/store';
import { Loading } from '../../../components/loading/Loading.tsx';
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
      sorter: {
        compare: (a: any, b: any) => a.startTime.localeCompare(b.startTime),
        multiple: 1
      },
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
      align: 'center',
      render: (text: string) => <span>{text}</span>
    },
    {
      title: 'Total DDL queries migrated',
      dataIndex: 'total_ddls',
      key: 'total_ddls',
      align: 'center',
      render: (text: string) => <span>{text}</span>
    },
    {
      title: 'Total rows migrated',
      dataIndex: 'total_rows',
      key: 'total_rows',
      align: 'center',
      render: (text: string) => <span>{text}</span>
    },
    {
      title: 'Task mode',
      dataIndex: 'task_mode',
      key: 'task_mode',
      align: 'center',
      render: (text: string) => <span>{text}</span>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
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
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      width: 200,
      render: (message) => <span>{message}</span>
    }
  ];
  useEffect(() => {
    getTasksByJob();
  }, []);
  if (loading) return <Loading />;
  return (
    <>
      <Table
        className="w-full"
        columns={columns}
        dataSource={tasks}
        rowKey={(record) => record.task_id}
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
