import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';

import { AddTokenPopup } from '@berezka-dao/features/createOffer/components/AddTokenPopup';
import { useOfferCreateContext } from '@berezka-dao/features/createOffer/store';
import { useToastifyContext } from '@berezka-dao/shared/components/PopupToast';

import s from './AddCustomToken.module.scss';

type Props = {
  type: 'from' | 'to';
};

const AddCustomToken: FC<Props> = ({ type }) => {
  const { t } = useTranslation();
  const { handleAddItem } = useToastifyContext();
  const { inputsDisabled } = useOfferCreateContext();
  const { address } = useAccount();

  const [opened, setOpened] = useState<boolean>(false);

  const openModal = useCallback(() => {
    if (!address) {
      handleAddItem({ title: t('error.message'), text: t('error.walletNotConnected'), type: 'error' });
    } else {
      setOpened(true);
    }
  }, [address, handleAddItem, t]);

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

export { AddCustomToken };
