import type { FC } from 'react';
import { useMemo } from 'react';

import { CheckmarkIcon } from '@berezka-dao/shared/icons';

import s from './ProgressOfferBar.module.scss';

type ProgressOfferBarProps = {
  currentStep: number;
  steps: string[];
};

const ProgressOfferBar: FC<ProgressOfferBarProps> = ({ currentStep, steps }) => {
  const isComplete = useMemo(() => {
    return currentStep === steps.length + 1;
  }, [currentStep, steps]);

  return (
    <div className={s.wrapper}>
      {steps?.map((step, i) => (
        <div
          key={step}
          className={`${s.stepItem} ${currentStep === i + 1 ? s.active : ''} ${
            i + 1 < currentStep || isComplete ? s.complete : ''
          }`}
        >
          <p className={s.label}>{step}</p>
          <div className={s.step}>{i + 1 < currentStep || isComplete ? <CheckmarkIcon /> : i + 1}</div>
        </div>
      ))}
    </div>
  );
};

export { ProgressOfferBar };
