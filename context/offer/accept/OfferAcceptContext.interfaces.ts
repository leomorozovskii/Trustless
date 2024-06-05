import { OfferProgress } from '@lib/constants';
import React from 'react';

interface IOfferAcceptValues {
  acceptId: string | null;
  setAcceptId: React.Dispatch<React.SetStateAction<string | null>>;
  activeAcceptStep: OfferProgress;
  setActiveAcceptStep: React.Dispatch<React.SetStateAction<OfferProgress>>;
  txHash: string;
  setTxHash: React.Dispatch<React.SetStateAction<string>>;
}

export type { IOfferAcceptValues };
