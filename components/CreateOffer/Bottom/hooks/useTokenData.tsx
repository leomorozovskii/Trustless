import { useOfferContext } from '@context/offer/offer-context';
import { useMemo, useState } from 'react';
import { TOKEN_MAP } from '@lib/constants';
import { Address } from 'viem';

export const useTokenData = () => {
  const { offerFromState, offerToState } = useOfferContext();
  const [isValid, setIsValid] = useState<boolean>(false);

  const data = useMemo(() => {
    const tokenFrom = Object.entries(TOKEN_MAP).find(([, tokenData]) => tokenData.name === offerFromState.from);
    const tokenTo = Object.entries(TOKEN_MAP).find(([, tokenData]) => tokenData.name === offerToState.to);

    if (!tokenFrom || !tokenTo) {
      setIsValid(false);
      return;
    }

    const tokenFromAddress = tokenFrom[0] as Address;
    const tokenToAddress = tokenTo[0] as Address;
    const tokenFromDecimals = tokenFrom[1].decimals;
    const tokenToDecimals = tokenTo[1].decimals;
    setIsValid(true);

    return {
      tokenFromAddress,
      tokenToAddress,
      tokenFromDecimals,
      tokenToDecimals,
    };
  }, [offerFromState, offerToState]);

  return {
    tokenFromAddress: (data?.tokenFromAddress ?? '') as Address,
    tokenToAddress: (data?.tokenToAddress ?? '') as Address,
    tokenFromDecimals: data?.tokenFromDecimals ?? 0,
    tokenToDecimals: data?.tokenToDecimals ?? 0,
    isValid,
  };
};
