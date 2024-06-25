'use client';

import type { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import { environment } from '@berezka-dao/core/environment';
import { Button } from '@berezka-dao/shared/ui-kit/Button';
import { CopyText } from '@berezka-dao/shared/ui-kit/CopyText';

import s from './ShareOfferContainer.module.scss';

type Props = {
  offerId: number | string;
  setActiveOfferStep?: Dispatch<SetStateAction<number>>;
};

const ShareOfferContainer: FC<Props> = ({ offerId, setActiveOfferStep }) => {
  const { t } = useTranslation();

  const handleCopy = () => {
    if (setActiveOfferStep) setActiveOfferStep(4);
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Share link</h2>
      <div className={s.container}>
        <p className={s.link}>{`${environment.siteUrl}/offers/${offerId}`}</p>
        <CopyText
          text={`${environment.siteUrl}/offers/${offerId}`}
          successMessage={'Link copied successfully'}
          onCopy={handleCopy}
        >
          <Button type="button">{t('offer.share.copy')}</Button>
        </CopyText>
      </div>
    </div>
  );
};

export { ShareOfferContainer };
