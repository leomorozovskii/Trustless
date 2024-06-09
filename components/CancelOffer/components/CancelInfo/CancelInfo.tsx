import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Skeleton } from '@components/Skeleton';
import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { useTokenInfo } from '@components/AcceptOffer/hooks/useTokenInfo';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';

import s from './CancelInfo.module.scss';

const CancelInfo = ({ cancelId }: { cancelId: string }) => {
  const router = useRouter();
  const { handleAddItem } = useToastifyContext();

  const [isMounted, setIsMounted] = useState<boolean>(false);

  const { tokenFrom, amountFrom, tokenTo, amountTo, isLoading, active, isCreator } = useGetOfferDetails({
    id: String(cancelId),
  });

  const { tokenName: tokenFromName, tokenValue: tokenFromValue } = useTokenInfo({
    address: tokenFrom,
    amount: amountFrom,
  });

  const { tokenName: tokenToName, tokenValue: tokenToValue } = useTokenInfo({
    address: tokenTo,
    amount: amountTo,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || isLoading) return;

    if (!active) {
      handleAddItem({ title: 'Error', text: 'The offer was accepted or closed', type: 'error' });
      router.push('/offer/create');
    } else if (isCreator === false) {
      handleAddItem({ title: 'Error', text: 'This is not your offer', type: 'error' });
      router.push('/offer/create');
    }
  }, [active, isLoading, isCreator, isMounted]);

  return (
    <Skeleton loading={isLoading}>
      <div className={s.container}>
        <p className={s.text}>
          You are about to cancel the following offer:{' '}
          <span className={s.bold}>
            {tokenToValue} {tokenToName} to {tokenFromValue} {tokenFromName}.
          </span>
        </p>
        <p className={s.text}>After cancelling, {tokenFromName} tokens will be send back to your wallet.</p>
      </div>
    </Skeleton>
  );
};

export default CancelInfo;
