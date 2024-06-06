'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@components/Button';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { environment } from '@/environment';

import s from './ShareOfferContainer.module.scss';

interface IShareOfferContainer {
  offerId: number | null | string;
}

const ShareOfferContainer: React.FC<IShareOfferContainer> = ({ offerId }) => {
  const { t } = useTranslation();
  const { setActiveOfferStep } = useOfferCreateContext();
  const [copied, setCopied] = useState<boolean>(false);
  const { handleAddItem } = useToastifyContext();
  const [link, setLink] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined' && offerId) {
      setLink(`${environment.siteUrl}/offers/${offerId}`);
    }
  }, [offerId]);

  const handleCopy = () => {
    if (!link) return;
    navigator.clipboard.writeText(link);
    setActiveOfferStep(4);
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

export default ShareOfferContainer;
