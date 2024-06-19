import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { erc20Abi, maxUint256, parseUnits } from 'viem';
import { useAccount, useWriteContract } from 'wagmi';

import { environment } from '@berezka-dao/core/environment';
import { useOfferCreateContext } from '@berezka-dao/features/createOffer/store';
import { OfferProgress } from '@berezka-dao/features/createOffer/types';
import { useToastifyContext } from '@berezka-dao/shared/components/PopupToast';

import { useCreateAllowance } from './useCreateAllowance';
import { useGetBalanceGreater } from './useGetBalanceGreater';

export const useCreateApprove = () => {
  const { t } = useTranslation();
  const { handleAddItem } = useToastifyContext();
  const { setInputsDisabled, setActiveStep, setActiveOfferStep, setOfferFromState, offerFromState } =
    useOfferCreateContext();

  const { address } = useAccount();

  const { isGreater: isCreateApproveGreater } = useGetBalanceGreater({
    tokenAddress: offerFromState.from,
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

  const createApproveRequest = useMemo(() => {
    if (!address || !offerFromState.from || !offerFromState.amount || !offerFromState.decimals) return;
    if (isCreateApproveGreater() && !offerFromState.isInfinite) return;

    let amount;
    try {
      amount = offerFromState.isInfinite ? maxUint256 : parseUnits(offerFromState.amount, offerFromState.decimals);
    } catch (e) {
      amount = BigInt(0);
    }

    return {
      address: offerFromState.from,
      abi: erc20Abi,
      functionName: 'approve',
      args: [environment.contractAddress, amount],
      account: address,
    };
  }, [
    address,
    offerFromState.from,
    offerFromState.amount,
    offerFromState.decimals,
    offerFromState.isInfinite,
    isCreateApproveGreater,
  ]);

  const createApproveHandler = async () => {
    if (!offerFromState.from || !offerFromState.decimals) return;
    if (isCreateApproveGreater() && !offerFromState.isInfinite) {
      setOfferFromState({ amountError: t('error.insufficientBalance') });
      throw new Error('Insufficient balance');
    }
    setOfferFromState({ amountError: '' });
    const amount = offerFromState.isInfinite
      ? maxUint256
      : parseUnits(String(offerFromState.amount), offerFromState.decimals);

    return approveContract({
      address: offerFromState.from,
      abi: erc20Abi,
      functionName: 'approve',
      args: [environment.contractAddress, amount],
    });
  };

  return {
    createApproveHandler,
    onCreateApproveReceipt,
    createApproveRequest,
  };
};
