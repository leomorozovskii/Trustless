import { useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { Address, erc20Abi } from 'viem';

import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { useOfferAcceptContext } from '@context/offer/accept/OfferAcceptContext';
import { OfferProgress } from '@lib/constants';
import { environment } from '@lib/environment';

export const useAcceptAllowance = () => {
  const { setActiveAcceptStep, acceptId, activeAcceptStep } = useOfferAcceptContext();

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
    if (isGettingAllowance || !amountTo) return;
    let allowance: bigint | number;
    if (acceptOfferAllowance) {
      allowance = acceptOfferAllowance;
    } else {
      allowance = 0;
    }

    const filled = activeAcceptStep === OfferProgress.Filled;
    const approved = activeAcceptStep === OfferProgress.Approved;

    if (allowance >= amountTo && filled) {
      setActiveAcceptStep(OfferProgress.Approved);
    } else if (allowance < amountTo && approved) {
      setActiveAcceptStep(OfferProgress.Filled);
    }
  }, [acceptOfferAllowance, amountTo, setActiveAcceptStep, isGettingAllowance, userAddress, activeAcceptStep]);

  return {
    refetchAllowance,
  };
};
