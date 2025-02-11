import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Address } from 'viem';
import { useAccount } from 'wagmi';

import { useToastifyContext } from '@berezka-dao/shared/components/PopupToast';

import s from './AddCustomToken.module.scss';
import { useOfferCreateContext } from '../../store';
import { AddTokenPopup } from '../AddTokenPopup';

type Props = {
  onProceed(decimals: number, address?: Address, symbol?: string): void;
};

const AddCustomToken: FC<Props> = ({ onProceed }) => {
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
      {opened && <AddTokenPopup onClose={() => setOpened(false)} onProceed={onProceed} />}
    </div>
  );
};

export { AddCustomToken };
