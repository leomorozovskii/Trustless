import { useEffect } from 'react';
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

  useEffect(() => {
    if (isGettingAllowance) return;
    let allowance: bigint | number;
    if (acceptOfferAllowance) {
      allowance = acceptOfferAllowance;
    } else {
      allowance = 0;
    }

    if (allowance >= amountTo) {
      setActiveAcceptStep(OfferProgress.Approved);
    } else {
      setActiveAcceptStep(OfferProgress.Filled);
    }
  }, [acceptOfferAllowance, amountTo, setActiveAcceptStep, isGettingAllowance, userAddress]);

  return {
    refetchAllowance,
  };
};
