import React, { useMemo } from 'react';
import s from './ProgressOfferBar.module.scss';
import { CheckmarkIcon } from '@assets/icons';

export interface IProgressOfferBar {
  currentStep: number;
  steps: string[];
}

const ProgressOfferBar: React.FC<IProgressOfferBar> = ({
  currentStep,
  steps,
}) => {
  const isComplete = useMemo(() => {
    return currentStep === steps.length + 1;
  }, [currentStep, steps]);

  return (
    <div className={s.wrapper}>
      {steps?.map((step, i) => (
        <div
          key={i}
          className={`${s.stepItem} ${currentStep === i + 1 ? s.active : ''} ${
            i + 1 < currentStep || isComplete ? s.complete : ''
          }`}
        >
          <p className={s.label}>{step}</p>
          <div className={s.step}>
            {i + 1 < currentStep || isComplete ? <CheckmarkIcon /> : i + 1}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressOfferBar;
