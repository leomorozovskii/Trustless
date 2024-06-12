import { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { Address, erc20Abi } from 'viem';

import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { useOfferAcceptContext } from '@context/offer/accept/OfferAcceptContext';
import { OfferProgress } from '@lib/constants';
import { environment } from '@lib/environment';

export const useAcceptAllowance = () => {
  const { setActiveAcceptStep, acceptId } = useOfferAcceptContext();

  const { address: userAddress } = useAccount();
  const { amountTo, tokenTo } = useGetOfferDetails({ id: acceptId });

  const {
    data: acceptOfferAllowance,
    isLoading: isGettingAllowance,
    refetch: refetchAllowance,
  } = useReadContract({
    address: tokenTo,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [userAddress as Address, environment.contractAddress],
  });

  const [isSufficient, setIsSufficient] = useState<boolean | null>(null);

  useEffect(() => {
    setActiveAcceptStep(OfferProgress.None);
  }, [setActiveAcceptStep, userAddress]);

  useEffect(() => {
    if (isGettingAllowance || !amountTo || acceptOfferAllowance === null) {
      setIsSufficient(null);
    } else {
      const allowance = acceptOfferAllowance ?? 0;
      setIsSufficient(allowance >= amountTo);
    }
  }, [acceptOfferAllowance, amountTo, isGettingAllowance]);

  useEffect(() => {
    if (isSufficient === true) {
      setActiveAcceptStep(OfferProgress.Approved);
    } else if (isSufficient === false) {
      setActiveAcceptStep(OfferProgress.Filled);
    }
  }, [isSufficient, setActiveAcceptStep]);

  return {
    refetchAllowance,
  };
};
