import { OfferProgress } from '@lib/constants';
import React from 'react';

interface IOfferAcceptValues {
  acceptId: string;
  activeAcceptStep: OfferProgress;
  isInfinite: boolean;
  setIsInfinite: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveAcceptStep: React.Dispatch<React.SetStateAction<OfferProgress>>;
  txHash: string;
  setTxHash: React.Dispatch<React.SetStateAction<string>>;
}

export type { IOfferAcceptValues };
