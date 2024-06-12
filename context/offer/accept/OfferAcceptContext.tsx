import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

import { IOfferAcceptValues } from '@context/offer/accept/OfferAcceptContext.interfaces';
import { OfferProgress } from '@lib/constants';

const OfferAcceptContext = createContext<IOfferAcceptValues | null>(null);

export const OfferAcceptProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [activeAcceptStep, setActiveAcceptStep] = useState<OfferProgress>(OfferProgress.Filled);
  const [acceptId, setAcceptId] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string>('');
  const [isInfinite, setIsInfinite] = useState<boolean>(false);

  const values: IOfferAcceptValues = useMemo(
    () => ({
      acceptId,
      setAcceptId,
      activeAcceptStep,
      isInfinite,
      setIsInfinite,
      setActiveAcceptStep,
      txHash,
      setTxHash,
    }),
    [acceptId, activeAcceptStep, isInfinite, txHash],
  );

  return <OfferAcceptContext.Provider value={values}>{children}</OfferAcceptContext.Provider>;
};

export const useOfferAcceptContext = () => {
  const context = useContext(OfferAcceptContext);
  if (!context) throw new Error('useOfferAcceptContext must be used within an OfferAcceptProvider');
  return context;
};
