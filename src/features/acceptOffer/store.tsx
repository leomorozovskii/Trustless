import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

import { OfferProgress } from '@berezka-dao/shared/components/ProgressBar';

type OfferAcceptValues = {
  acceptId: string;
  activeAcceptStep: OfferProgress;
  isInfinite: boolean;
  setIsInfinite: Dispatch<SetStateAction<boolean>>;
  setActiveAcceptStep: Dispatch<SetStateAction<OfferProgress>>;
  txHash: string;
  setTxHash: Dispatch<SetStateAction<string>>;
};

const OfferAcceptContext = createContext<OfferAcceptValues | null>(null);

const OfferAcceptProvider: FC<PropsWithChildren & { id: string }> = ({ children, id }) => {
  const [activeAcceptStep, setActiveAcceptStep] = useState<OfferProgress>(OfferProgress.None);
  const [txHash, setTxHash] = useState<string>('');
  const [isInfinite, setIsInfinite] = useState<boolean>(false);

  const values: OfferAcceptValues = useMemo(
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
