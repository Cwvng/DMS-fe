import { StepsProps } from 'antd';
import { GetStarted } from './step-1/GetStarted.tsx';
import { DefineSource } from './step-2/DefineSource.tsx';
interface stepItems extends StepsProps {
  content?: React.ReactNode;
}
export const stepItems = [
  { title: 'Get started', content: <GetStarted /> },
  {
    title: 'Define a source connection',
    content: <DefineSource />
  },
  {
    title: 'Define a destination connection'
  },
  {
    title: 'Test and create migration job'
  }
];
