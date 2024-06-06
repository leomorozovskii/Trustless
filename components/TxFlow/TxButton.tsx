'use client';

import { Button } from '@components/Button';
import { waitForTransactionReceipt } from 'wagmi/actions';
import React from 'react';
import { useConfig } from 'wagmi';
import { Hash, TransactionReceipt, TransactionReceiptNotFoundError } from 'viem';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { useTranslation } from 'react-i18next';
import { useIsWrongNetwork } from '@lib/hooks/useIsWrongNetwork';
import { useChainModal } from '@rainbow-me/rainbowkit';

type TxState = {
  isLoading: boolean;
};

type Props = Omit<React.ComponentProps<typeof Button>, 'onClick' | 'loading' | 'children'> & {
  children: React.ReactNode | ((txState: TxState) => React.ReactNode);
  errorTitle?: string;
  writeContract: () => Promise<Hash | undefined>;
  onReceipt?: (receipt: TransactionReceipt) => void;
  onError?: (e: unknown) => void;
};

const TxButton: React.FC<Props> = ({ writeContract, onError, onReceipt, children, disabled, errorTitle, ...props }) => {
  const [isLoading, setIsLoading] = React.useState(false);
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
