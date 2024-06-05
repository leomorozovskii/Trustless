import { useCallback } from 'react';
import { useAccount, useBalance } from 'wagmi';

import { useTokenData } from '@components/CreateOffer/Buttons/hooks/useTokenData';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';

export const useGetBalanceGreater = () => {
  const { address: userAddress } = useAccount();
  const { tokenFromAddress } = useTokenData();
  const { offerFromState } = useOfferCreateContext();

  const { data: balance } = useBalance({
    address: userAddress,
    token: tokenFromAddress,
  });

  const isGreater = useCallback(() => {
    if (!balance) return;
    return Number(offerFromState.amount) > Number(balance.formatted);
  }, [tokenFromAddress, balance, offerFromState.amount]);

  return {
    isGreater,
  };
};
