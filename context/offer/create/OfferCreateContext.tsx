import React, { createContext, PropsWithChildren, useContext, useMemo, useReducer, useState } from 'react';

import {
  IOfferFrom,
  IOfferTo,
  IOfferCreateValues,
  ITokensReducer,
} from '@context/offer/create/OfferCreateContext.interfaces';
import { OfferProgress } from '@lib/constants';

const OfferCreateContext = createContext<IOfferCreateValues | null>(null);

export const OfferCreateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [offerFromState, setOfferFromState] = useReducer(
    (oldState: IOfferFrom, newState: Partial<IOfferFrom>): IOfferFrom => ({
      ...oldState,
      ...newState,
    }),
    {
      from: '',
      amount: '',
      amountError: '',
      isInfinite: false,
      decimals: 0,
      rate: '',
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

  const [userTokens, setUserTokens] = useReducer(
    (oldState: ITokensReducer, newState: Partial<ITokensReducer>): ITokensReducer => ({
      ...oldState,
      ...newState,
    }),
    {
      tokens: null,
      isLoading: false,
    },
  );

  const [activeOfferStep, setActiveOfferStep] = useState<number>(1);
  const [offerId, setOfferId] = useState<number | null>(null);
  const [customTokenName, setCustomTokenName] = useState<string>('');
  const [activeStep, setActiveStep] = useState<OfferProgress>(OfferProgress.None);
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);

  const values: IOfferCreateValues = useMemo(
    () => ({
      offerFromState,
      offerToState,
      activeOfferStep,
      activeStep,
      offerId,
      customTokenName,
      inputsDisabled,
      userTokens,
      setUserTokens,
      setInputsDisabled,
      setCustomTokenName,
      setOfferId,
      setOfferFromState,
      setOfferToState,
      setActiveOfferStep,
      setActiveStep,
    }),
    [activeOfferStep, activeStep, customTokenName, inputsDisabled, offerFromState, offerId, offerToState, userTokens],
  );

  return <OfferCreateContext.Provider value={values}>{children}</OfferCreateContext.Provider>;
};

export const useOfferCreateContext = () => {
  const context = useContext(OfferCreateContext);
  if (!context) throw new Error('useOfferCreateContext must be used within an OfferCreateContext');
  return context;
};
