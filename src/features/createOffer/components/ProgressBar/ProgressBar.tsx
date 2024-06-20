import cn from 'classnames';
import type { FC } from 'react';
import { useMemo } from 'react';

import { OfferProgress } from '@berezka-dao/features/createOffer/types';
import { CheckmarkIcon } from '@berezka-dao/shared/icons';

import s from './ProgressBar.module.scss';

type Props = {
  currentStep: OfferProgress;
};

const ProgressBar: FC<Props> = ({ currentStep }) => {
  const isComplete = useMemo(() => {
    return currentStep === OfferProgress.Created;
  }, [currentStep]);

  return (
    <div className={s.wrapper}>
      <div className={s.lineWrap}>
        <div
          className={cn(
            s.stepItem,
            currentStep === OfferProgress.Filled && s.active,
            (currentStep === OfferProgress.Filled || currentStep === OfferProgress.Approved || isComplete) &&
              s.complete,
          )}
        >
          <div className={cn(s.step, currentStep === OfferProgress.Filled && s.activeStep)}>
            {currentStep === OfferProgress.Filled || currentStep === OfferProgress.Approved || isComplete ? (
              <CheckmarkIcon />
            ) : (
              1
            )}
          </div>
        </div>
        <div
          className={cn(
            s.stepItem,
            s.reverse,
            currentStep === OfferProgress.Approved && s.active,
            (currentStep === OfferProgress.Approved || isComplete) && s.complete,
            currentStep === OfferProgress.Approved && !isComplete && s.approvedNotComplete,
          )}
        >
          <div
            className={cn(
              s.step,
              isComplete && s.activeStep,
              currentStep === OfferProgress.Approved && !isComplete && s.approvedStep,
            )}
          >
            {isComplete ? <CheckmarkIcon /> : 2}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProgressBar };
