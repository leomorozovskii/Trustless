import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount, useBalance, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { Address, erc20Abi, formatUnits, parseUnits } from 'viem';

import { GasIcon, SelectIcon } from '@assets/icons';
import { Button } from '@components/Button';
import { ProgressBar } from '@components/ProgressBar';
import { useButtonsDisabled } from '@components/CreateOffer/Bottom/hooks/useButtonsDisabled';
import { useTokenData } from '@components/CreateOffer/Bottom/hooks/useTokenData';
import { checkAddress } from '@components/CreateOffer/Bottom/utils/utils';
import { CreateOfferState } from '@lib/constants';
import { environment } from '@/environment';
import { useOfferContext } from '@context/offer/OfferContext';
import { contractABI } from '@/contractABI';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { useOfferErrors } from '@components/CreateOffer/Bottom/hooks/useOfferErrors';

import s from './OfferBottom.module.scss';

const OfferBottom = () => {
  const { t } = useTranslation();
  const { handleAddItem } = useToastifyContext();
  const { activeStep, setActiveStep, setActiveOfferStep, offerToState, offerFromState, setOfferFromState } =
    useOfferContext();
  const { tokenFromAddress, tokenToAddress, tokenFromDecimals, tokenToDecimals, isValid } = useTokenData();
  const { approveButtonDisabled, createButtonDisabled } = useButtonsDisabled();
  const { address: userAddress } = useAccount();

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

  const { data: allowance } = useReadContract({
    address: tokenFromAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [userAddress as Address, environment.contractAddress as Address],
  });

  const { data: approveReceipt, isLoading: isApproveTransactionLoading } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  const { data: tradeReceipt, isLoading: isCreateTransactionLoading } = useWaitForTransactionReceipt({
    hash: tradeHash,
  });

  const { data: balance } = useBalance({
    address: userAddress,
    token: tokenFromAddress,
  });

  useOfferErrors({ approveError, approveReceipt, tradeError, tradeReceipt });

  const checkBalance = useCallback(() => {
    if (!balance) return;
    return offerFromState.amount > Number(balance.formatted);
  }, [tokenFromAddress, balance, offerFromState.amount]);

  const approve = async () => {
    if (!isValid) return;
    const isGreater = checkBalance();
    if (isGreater) {
      handleAddItem({ title: t('error.state'), text: t('error.somethingWrong'), type: 'error' });
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
      abi: contractABI,
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
      setActiveStep(CreateOfferState.Filled);
    } else {
      setActiveStep(CreateOfferState.None);
    }
  }, [approveButtonDisabled]);

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
