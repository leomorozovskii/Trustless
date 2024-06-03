import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';

import AddTokenPopup from '@components/AddTokenPopup/AddTokenPopup';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { useOfferContext } from '@context/offer/OfferContext';

import s from './AddCustomToken.module.scss';

interface IAddCustomToken {
  type: 'from' | 'to';
}

const AddCustomToken: React.FC<IAddCustomToken> = ({ type }) => {
  const { t } = useTranslation();
  const { handleAddItem } = useToastifyContext();
  const { inputsDisabled } = useOfferContext();
  const [opened, setOpened] = useState<boolean>(false);
  const { address } = useAccount();

  const openModal = useCallback(() => {
    if (!address) {
      handleAddItem({ title: t('error.message'), text: t('error.walletNotConnected'), type: 'error' });
    } else {
      setOpened(true);
    }
  }, [address]);

  const handleOpen = () => {
    if (inputsDisabled) return;
    openModal();
  };

  return (
    <div>
      <button onClick={handleOpen}>
        <p className={s.label}>+ {t('offer.create.addToken')}</p>
      </button>
      {opened && <AddTokenPopup setOpened={setOpened} type={type} />}
    </div>
  );
};

export default memo(AddCustomToken);
