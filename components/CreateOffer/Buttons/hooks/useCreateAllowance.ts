import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { useAccount, useReadContract } from 'wagmi';
import { useTokenData } from '@components/CreateOffer/Buttons/hooks/useTokenData';
import { Address, erc20Abi, formatUnits } from 'viem';
import { environment } from '@lib/environment';
import { useEffect } from 'react';
import { OfferProgress } from '@lib/constants';

interface IUseGetAllowance {
  approveReceipt: any;
}

export const useCreateAllowance = ({ approveReceipt }: IUseGetAllowance) => {
  const { offerFromState, activeStep, setActiveOfferStep, setActiveStep } = useOfferCreateContext();

  const { address: userAddress } = useAccount();
  const { tokenFromAddress, tokenFromDecimals } = useTokenData();

  const { data: createOfferAllowance } = useReadContract({
    address: tokenFromAddress,
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
};
