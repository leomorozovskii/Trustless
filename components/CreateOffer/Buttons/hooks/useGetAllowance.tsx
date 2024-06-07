import { useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { Address, erc20Abi, formatUnits } from 'viem';

import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { useTokenData } from '@components/CreateOffer/Buttons/hooks/useTokenData';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { useOfferAcceptContext } from '@context/offer/accept/OfferAcceptContext';
import { OfferProgress } from '@lib/constants';
import { environment } from '@lib/environment';

interface IUseGetAllowance {
  approveReceipt: any;
}

export const useGetAllowance = ({ approveReceipt }: IUseGetAllowance) => {
  const { setActiveAcceptStep } = useOfferAcceptContext();
  const { offerFromState, activeStep, setActiveOfferStep, setActiveStep } = useOfferCreateContext();

  const { address: userAddress } = useAccount();
  const { tokenFromAddress, tokenFromDecimals } = useTokenData();
  const { amountTo, tokenTo } = useGetOfferDetails();

  const { data: createOfferAllowance } = useReadContract({
    address: tokenFromAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [userAddress as Address, environment.contractAddress],
  });

  const { data: acceptOfferAllowance } = useReadContract({
    address: tokenTo,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [userAddress as Address, environment.contractAddress],
  });

  useEffect(() => {
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

    const isAllowanceSufficient = allowanceValue >= offerAmount;

    if (isAllowanceSufficient && activeStep === OfferProgress.Filled && !approveReceipt && offerFromState.amount) {
      setActiveStep(OfferProgress.Approved);
      setActiveOfferStep(2);
    } else if (
      (!isAllowanceSufficient && activeStep === OfferProgress.Approved && !approveReceipt) ||
      !offerFromState.amount
    ) {
      setActiveStep(OfferProgress.Filled);
      setActiveOfferStep(1);
    }
  }, [createOfferAllowance, tokenFromDecimals, tokenFromAddress, offerFromState.amount, activeStep, approveReceipt]);

  useEffect(() => {
    if (!acceptOfferAllowance) return;
    if (acceptOfferAllowance >= amountTo) {
      setActiveAcceptStep(OfferProgress.Approved);
    } else {
      setActiveAcceptStep(OfferProgress.Filled);
    }
  }, [acceptOfferAllowance, amountTo]);
};
