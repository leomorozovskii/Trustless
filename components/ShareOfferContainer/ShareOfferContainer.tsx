import React, { memo, useState } from 'react';

import { Button } from '@components/Button';
import { useOfferContext } from '@context/offer/OfferContext';

import s from './ShareOfferContainer.module.scss';

const ShareOfferContainer = () => {
  //  TODO get real offerId and change the link
  const { offerId, setActiveOfferStep } = useOfferContext();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`daowidgetlink.io/${offerId}`);
    setCopied(true);
    setActiveOfferStep(4);
    setTimeout(() => setCopied(false), 2000);
    console.log(copied);
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Share link</h2>
      <div className={s.container}>
        <p className={s.link}>daowidgetlink.io/{offerId}</p>
        <Button type="button" onClick={handleCopy}>
          Copy
        </Button>
      </div>
    </div>
  );
};

export default memo(ShareOfferContainer);
