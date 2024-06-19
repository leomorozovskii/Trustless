'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { environment } from '@berezka-dao/core/environment';
import { useToastifyContext } from '@berezka-dao/shared/components/PopupToast';
import { Button } from '@berezka-dao/shared/ui-kit/Button';

import s from './ShareOfferContainer.module.scss';

interface IShareOfferContainer {
  offerId: number | null | string;
  setActiveOfferStep?: React.Dispatch<React.SetStateAction<number>>;
}

const ShareOfferContainer: React.FC<IShareOfferContainer> = ({ offerId, setActiveOfferStep }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState<boolean>(false);
  const { handleAddItem } = useToastifyContext();
  const [link, setLink] = useState<string | undefined>(undefined);

  useEffect(() => {
    setLink(`${environment.siteUrl}/offers/${offerId}`);
  }, [offerId]);

  const handleCopy = () => {
    if (!link) return;
    navigator.clipboard.writeText(link);
    if (setActiveOfferStep) setActiveOfferStep(4);
    setCopied(true);
    if (!copied) {
      handleAddItem({ title: 'Link copied successfully', type: 'success' });
    }
    setTimeout(() => setCopied(false), 5000);
  };

  if (!link) return;

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Share link</h2>
      <div className={s.container}>
        <p className={s.link}>{link}</p>
        <Button type="button" onClick={handleCopy}>
          {t('offer.share.copy')}
        </Button>
      </div>
    </div>
  );
};

export { ShareOfferContainer };
