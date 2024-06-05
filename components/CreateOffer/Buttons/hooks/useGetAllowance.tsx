import { useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { Address, erc20Abi, formatUnits } from 'viem';

import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { useTokenData } from '@components/CreateOffer/Buttons/hooks/useTokenData';
import { OfferProgress } from '@lib/constants';
import { environment } from '@/environment';

interface IUseGetAllowance {
  approveReceipt: any;
}

export const useGetAllowance = ({ approveReceipt }: IUseGetAllowance) => {
  const { address: userAddress } = useAccount();
  const { tokenFromAddress, tokenFromDecimals } = useTokenData();
  const { offerFromState, activeStep, setActiveOfferStep, setActiveStep } = useOfferCreateContext();

  const { data: allowance } = useReadContract({
    address: tokenFromAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [userAddress as Address, environment.contractAddress],
  });

  useEffect(() => {
    if (!allowance) return;

    const allowanceValue = parseFloat(formatUnits(allowance, tokenFromDecimals));
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
  }, [allowance, tokenFromDecimals, offerFromState.amount, activeStep, approveReceipt]);
};
