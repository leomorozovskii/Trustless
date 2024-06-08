import React, { createContext, PropsWithChildren, useContext, useState } from 'react';

import { IOfferCancelValues } from './OfferCancelContext.interfaces';

const OfferCancelContext = createContext<IOfferCancelValues | null>(null);

export const OfferCancelProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [cancelId, setCancelId] = useState<string | null>(null);

  const values: IOfferCancelValues = {
    cancelId,
    setCancelId,
  };

  return <OfferCancelContext.Provider value={values}>{children}</OfferCancelContext.Provider>;
};

export const useOfferCancelContext = () => {
  const context = useContext(OfferCancelContext);
  if (!context) throw new Error('useOfferCancelContext must be used within an OfferCancelProvider');
  return context;
};
