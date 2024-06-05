import React, { createContext, PropsWithChildren, useContext, useReducer, useState } from 'react';

import { IOfferFrom, IOfferTo, IOfferCreateValues } from '@context/offer/create/OfferCreateContext.interfaces';
import { OfferProgress } from '@lib/constants';

const OfferCreateContext = createContext<IOfferCreateValues | null>(null);

export const OfferProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [offerFromState, setOfferFromState] = useReducer(
    (oldState: IOfferFrom, newState: Partial<IOfferFrom>): IOfferFrom => ({
      ...oldState,
      ...newState,
    }),
    {
      from: '',
      amount: '',
      amountError: '',
      decimals: 0,
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
      amount: '',
      amountError: '',
      decimals: 0,
      receiver: '',
    },
  );

  const [activeOfferStep, setActiveOfferStep] = useState<number>(1);
  const [offerId, setOfferId] = useState<number | null>(null);
  const [customTokenName, setCustomTokenName] = useState<string>('');
  const [activeStep, setActiveStep] = useState<OfferProgress>(OfferProgress.None);
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);

  const values: IOfferCreateValues = {
    offerFromState,
    offerToState,
    activeOfferStep,
    activeStep,
    offerId,
    customTokenName,
    inputsDisabled,
    setInputsDisabled,
    setCustomTokenName,
    setOfferId,
    setOfferFromState,
    setOfferToState,
    setActiveOfferStep,
    setActiveStep,
  };

  return <OfferCreateContext.Provider value={values}>{children}</OfferCreateContext.Provider>;
};

export const useOfferCreateContext = () => {
  const context = useContext(OfferCreateContext);
  if (!context) throw new Error('useOfferCreateContext must be used within an OfferProvider');
  return context;
};
