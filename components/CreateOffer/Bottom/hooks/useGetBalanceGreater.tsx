import { useCallback } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { useTokenData } from '@components/CreateOffer/Bottom/hooks/useTokenData';
import { useOfferContext } from '@context/offer/OfferContext';

export const useGetBalanceGreater = () => {
  const { address: userAddress } = useAccount();
  const { tokenFromAddress } = useTokenData();
  const { offerFromState } = useOfferContext();

  const { data: balance } = useBalance({
    address: userAddress,
    token: tokenFromAddress,
  });

  const isGreater = useCallback(() => {
    if (!balance) return;
    return offerFromState.amount > Number(balance.formatted);
  }, [tokenFromAddress, balance, offerFromState.amount]);

  return {
    isGreater,
  };
};
