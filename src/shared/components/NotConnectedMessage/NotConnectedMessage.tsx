import Image from 'next/image';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import pic_login from '@public/images/pic_login.png';

import { ConnectWallet } from '@berezka-dao/shared/components/ConnectWallet';

import s from './NotConnectedMessage.module.scss';

const NotConnectedMessage: FC = () => {
  const { t } = useTranslation();
  return (
    <div className={s.container}>
      <span className={s.message}>{t('shared.notConnectedMessage')}</span>
      <div className={s.connectWallet}>
        <ConnectWallet />
      </div>
      <Image src={pic_login} alt="login image" width={600} height={360} />
    </div>
  );
};

export { NotConnectedMessage };
