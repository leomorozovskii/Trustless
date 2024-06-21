'use client';

import { useChainModal } from '@rainbow-me/rainbowkit';
import type { ComponentProps, FC, ReactNode } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Hash, TransactionReceipt } from 'viem';
import { TransactionReceiptNotFoundError } from 'viem';
import { useConfig } from 'wagmi';
import { waitForTransactionReceipt } from 'wagmi/actions';

import { useToastifyContext } from '@berezka-dao/shared/components/PopupToast';
import { useIsWrongNetwork } from '@berezka-dao/shared/hooks/useIsWrongNetwork';
import { Button } from '@berezka-dao/shared/ui-kit/Button';

type TxState = {
  isLoading: boolean;
};

type Props = Omit<ComponentProps<typeof Button>, 'onClick' | 'loading' | 'children'> & {
  children: ReactNode | ((txState: TxState) => ReactNode);
  errorTitle?: string;
  writeContract: () => Promise<Hash | undefined>;
  onReceipt?: (receipt: TransactionReceipt) => void;
  onError?: (e: unknown) => void;
};

const TxButton: FC<Props> = ({ writeContract, onError, onReceipt, children, disabled, errorTitle, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const wagmiConfig = useConfig();
  const { handleAddItem } = useToastifyContext();
  const isWrongNetwork = useIsWrongNetwork();
  const { openChainModal } = useChainModal();
  const { t } = useTranslation();
  const handleClick = async () => {
    if (isWrongNetwork) {
      return openChainModal?.();
    }
    setIsLoading(true);
    try {
      const hash = await writeContract();
      if (!hash) throw TransactionReceiptNotFoundError;
      const res = await waitForTransactionReceipt(wagmiConfig, {
        hash,
      });
      onReceipt?.(res);
    } catch (e) {
      if (e instanceof Error) {
        if (e.message.includes('User denied transaction')) {
          handleAddItem({ title: errorTitle || t('error.transactionError'), text: t('error.denied'), type: 'error' });
          return;
        }
        if (e.message === 'You are not the receiver. Change your wallet') {
          handleAddItem({
            title: errorTitle || t('error.transactionError'),
            text: 'You are not the receiver. Change your wallet',
            type: 'error',
          });
          return;
        }
        if (e.message === 'Insufficient balance') {
          handleAddItem({
            title: errorTitle || t('error.transactionError'),
            text: 'Insufficient balance',
            type: 'error',
          });
          return;
        }
        if (e.message.includes('insufficient funds')) {
          handleAddItem({
            title: errorTitle || t('error.transactionError'),
            text: t('error.insufficientFunds'),
            type: 'error',
          });
          return;
        }
      }
      if (onError) {
        onError(e);
        return;
      }
      handleAddItem({
        title: errorTitle || t('error.transactionError'),
        text: t('error.somethingWrong'),
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };
  const getContent = () => {
    if (isWrongNetwork) {
      return t('shared.wrongNetwork');
    }
    if (typeof children === 'function') {
      return children({ isLoading });
    }
    return children;
  };
  return (
    <Button {...props} disabled={!isWrongNetwork && disabled} onClick={handleClick} loading={isLoading}>
      {getContent()}
    </Button>
  );
};

export { TxButton };
