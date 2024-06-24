'use client';

import type { Dispatch, FC, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';

import { environment } from '@berezka-dao/core/environment';
import { useToastifyContext } from '@berezka-dao/shared/components/PopupToast';
import { Button } from '@berezka-dao/shared/ui-kit/Button';

import s from './ShareOfferContainer.module.scss';

type Props = {
  offerId: number | null | string;
  setActiveOfferStep?: Dispatch<SetStateAction<number>>;
};

const ShareOfferContainer: FC<Props> = ({ offerId, setActiveOfferStep }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState<boolean>(false);
  const { handleAddItem } = useToastifyContext();
  const [link, setLink] = useState<string | undefined>(undefined);

  useEffect(() => {
    setLink(`${environment.siteUrl}/offers/${offerId}`);
  }, [offerId]);

  const handleCopy = () => {
    try {
      if (setActiveOfferStep) setActiveOfferStep(4);
      setCopied(true);
      if (!copied) {
        handleAddItem({ title: 'Link copied successfully', type: 'success' });
      }
      setTimeout(() => setCopied(false), 5000);
    } catch (e) {
      handleAddItem({ title: 'Error while copying link ', type: 'error' });
    }
  };

  if (!link) return;

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Share link</h2>
      <div className={s.container}>
        <p className={s.link}>{link}</p>
        <CopyToClipboard text={link} onCopy={handleCopy}>
          <Button type="button">{t('offer.share.copy')}</Button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export { ShareOfferContainer };
