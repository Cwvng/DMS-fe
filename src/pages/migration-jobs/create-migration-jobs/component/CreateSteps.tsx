import { Steps } from 'antd';
import { stepItems } from './utils.tsx';
import React from 'react';
import { AppState, useDispatch, useSelector } from '../../../../redux/store';
import { updateStep } from '../../../../redux/slices/migration-jobs.slice.ts';

export const CreateSteps: React.FC = () => {
  const state = useSelector((state: AppState) => state.migrationJob);
  const dispatch = useDispatch();

  return (
    <Steps
      direction="vertical"
      onChange={(index) => dispatch(updateStep(index))}
      current={state.step}
      items={stepItems}
    />
  );
};
