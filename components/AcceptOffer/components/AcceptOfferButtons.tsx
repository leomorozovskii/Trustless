'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Address, erc20Abi, formatUnits } from 'viem';
import { useAccount, useBalance, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { GasIcon, SelectIcon } from '@assets/icons';
import { trustlessOtcAbi } from '@assets/abis/trustlessOtcAbi';
import { Button } from '@components/Button';
import { ProgressBar } from '@components/ProgressBar';
import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { useTokenInfo } from '@components/AcceptOffer/hooks/useTokenInfo';
import { isDenied } from '@components/CreateOffer/Buttons/utils/utils';
import { useOfferAcceptContext } from '@context/offer/accept/OfferAcceptContext';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { OfferProgress } from '@lib/constants';
import { environment } from '@/environment';

import s from '@components/CreateOffer/Buttons/OfferButtons.module.scss';

const AcceptOfferButtons: React.FC = () => {
  const router = useRouter();
  const { activeAcceptStep, setActiveAcceptStep, acceptId, setTxHash } = useOfferAcceptContext();
  const { tokenTo, amountTo, active, isLoading } = useGetOfferDetails();
  const { address: userAddress } = useAccount();
  const { handleAddItem } = useToastifyContext();
  const { tokenDecimals } = useTokenInfo(tokenTo);

  useEffect(() => {
    if (!isLoading && !active) {
      handleAddItem({ title: 'Error', text: 'The offer was accepted or closed', type: 'error' });
      router.push('/offer/create');
    }
  }, [active, isLoading]);

  const {
    data: approveHash,
    error: approveError,
    isPending: isApprovePending,
    writeContract: approveContract,
  } = useWriteContract();

  const {
    data: acceptHash,
    error: acceptError,
    isPending: isAcceptPending,
    writeContract: acceptContract,
  } = useWriteContract();

  const { data: allowance } = useReadContract({
    address: tokenTo,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [userAddress as Address, environment.contractAddress],
  });

  const { data: balance } = useBalance({
    address: userAddress,
    token: tokenTo,
  });

  const { data: approveReceipt, isLoading: isApproveTransactionLoading } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  const { data: acceptReceipt, isLoading: isAcceptTransactionLoading } = useWaitForTransactionReceipt({
    hash: acceptHash,
  });

  const isGreater = () => {
    if (!balance) return;
    return Number(formatUnits(amountTo, tokenDecimals)) > Number(balance.formatted);
  };

  const approve = async () => {
    if (isGreater()) {
      handleAddItem({ title: 'Error', text: 'Insufficient balance', type: 'error' });
      return;
    }
    approveContract({
      address: tokenTo,
      abi: erc20Abi,
      functionName: 'approve',
      args: [environment.contractAddress, amountTo],
    });
  };

  const acceptTrade = async () => {
    if (!acceptId) return;
    acceptContract({
      address: environment.contractAddress,
      abi: trustlessOtcAbi,
      functionName: 'take',
      args: [BigInt(acceptId)],
    });
  };

  useEffect(() => {
    if (!allowance) return;
    if (allowance >= amountTo) {
      setActiveAcceptStep(OfferProgress.Approved);
    } else {
      setActiveAcceptStep(OfferProgress.Filled);
    }
  }, [allowance, amountTo]);

  useEffect(() => {
    if (approveError && !userAddress) {
      handleAddItem({ title: 'Error', text: 'Wallet is not connected', type: 'error' });
    } else if (approveError && isDenied(String(approveError.cause))) {
      handleAddItem({ title: 'Approve error', text: 'User denied the transaction', type: 'error' });
    } else if (approveError) {
      handleAddItem({ title: 'Approve error', text: String(approveError.cause), type: 'error' });
    }
  }, [approveError]);

  useEffect(() => {
    if (acceptError && !userAddress) {
      handleAddItem({ title: 'Error', text: 'Wallet is not connected', type: 'error' });
    } else if (acceptError && isDenied(String(acceptError.cause))) {
      handleAddItem({ title: 'Accept error', text: 'User denied the transaction', type: 'error' });
    } else if (acceptError) {
      handleAddItem({ title: 'Accept error', text: String(acceptError.cause), type: 'error' });
    }
  }, [acceptError]);

  useEffect(() => {
    if (approveReceipt) {
      handleAddItem({ title: 'Success', text: 'Tokens have been approved', type: 'success' });
      setActiveAcceptStep(OfferProgress.Approved);
    }
  }, [approveReceipt]);

  useEffect(() => {
    if (acceptReceipt) {
      handleAddItem({ title: 'Success', text: 'Trade has been accepted', type: 'success' });
      setTxHash(acceptReceipt.transactionHash);
      setActiveAcceptStep(OfferProgress.Created);
    }
  }, [acceptReceipt]);

  return (
    <div className={s.container}>
      <p className={s.label}>You will have to sign 2 transactions: Approval of token & Accept Trade</p>
      <div className={s.buttonWrapper}>
        <div className={s.buttonContainer}>
          {activeAcceptStep !== OfferProgress.Approved && (
            <Button
              disabled={!active}
              type="button"
              loading={isApproveTransactionLoading || isApprovePending}
              onClick={approve}
            >
              {isApprovePending || isApproveTransactionLoading ? 'Approving Token' : 'Approve Token'}
            </Button>
          )}
          <Button
            disabled={activeAcceptStep !== OfferProgress.Approved || !active}
            loading={isAcceptTransactionLoading || isAcceptPending}
            type="button"
            onClick={acceptTrade}
          >
            {isAcceptTransactionLoading || isAcceptPending ? 'Accepting Trade' : 'Accept Trade'}
          </Button>
        </div>
        <ProgressBar currentStep={activeAcceptStep} />
      </div>
      <div className={s.serviceContainer}>
        <p className={s.feeLabel}>Service Fee 0.01%</p>
        <div className={s.feeContainer}>
          <GasIcon />
          {/* TODO: calculate a real number */}
          <p className={s.feeLabel}>11.43%</p>
          <SelectIcon />
        </div>
      </div>
      <p className={s.terms}>
        By continuing, you accept <span className={s.conditions}>Terms & Conditions</span>
      </p>
    </div>
  );
};

export default AcceptOfferButtons;
