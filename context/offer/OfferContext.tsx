import React, { createContext, PropsWithChildren, useContext, useReducer, useState } from 'react';

import { CreateOfferState } from '@lib/constants';
import { IOfferFrom, IOfferTo, IOfferValues } from '@context/offer/OfferContext.interfaces';

const OfferContext = createContext<IOfferValues | null>(null);

export const OfferProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [offerFromState, setOfferFromState] = useReducer(
    (oldState: IOfferFrom, newState: Partial<IOfferFrom>): IOfferFrom => ({
      ...oldState,
      ...newState,
    }),
    {
      from: '',
      amount: 0,
      rate: 0,
    },
  );

  const [offerToState, setOfferToState] = useReducer(
    (oldState: IOfferTo, newState: Partial<IOfferTo>): IOfferTo => ({
      ...oldState,
      ...newState,
    }),
    {
      to: '',
      amount: 0,
      receiver: '',
    },
  );

  const [activeOfferStep, setActiveOfferStep] = useState<number>(1);

  const [activeStep, setActiveStep] = useState<CreateOfferState>(CreateOfferState.None);

  const values: IOfferValues = {
    offerFromState,
    offerToState,
    activeOfferStep,
    activeStep,
    setOfferFromState,
    setOfferToState,
    setActiveOfferStep,
    setActiveStep,
  };

  return <OfferContext.Provider value={values}>{children}</OfferContext.Provider>;
};

export const useOfferContext = () => {
  const context = useContext(OfferContext);
  if (!context) throw new Error('useOfferContext must be used within an OfferProvider');
  return context;
};
