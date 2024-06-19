import { useMemo, useState } from 'react';
import { Address } from 'viem';

import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { TOKEN_MAP } from '@lib/constants';

export const useTokenData = () => {
  const { offerFromState, offerToState, userTokens } = useOfferCreateContext();
  const [isValid, setIsValid] = useState<boolean>(false);

  const data = useMemo(() => {
    let tokenFromDecimals;
    const currentToken = userTokens.tokens?.find((token) => token.address === offerFromState.from);
    if (currentToken) {
      tokenFromDecimals = currentToken.decimals;
    } else {
      tokenFromDecimals = offerFromState.decimals;
    }

    const tokenToDecimals = TOKEN_MAP[offerToState.to as Address]
      ? TOKEN_MAP[offerToState.to as Address].decimals
      : offerToState.decimals;

    if (!tokenFromDecimals || !tokenToDecimals) {
      setIsValid(false);
      return;
    }

    setIsValid(true);

    return {
      tokenFromDecimals,
      tokenToDecimals,
    };
  }, [offerFromState.decimals, offerFromState.from, offerToState.decimals, offerToState.to, userTokens.tokens]);

  return {
    tokenFromAddress: offerFromState.from as Address,
    tokenToAddress: offerToState.to as Address,
    tokenFromDecimals: data?.tokenFromDecimals ?? 0,
    tokenToDecimals: data?.tokenToDecimals ?? 0,
    isValid,
  };
};
