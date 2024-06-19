import type { PropsWithChildren } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

import { OfferProgress } from '@berezka-dao/features/createOffer/types';

interface IOfferAcceptValues {
  acceptId: string;
  activeAcceptStep: OfferProgress;
  isInfinite: boolean;
  setIsInfinite: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveAcceptStep: React.Dispatch<React.SetStateAction<OfferProgress>>;
  txHash: string;
  setTxHash: React.Dispatch<React.SetStateAction<string>>;
}

const OfferAcceptContext = createContext<IOfferAcceptValues | null>(null);

const OfferAcceptProvider: React.FC<PropsWithChildren & { id: string }> = ({ children, id }) => {
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

const useOfferAcceptContext = () => {
  const context = useContext(OfferAcceptContext);
  if (!context) throw new Error('useOfferAcceptContext must be used within an OfferAcceptProvider');
  return context;
};

export { OfferAcceptProvider, useOfferAcceptContext };
