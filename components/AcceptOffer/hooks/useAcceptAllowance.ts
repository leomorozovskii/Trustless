import { useOfferAcceptContext } from '@context/offer/accept/OfferAcceptContext';
import { useAccount, useReadContract } from 'wagmi';
import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { Address, erc20Abi } from 'viem';
import { environment } from '@lib/environment';
import { useEffect } from 'react';
import { OfferProgress } from '@lib/constants';

export const useAcceptAllowance = () => {
  const { setActiveAcceptStep } = useOfferAcceptContext();

  const { address: userAddress } = useAccount();
  const { amountTo, tokenTo } = useGetOfferDetails();

  const { data: acceptOfferAllowance } = useReadContract({
    address: tokenTo,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [userAddress as Address, environment.contractAddress],
  });

  useEffect(() => {
    if (!acceptOfferAllowance) return;
    if (acceptOfferAllowance >= amountTo) {
      setActiveAcceptStep(OfferProgress.Approved);
    } else {
      setActiveAcceptStep(OfferProgress.Filled);
    }
  }, [acceptOfferAllowance, amountTo]);
};
