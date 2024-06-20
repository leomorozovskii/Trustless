import { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';

import { customErc20Abi } from '@berezka-dao/core/abis/customErc20Abi';
import { environment } from '@berezka-dao/core/environment';
import { OfferProgress } from '@berezka-dao/shared/components/ProgressBar';
import { useGetOfferDetails } from '@berezka-dao/shared/retrieve-data/useGetOfferDetails';

import { useOfferAcceptContext } from '../store';

export const useAcceptAllowance = () => {
  const { setActiveAcceptStep, acceptId } = useOfferAcceptContext();

  const { address: userAddress } = useAccount();
  const { amountTo, tokenTo } = useGetOfferDetails({ id: acceptId });

  const {
    data: acceptOfferAllowance,
    isLoading: isGettingAllowance,
    refetch: refetchAllowance,
  } = useReadContract(
    userAddress && {
      address: tokenTo?.address,
      abi: customErc20Abi,
      functionName: 'allowance',
      args: [userAddress, environment.contractAddress],
    },
  );

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
