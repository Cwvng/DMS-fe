import { StepsProps } from 'antd';
import { GetStarted } from './step/GetStarted.tsx';
interface stepItems extends StepsProps {
  content?: React.ReactNode;
}
export const stepItems = [
  { title: 'Get started', description: 'Get started', content: <GetStarted /> },
  {
    title: 'Define a source',
    description: 'Define a source'
  },
  {
    title: 'Define a destination',
    description: 'Define a destination'
  },
  {
    title: 'Test and create migration job',
    description: 'Test and create migration job'
  }
];
