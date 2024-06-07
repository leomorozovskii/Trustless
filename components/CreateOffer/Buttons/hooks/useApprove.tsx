import { useTranslation } from 'react-i18next';
import { erc20Abi, formatUnits, parseUnits } from 'viem';
import { useAccount, useBalance, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { useTokenInfo } from '@components/AcceptOffer/hooks/useTokenInfo';
import { useTokenData } from '@components/CreateOffer/Buttons/hooks/useTokenData';
import { useGetBalanceGreater } from '@components/CreateOffer/Buttons/hooks/useGetBalanceGreater';
import { useGetAllowance } from '@components/CreateOffer/Buttons/hooks/useGetAllowance';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { useOfferAcceptContext } from '@context/offer/accept/OfferAcceptContext';
import { OfferProgress } from '@lib/constants';
import { environment } from '@lib/environment';

export const useApprove = () => {
  const { t } = useTranslation();
  const { handleAddItem } = useToastifyContext();
  const { address: userAddress } = useAccount();
  const { setActiveAcceptStep } = useOfferAcceptContext();
  const { setInputsDisabled, setActiveStep, setActiveOfferStep, setOfferFromState, offerFromState } =
    useOfferCreateContext();

  const { tokenTo, amountTo } = useGetOfferDetails();
  const { tokenDecimals } = useTokenInfo({ address: tokenTo });
  const { isValid, tokenFromAddress, tokenFromDecimals } = useTokenData();

  const { data: balance } = useBalance({ address: userAddress, token: tokenTo });
  const { isGreater: isCreateApproveGreater } = useGetBalanceGreater();

  const { data: approveHash, writeContractAsync: approveContract } = useWriteContract();
  const { data: approveReceipt } = useWaitForTransactionReceipt({ hash: approveHash });

  useGetAllowance({ approveReceipt });

  const isGreater = () => {
    if (!balance) return false;
    return Number(formatUnits(amountTo, tokenDecimals)) > Number(balance.formatted);
  };

  const onCreateApproveReceipt = () => {
    setInputsDisabled(true);
    handleAddItem({ title: t('success.message'), text: t('success.approved'), type: 'success' });
    setActiveStep(OfferProgress.Approved);
    setActiveOfferStep(2);
  };

  const onAcceptApproveReceipt = () => {
    handleAddItem({ title: 'Success', text: 'Tokens have been approved', type: 'success' });
    setActiveAcceptStep(OfferProgress.Approved);
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

  const acceptApproveHandler = async () => {
    if (isGreater()) {
      handleAddItem({ title: 'Error', text: 'Insufficient balance', type: 'error' });
      return;
    }
    return approveContract({
      address: tokenTo,
      abi: erc20Abi,
      functionName: 'approve',
      args: [environment.contractAddress, amountTo],
    });
  };

  return {
    createApproveHandler,
    onCreateApproveReceipt,
    acceptApproveHandler,
    onAcceptApproveReceipt,
    approveReceipt,
  };
};
