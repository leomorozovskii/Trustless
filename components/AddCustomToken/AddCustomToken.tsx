import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AddTokenPopup from '@components/AddTokenPopup/AddTokenPopup';

import { useAccount } from 'wagmi';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import s from './AddCustomToken.module.scss';

interface IAddCustomToken {
  type: 'from' | 'to';
}

const AddCustomToken: React.FC<IAddCustomToken> = ({ type }) => {
  const { t } = useTranslation();
  const { handleAddItem } = useToastifyContext();
  const [opened, setOpened] = useState<boolean>(false);
  const { address } = useAccount();

  const openModal = useCallback(() => {
    if (!address) {
      handleAddItem({ title: 'Error', text: 'Wallet is not connected', type: 'error' });
    } else {
      setOpened(true);
    }
  }, [address]);

  return (
    <div>
      <button onClick={openModal}>
        <p className={s.label}>+ {t('offer.create.addToken')}</p>
      </button>
      {opened && <AddTokenPopup setOpened={setOpened} type={type} />}
    </div>
  );
};

export default memo(AddCustomToken);
