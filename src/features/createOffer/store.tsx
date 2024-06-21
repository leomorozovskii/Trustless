import type { FC, PropsWithChildren } from 'react';
import { createContext, useContext, useMemo, useReducer, useState } from 'react';

import { OfferProgress } from '@berezka-dao/shared/components/ProgressBar';

import type { OfferFrom, OfferTo, OfferCreateValues, TokensReducer } from './types';

const OfferCreateContext = createContext<OfferCreateValues | null>(null);

const OfferCreateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [offerFromState, setOfferFromState] = useReducer(
    (oldState: OfferFrom, newState: Partial<OfferFrom>): OfferFrom => ({
      ...oldState,
      ...newState,
    }),
    {
      amount: '',
      amountError: '',
      isInfinite: false,
      decimals: 0,
      rate: '',
    },
  );

  const [offerToState, setOfferToState] = useReducer(
    (oldState: OfferTo, newState: Partial<OfferTo>): OfferTo => ({
      ...oldState,
      ...newState,
    }),
    {
      amount: '',
      amountError: '',
      decimals: 0,
      receiver: '',
    },
  );

  const [userTokens, setUserTokens] = useReducer(
    (oldState: TokensReducer, newState: Partial<TokensReducer>): TokensReducer => ({
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
  const [activeStep, setActiveStep] = useState<OfferProgress>(OfferProgress.None);
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);

  const values: OfferCreateValues = useMemo(
    () => ({
      offerFromState,
      offerToState,
      activeOfferStep,
      activeStep,
      offerId,
      inputsDisabled,
      userTokens,
      setUserTokens,
      setInputsDisabled,
      setOfferId,
      setOfferFromState,
      setOfferToState,
      setActiveOfferStep,
      setActiveStep,
    }),
    [activeOfferStep, activeStep, inputsDisabled, offerFromState, offerId, offerToState, userTokens],
  );

  return <OfferCreateContext.Provider value={values}>{children}</OfferCreateContext.Provider>;
};

const useOfferCreateContext = () => {
  const context = useContext(OfferCreateContext);
  if (!context) throw new Error('useOfferCreateContext must be used within an OfferCreateContext');
  return context;
};

export { OfferCreateProvider, useOfferCreateContext };
