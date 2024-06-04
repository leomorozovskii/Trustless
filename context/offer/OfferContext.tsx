import React, { createContext, PropsWithChildren, useContext, useReducer, useState } from 'react';

import { IOfferFrom, IOfferTo, IOfferValues } from '@context/offer/OfferContext.interfaces';
import { OfferProgress } from '@lib/constants';

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
      amount: 0,
      amountError: '',
      decimals: 0,
      receiver: '',
    },
  );

  const [activeOfferStep, setActiveOfferStep] = useState<number>(1);
  const [offerId, setOfferId] = useState<number | null>(null);
  const [acceptId, setAcceptId] = useState<string | null>(null);
  const [customTokenName, setCustomTokenName] = useState<string>('');
  const [activeStep, setActiveStep] = useState<OfferProgress>(OfferProgress.None);
  const [activeAcceptStep, setActiveAcceptStep] = useState<OfferProgress>(OfferProgress.Filled);
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);

  const values: IOfferValues = {
    offerFromState,
    offerToState,
    activeOfferStep,
    activeStep,
    activeAcceptStep,
    offerId,
    acceptId,
    customTokenName,
    inputsDisabled,
    setInputsDisabled,
    setCustomTokenName,
    setOfferId,
    setAcceptId,
    setOfferFromState,
    setOfferToState,
    setActiveOfferStep,
    setActiveStep,
    setActiveAcceptStep,
  };

  return <OfferContext.Provider value={values}>{children}</OfferContext.Provider>;
};

export const useOfferContext = () => {
  const context = useContext(OfferContext);
  if (!context) throw new Error('useOfferContext must be used within an OfferProvider');
  return context;
};
