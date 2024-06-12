import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { erc20Abi, maxUint256, parseUnits } from 'viem';
import { useAccount, useWriteContract } from 'wagmi';

import { useTokenData } from '@components/CreateOffer/Buttons/hooks/useTokenData';
import { useGetBalanceGreater } from '@components/CreateOffer/Buttons/hooks/useGetBalanceGreater';
import { useCreateAllowance } from '@components/CreateOffer/Buttons/hooks/useCreateAllowance';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { OfferProgress } from '@lib/constants';
import { environment } from '@lib/environment';

export const useCreateApprove = () => {
  const { t } = useTranslation();
  const { handleAddItem } = useToastifyContext();
  const { setInputsDisabled, setActiveStep, setActiveOfferStep, setOfferFromState, offerFromState } =
    useOfferCreateContext();

  const { isValid, tokenFromAddress, tokenFromDecimals } = useTokenData();
  const { address } = useAccount();

  const { isGreater: isCreateApproveGreater } = useGetBalanceGreater({
    tokenAddress: tokenFromAddress,
    tokenAmount: offerFromState.amount,
  });

  const { refetchAllowance } = useCreateAllowance();

  const { writeContractAsync: approveContract } = useWriteContract();

  useEffect(() => {
    setInputsDisabled(false);
  }, [address, setInputsDisabled]);

  const onCreateApproveReceipt = async () => {
    await refetchAllowance();
    setInputsDisabled(true);
    handleAddItem({ title: t('success.message'), text: t('success.approved'), type: 'success' });
    setActiveStep(OfferProgress.Approved);
    setActiveOfferStep(2);
  };

  const memoizedApproveRequest = useMemo(() => {
    if (!tokenFromAddress || !offerFromState.amount || !address) return;
    if (isCreateApproveGreater() && !offerFromState.isInfinite) return;

    let amount;
    try {
      amount = offerFromState.isInfinite ? maxUint256 : parseUnits(String(offerFromState.amount), tokenFromDecimals);
    } catch (e) {
      amount = BigInt(0);
    }

    return {
      address: tokenFromAddress,
      abi: erc20Abi,
      functionName: 'approve',
      args: [environment.contractAddress, amount],
      account: address,
    };
  }, [
    tokenFromAddress,
    offerFromState.amount,
    offerFromState.isInfinite,
    address,
    isCreateApproveGreater,
    tokenFromDecimals,
  ]);

  const createApproveHandler = async () => {
    if (!isValid) return;
    if (isCreateApproveGreater() && !offerFromState.isInfinite) {
      setOfferFromState({ amountError: t('error.insufficientBalance') });
      throw new Error('Insufficient balance');
    }
    setOfferFromState({ amountError: '' });
    const amount = offerFromState.isInfinite
      ? maxUint256
      : parseUnits(String(offerFromState.amount), tokenFromDecimals);
    return approveContract({
      address: tokenFromAddress,
      abi: erc20Abi,
      functionName: 'approve',
      args: [environment.contractAddress, amount],
    });
  };

  return {
    createApproveHandler,
    onCreateApproveReceipt,
    memoizedApproveRequest,
  };
};
