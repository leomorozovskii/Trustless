import { useAccount, useReadContract } from 'wagmi';
import { Address, erc20Abi, formatUnits } from 'viem';
import { environment } from '@/environment';
import { useTokenData } from '@components/CreateOffer/Bottom/hooks/useTokenData';
import { useEffect } from 'react';
import { CreateOfferState } from '@lib/constants';
import { useOfferContext } from '@context/offer/OfferContext';

interface IUseGetAllowance {
  approveReceipt: any;
}

export const useGetAllowance = ({ approveReceipt }: IUseGetAllowance) => {
  const { address: userAddress } = useAccount();
  const { tokenFromAddress, tokenFromDecimals } = useTokenData();
  const { offerFromState, activeStep, setActiveOfferStep, setActiveStep } = useOfferContext();

  const { data: allowance } = useReadContract({
    address: tokenFromAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [userAddress as Address, environment.contractAddress as Address],
  });

  useEffect(() => {
    if (!allowance) return;
    const allowanceValue = formatUnits(allowance, tokenFromDecimals);
    const isAllowanceSufficient = Number(allowanceValue) >= offerFromState.amount;

    if (isAllowanceSufficient && activeStep === CreateOfferState.Filled && !approveReceipt) {
      setActiveStep(CreateOfferState.Approved);
      setActiveOfferStep(2);
    } else if (!isAllowanceSufficient && activeStep === CreateOfferState.Approved && !approveReceipt) {
      setActiveStep(CreateOfferState.Filled);
      setActiveOfferStep(1);
    }
  }, [allowance, tokenFromDecimals, offerFromState.amount, activeStep, approveReceipt]);
};
