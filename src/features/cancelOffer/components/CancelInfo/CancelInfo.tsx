import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useToastifyContext } from '@berezka-dao/shared/components/PopupToast';
import { useGetOfferDetails } from '@berezka-dao/shared/retrieve-data/useGetOfferDetails';
import { Skeleton } from '@berezka-dao/shared/ui-kit/Skeleton';

import s from './CancelInfo.module.scss';

const CancelInfo = ({ cancelId }: { cancelId: string }) => {
  const { t } = useTranslation();
  const { handleAddItem } = useToastifyContext();
  const router = useRouter();

  const { tokenFrom, amountFrom, tokenTo, amountTo, isLoading, active, isCreator } = useGetOfferDetails({
    id: cancelId,
  });

  useEffect(() => {
    if (isLoading) return;

    if (!active) {
      handleAddItem({ title: t('error.message'), text: t('error.acceptedOrClosed'), type: 'error' });
      router.push('/offer/create');
    } else if (isCreator === false) {
      handleAddItem({ title: t('error.message'), text: t('error.notYour'), type: 'error' });
      router.push('/offer/create');
    }
  }, [active, isLoading, isCreator, handleAddItem, router, t]);

  return (
    <Skeleton loading={isLoading}>
      <div className={s.container}>
        <p className={s.text}>
          {t('offer.cancel.aboutTo')}:{' '}
          <span className={s.bold}>
            {amountTo} {tokenTo?.symbol} to {amountFrom} {tokenFrom?.symbol}.
          </span>
        </p>
        <p className={s.text}>
          {t('offer.cancel.after')}, {tokenFrom?.symbol} {t('offer.cancel.tokensWillBeSend')}
        </p>
      </div>
    </Skeleton>
  );
};

export { CancelInfo };
