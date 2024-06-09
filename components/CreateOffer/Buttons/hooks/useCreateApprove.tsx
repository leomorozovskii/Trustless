import { useTranslation } from 'react-i18next';
import { erc20Abi, parseUnits } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

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

  const { isGreater: isCreateApproveGreater } = useGetBalanceGreater({
    tokenAddress: tokenFromAddress,
    tokenAmount: offerFromState.amount,
  });

  const { data: approveHash, writeContractAsync: approveContract } = useWriteContract();
  const { data: approveReceipt } = useWaitForTransactionReceipt({ hash: approveHash });

  useCreateAllowance({ approveReceipt });

  const onCreateApproveReceipt = () => {
    setInputsDisabled(true);
    handleAddItem({ title: t('success.message'), text: t('success.approved'), type: 'success' });
    setActiveStep(OfferProgress.Approved);
    setActiveOfferStep(2);
  };

  const createApproveHandler = async () => {
    if (!isValid) return;
    if (isCreateApproveGreater()) {
      setOfferFromState({ amountError: t('error.insufficientBalance') });
      return;
    }
    setOfferFromState({ amountError: '' });
    return approveContract({
      address: tokenFromAddress,
      abi: erc20Abi,
      functionName: 'approve',
      args: [environment.contractAddress, parseUnits(String(offerFromState.amount), tokenFromDecimals)],
    });
  };

  return {
    createApproveHandler,
    onCreateApproveReceipt,
  };
};
