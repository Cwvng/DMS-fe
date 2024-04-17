import { Steps } from 'antd';
import { stepItems } from './utils.tsx';
import React from 'react';
import { AppState, useSelector } from '../../../../redux/store';

export const CreateSteps: React.FC = () => {
  const state = useSelector((state: AppState) => state.migrationJob);

  return <Steps direction="vertical" current={state.step} items={stepItems} />;
};
