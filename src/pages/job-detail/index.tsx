import { Tabs, TabsProps } from 'antd';
import React from 'react';
import { GeneralInformation } from './component/GeneralInformation.tsx';
import { Tasks } from './component/Tasks.tsx';
import { PageHeader } from '../../components/page-header/PageHeader.tsx';

export const JobDetail: React.FC = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'General Information',
      children: <GeneralInformation />
    },
    {
      key: '2',
      label: 'Tasks',
      children: <Tasks />
    }
  ];

  return (
    <div>
      <PageHeader title="Migration job detail" />
      <div className="px-5">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
};
