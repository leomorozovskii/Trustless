import React, { useMemo } from 'react';
import s from './ProgressBar.module.scss';
import cn from 'classnames';
import { CreateOfferState } from '@lib/constants';
import { CheckmarkIcon } from '@assets/icons';

export interface IProgressBar {
  currentStep: CreateOfferState;
}

const ProgressBar: React.FC<IProgressBar> = ({ currentStep }) => {
  const isComplete = useMemo(() => {
    return currentStep === CreateOfferState.Created;
  }, [currentStep]);

  return (
    <div className={s.wrapper}>
      <div className={s.lineWrap}>
        <div
          className={cn(
            s.stepItem,
            currentStep === CreateOfferState.Filled && s.active,
            (currentStep === CreateOfferState.Filled ||
              currentStep === CreateOfferState.Approved ||
              isComplete) &&
              s.complete,
          )}
        >
          <div
            className={cn(
              s.step,
              currentStep === CreateOfferState.Filled && s.activeStep,
            )}
          >
            {currentStep === CreateOfferState.Filled ||
            currentStep === CreateOfferState.Approved ||
            isComplete ? (
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
            currentStep === CreateOfferState.Approved && s.active,
            (currentStep === CreateOfferState.Approved || isComplete) &&
              s.complete,
            currentStep === CreateOfferState.Approved &&
              !isComplete &&
              s.approvedNotComplete,
          )}
        >
          <div
            className={cn(
              s.step,
              isComplete && s.activeStep,
              currentStep === CreateOfferState.Approved &&
                !isComplete &&
                s.approvedStep,
            )}
          >
            {isComplete ? <CheckmarkIcon /> : 2}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
