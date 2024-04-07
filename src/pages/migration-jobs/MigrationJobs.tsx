import React from 'react';
import { Col, Row, Tabs, TabsProps } from 'antd';
import { DMSButton } from '../../components/button/DMSButton.tsx';
import { FaPlay, FaPlusSquare, FaSquare, FaTrash } from 'react-icons/fa';
import { BsBootstrapReboot } from 'react-icons/bs';
import { GrResume } from 'react-icons/gr';
import { JobsTable } from './jobs-table';

export const MigrationJobs: React.FC = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'JOBS',
      children: <JobsTable />
    },
    {
      key: '2',
      label: 'DRAFT',
      children: 'Content of Tab Pane 2'
    }
  ];
  return (
    <>
      <Row className="p-5 border-x-0 border-t-0 border-b border-gray-200 border-solid">
        <Col span={4}>
          <span className="text-xl font-bold">Migration jobs</span>
        </Col>
        <Col span={20}>
          <div className="flex gap-2 justify-start">
            <DMSButton icon={<FaPlusSquare />} type="text" title="CREATE MIGRATION JOB" />
            <DMSButton icon={<FaPlay />} type="text" title="START" />
            <DMSButton icon={<FaSquare />} type="text" title="STOP" />
            <DMSButton icon={<BsBootstrapReboot />} type="text" title="RESTART" />
            <DMSButton icon={<GrResume />} type="text" title="RESUME" />
            <DMSButton icon={<FaTrash />} type="text" title="DELETE" />
          </div>
        </Col>
      </Row>
      <Row className="p-5">
        <div className="font-normal">
          Migration jobs allow you to move data between source and destination databases
        </div>
      </Row>
      <div className="px-5">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </>
  );
};