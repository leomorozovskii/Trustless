import { useEffect, useState } from 'react';
import type { Address } from 'viem';
import { erc20Abi } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

import { environment } from '@berezka-dao/core/environment';
import { useGetOfferDetails } from '@berezka-dao/features/acceptOffer/components/AcceptOffer/hooks/useGetOfferDetails';
import { useOfferAcceptContext } from '@berezka-dao/features/acceptOffer/store';
import { OfferProgress } from '@berezka-dao/features/createOffer/types';

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
  }, [acceptOfferAllowance, amountTo, isGettingAllowance, userAddress]);

  useEffect(() => {
    if (isSufficient === true) {
      setActiveAcceptStep(OfferProgress.Approved);
    } else if (isSufficient === false) {
      setActiveAcceptStep(OfferProgress.Filled);
    }
  }, [isSufficient, setActiveAcceptStep, userAddress]);

  return {
    refetchAllowance,
  };
};
