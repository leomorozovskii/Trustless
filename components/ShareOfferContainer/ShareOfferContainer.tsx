import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@components/Button';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';

import s from './ShareOfferContainer.module.scss';

const ShareOfferContainer = () => {
  const { t } = useTranslation();
  const { offerId, setActiveOfferStep } = useOfferCreateContext();
  const [copied, setCopied] = useState<boolean>(false);
  const { handleAddItem } = useToastifyContext();

  const link = useMemo(() => {
    if (typeof window === 'undefined') return;
    return `${window.location.origin}/offers/${offerId}`;
  }, [offerId]);

  const handleCopy = () => {
    console.log(window.location.origin);
    if (!link) return;
    navigator.clipboard.writeText(link);
    setActiveOfferStep(4);
    setCopied(true);
    if (!copied) {
      handleAddItem({ title: 'Link copied successfully', type: 'success' });
    }
    setTimeout(() => setCopied(false), 5000);
  };

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
