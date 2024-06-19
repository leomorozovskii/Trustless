import { useEffect } from 'react';
import { erc20Abi, formatUnits } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

import { environment } from '@berezka-dao/core/environment';
import { useOfferCreateContext } from '@berezka-dao/features/createOffer/store';
import { OfferProgress } from '@berezka-dao/features/createOffer/types';

import { useTokenData } from './useTokenData';

export const useCreateAllowance = () => {
  const { offerFromState, activeStep, setActiveOfferStep, setActiveStep, setInputsDisabled, setOfferFromState } =
    useOfferCreateContext();

  const { address: userAddress } = useAccount();
  const { tokenFromAddress, tokenFromDecimals } = useTokenData();

  const {
    data: createOfferAllowance,
    isLoading: isGettingAllowance,
    refetch: refetchAllowance,
  } = useReadContract(
    userAddress && {
      address: tokenFromAddress,
      abi: erc20Abi,
      functionName: 'allowance',
      args: [userAddress, environment.contractAddress],
    },
  );

  useEffect(() => {
    if (isGettingAllowance) return;
    let allowance: bigint | number;
    if (createOfferAllowance) {
      allowance = createOfferAllowance;
    } else {
      allowance = 0;
    }

    const allowanceValue = parseFloat(formatUnits(BigInt(allowance), tokenFromDecimals));
    const offerAmount = parseFloat(String(offerFromState.amount));

    if (Number.isNaN(allowanceValue) || Number.isNaN(offerAmount)) {
      return;
    }

    const filled = activeStep === OfferProgress.Filled;
    const approved = activeStep === OfferProgress.Approved;

    const isAllowanceSufficient = allowanceValue >= offerAmount;

    if (isAllowanceSufficient && filled) {
      setActiveStep(OfferProgress.Approved);
      setActiveOfferStep(2);
    } else if (!isAllowanceSufficient && approved) {
      setActiveStep(OfferProgress.Filled);
      setActiveOfferStep(1);
      setInputsDisabled(false);
    }
  }, [
    isGettingAllowance,
    refetchAllowance,
    createOfferAllowance,
    tokenFromDecimals,
    tokenFromAddress,
    offerFromState.amount,
    activeStep,
    setActiveStep,
    setActiveOfferStep,
    setInputsDisabled,
    userAddress,
    setOfferFromState,
  ]);

  return {
    refetchAllowance,
  };
};
