import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { Address, erc20Abi, parseUnits } from 'viem';

import { GasIcon, SelectIcon } from '@assets/icons';
import { Button } from '@components/Button';
import { ProgressBar } from '@components/ProgressBar';
import { useButtonsDisabled } from '@components/CreateOffer/Bottom/hooks/useButtonsDisabled';
import { useTokenData } from '@components/CreateOffer/Bottom/hooks/useTokenData';
import { checkReceiver } from '@components/CreateOffer/Bottom/utils/checkReceiver';
import { CreateOfferState } from '@lib/constants';
import { env } from '@/env';
import { useOfferContext } from '@/context/offer/offer-context';
import { contractABI } from '@/contractABI';

import s from './OfferBottom.module.scss';

const OfferBottom = () => {
  const { t } = useTranslation();
  const { activeStep, setActiveStep, setActiveOfferStep, offerToState, offerFromState } = useOfferContext();
  const { approveButtonDisabled, createButtonDisabled } = useButtonsDisabled();
  const { tokenFromAddress, tokenToAddress, tokenFromDecimals, tokenToDecimals, isValid } = useTokenData();

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

  const { data: tradeReceipt, isLoading: isCreateTransactionLoading } = useWaitForTransactionReceipt({
    hash: tradeHash,
  });

  const approve = async () => {
    if (!isValid) return;
    approveContract({
      address: tokenFromAddress,
      abi: erc20Abi,
      functionName: 'approve',
      args: [env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address, parseUnits(String(offerFromState.amount), tokenFromDecimals)],
    });
  };

  const createTrade = async () => {
    if (!isValid) return;
    tradeContract({
      address: env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
      abi: contractABI,
      functionName: 'initiateTrade',
      args: [
        tokenFromAddress,
        tokenToAddress,
        parseUnits(String(offerFromState.amount), tokenFromDecimals),
        parseUnits(String(offerToState.amount), tokenToDecimals),
        checkReceiver(offerToState.receiver),
      ],
    });
  };

  useEffect(() => {
    //  TODO add error and loading handler
    if (approveError) {
      console.log(approveError);
    } else if (tradeError) {
      console.log(tradeError);
    }
  }, [approveError, tradeError]);

  useEffect(() => {
    if (approveReceipt) {
      setActiveStep(CreateOfferState.Approved);
      setActiveOfferStep(2);
    }
  }, [approveReceipt]);

  useEffect(() => {
    if (tradeReceipt) {
      setActiveStep(CreateOfferState.Created);
      setActiveOfferStep(3);
    }
  }, [tradeReceipt]);

  useEffect(() => {
    if (!approveButtonDisabled) {
      setActiveStep(CreateOfferState.Filled);
    } else {
      setActiveStep(CreateOfferState.None);
    }
  }, [approveButtonDisabled]);

  return (
    <div className={s.container}>
      <p className={s.label}>{t('offer.create.signText')}</p>
      <div className={s.buttonWrapper}>
        <div className={s.buttonContainer}>
          {activeStep !== CreateOfferState.Approved && activeStep !== CreateOfferState.Created && (
            <Button
              disabled={approveButtonDisabled || isApprovePending || isApproveTransactionLoading}
              type="button"
              onClick={approve}
            >
              {t('token.approve')}
            </Button>
          )}
          <Button
            disabled={createButtonDisabled || isTradePending || isCreateTransactionLoading}
            type="button"
            onClick={createTrade}
          >
            {t('token.create')}
          </Button>
        </div>
        <ProgressBar currentStep={activeStep} />
      </div>
      {activeStep !== CreateOfferState.None && (
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
