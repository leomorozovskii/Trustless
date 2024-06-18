import type { IOfferAcceptValues } from '@context/offer/accept/OfferAcceptContext.interfaces';
import { OfferProgress } from '@lib/constants';
import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useMemo, useState } from 'react';

const OfferAcceptContext = createContext<IOfferAcceptValues | null>(null);

export const OfferAcceptProvider: React.FC<PropsWithChildren & { id: string }> = ({ children, id }) => {
  const [activeAcceptStep, setActiveAcceptStep] = useState<OfferProgress>(OfferProgress.None);
  const [txHash, setTxHash] = useState<string>('');
  const [isInfinite, setIsInfinite] = useState<boolean>(false);

  const values: IOfferAcceptValues = useMemo(
    () => ({
      acceptId: id,
      activeAcceptStep,
      isInfinite,
      setIsInfinite,
      setActiveAcceptStep,
      txHash,
      setTxHash,
    }),
    [id, activeAcceptStep, isInfinite, txHash],
  );

  return <OfferAcceptContext.Provider value={values}>{children}</OfferAcceptContext.Provider>;
};

export const useOfferAcceptContext = () => {
  const context = useContext(OfferAcceptContext);
  if (!context) throw new Error('useOfferAcceptContext must be used within an OfferAcceptProvider');
  return context;
};
