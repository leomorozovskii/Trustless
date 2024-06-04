import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { Address, erc20Abi, parseUnits } from 'viem';

import { GasIcon, SelectIcon } from '@assets/icons';
import { trustlessOtcAbi } from '@assets/abis/trustlessOtcAbi';
import { Button } from '@components/Button';
import { ProgressBar } from '@components/ProgressBar';
import { useButtonsDisabled } from '@components/CreateOffer/Bottom/hooks/useButtonsDisabled';
import { useGetBalanceGreater } from '@components/CreateOffer/Bottom/hooks/useGetBalanceGreater';
import { useGetAllowance } from '@components/CreateOffer/Bottom/hooks/useGetAllowance';
import { useTokenData } from '@components/CreateOffer/Bottom/hooks/useTokenData';
import { useOfferErrors } from '@components/CreateOffer/Bottom/hooks/useOfferErrors';
import { checkAddress } from '@components/CreateOffer/Bottom/utils/utils';
import { useOfferContext } from '@context/offer/OfferContext';
import { OfferProgress } from '@lib/constants';
import { environment } from '@/environment';

import s from './OfferBottom.module.scss';

const OfferBottom = () => {
  const { t } = useTranslation();
  const { activeStep, setActiveStep, offerToState, offerFromState, setOfferFromState } = useOfferContext();
  const { tokenFromAddress, tokenToAddress, tokenFromDecimals, tokenToDecimals, isValid } = useTokenData();
  const { approveButtonDisabled, createButtonDisabled } = useButtonsDisabled();
  const {
    data: approveHash,
    error: approveError,
    isPending: isApprovePending,
    writeContract: approveContract,
  } = useWriteContract();

  const {
    data: tradeHash,
    error: tradeError,
    isPending: isTradePending,
    writeContract: tradeContract,
  } = useWriteContract();

  const { data: approveReceipt, isLoading: isApproveTransactionLoading } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  useGetAllowance({ approveReceipt });

  const { isGreater } = useGetBalanceGreater();

  const { data: tradeReceipt, isLoading: isCreateTransactionLoading } = useWaitForTransactionReceipt({
    hash: tradeHash,
  });

  useOfferErrors({ approveError, approveReceipt, tradeError, tradeReceipt });

  const approve = async () => {
    if (!isValid) return;
    if (isGreater()) {
      setOfferFromState({ amountError: t('error.insufficientBalance') });
      return;
    }
    setOfferFromState({ amountError: '' });
    approveContract({
      address: tokenFromAddress,
      abi: erc20Abi,
      functionName: 'approve',
      args: [environment.contractAddress as Address, parseUnits(String(offerFromState.amount), tokenFromDecimals)],
    });
  };

  const createTrade = async () => {
    if (!isValid) return;
    tradeContract({
      address: environment.contractAddress as Address,
      abi: trustlessOtcAbi,
      functionName: 'initiateTrade',
      args: [
        tokenFromAddress,
        tokenToAddress,
        parseUnits(String(offerFromState.amount), tokenFromDecimals),
        parseUnits(String(offerToState.amount), tokenToDecimals),
        checkAddress(offerToState.receiver),
      ],
    });
  };

  useEffect(() => {
    if (!approveButtonDisabled) {
      setActiveStep(OfferProgress.Filled);
    } else {
      setActiveStep(OfferProgress.None);
    }
  }, [approveButtonDisabled]);

  return (
    <div className={s.container}>
      <p className={s.label}>{t('offer.create.signText')}</p>
      <div className={s.buttonWrapper}>
        <div className={s.buttonContainer}>
          {activeStep !== OfferProgress.Approved && activeStep !== OfferProgress.Created && (
            <Button
              disabled={approveButtonDisabled}
              type="button"
              loading={isApprovePending || isApproveTransactionLoading}
              onClick={approve}
            >
              {isApprovePending || isApproveTransactionLoading ? t('token.approving') : t('token.approve')}
            </Button>
          )}
          <Button
            disabled={createButtonDisabled}
            loading={isTradePending || isCreateTransactionLoading}
            type="button"
            onClick={createTrade}
          >
            {isTradePending || isCreateTransactionLoading ? t('token.creating') : t('token.create')}
          </Button>
        </div>
        <ProgressBar currentStep={activeStep} />
      </div>
      {activeStep !== OfferProgress.None && (
        <div className={s.serviceContainer}>
          <p className={s.feeLabel}>{`${t('offer.create.fee')} 0.01%`}</p>
          <div className={s.feeContainer}>
            <GasIcon />
            {/* TODO: calculate a real number */}
            <p className={s.feeLabel}>11.43%</p>
            <SelectIcon />
          </div>
        </div>
      )}
      <p className={s.terms}>
        {t('offer.create.acceptTerms')} <span className={s.conditions}>{t('offer.create.termsConditions')}</span>
      </p>
    </div>
  );
};

export default OfferBottom;
