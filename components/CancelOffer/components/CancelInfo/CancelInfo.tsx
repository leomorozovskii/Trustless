import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Skeleton } from '@components/Skeleton';
import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { useTokenInfo } from '@components/AcceptOffer/hooks/useTokenInfo';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { useOfferCancelContext } from '@context/offer/cancel/OfferCancelContext';

import s from './CancelInfo.module.scss';

const CancelInfo = () => {
  const router = useRouter();
  const { handleAddItem } = useToastifyContext();
  const { cancelId } = useOfferCancelContext();
  const { tokenFrom, amountFrom, tokenTo, amountTo, isLoading, active, isCreator, isCreatorLoading } =
    useGetOfferDetails({
      id: cancelId,
    });

  const { tokenName: tokenFromName, tokenValue: tokenFromValue } = useTokenInfo({
    address: tokenFrom,
    amount: amountFrom,
    withFee: true,
  });

  const { tokenName: tokenToName, tokenValue: tokenToValue } = useTokenInfo({
    address: tokenTo,
    amount: amountTo,
  });

  useEffect(() => {
    if (!isLoading && !active) {
      handleAddItem({ title: 'Error', text: 'The offer was accepted or closed', type: 'error' });
      router.push('/offer/create');
    }
  }, [active, isLoading]);

  useEffect(() => {
    if (!isLoading && !isCreator && !isCreatorLoading) {
      handleAddItem({ title: 'Error', text: 'This is not your offer', type: 'error' });
      router.push('/offer/create');
    }
  }, [isLoading, isCreator, isCreatorLoading]);

  return (
    <Skeleton loading={isLoading}>
      <div className={s.container}>
        <p className={s.text}>
          You are about to cancel the following offer:{' '}
          <span className={s.bold}>
            {tokenToValue} {tokenToName} to {tokenFromValue} {tokenFromName}.
          </span>
        </p>
        <p className={s.text}>After cancelling, MKR tokens will be send back to your wallet.</p>
      </div>
    </Skeleton>
  );
};

export default CancelInfo;
