import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@components/Button';
import { useOfferContext } from '@context/offer/OfferContext';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';

import s from './ShareOfferContainer.module.scss';

const ShareOfferContainer = () => {
  const { t } = useTranslation();
  const { offerId, setActiveOfferStep } = useOfferContext();
  const [copied, setCopied] = useState<boolean>(false);
  const { handleAddItem } = useToastifyContext();

  const handleCopy = () => {
    navigator.clipboard.writeText(`daowidgetlink.io/${offerId}`);
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
        <p className={s.link}>daowidgetlink.io/{offerId}</p>
        <Button type="button" onClick={handleCopy}>
          {t('offer.share.copy')}
        </Button>
      </div>
    </div>
  );
};

export default memo(ShareOfferContainer);
