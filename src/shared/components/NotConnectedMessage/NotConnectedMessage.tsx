import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { ConnectWallet } from '@berezka-dao/shared/components/ConnectWallet';
import pic_login from 'public/images/pic_login.png';

import s from './NotConnectedMessage.module.scss';

const NotConnectedMessage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={s.container}>
      <span>{t('shared.notConnectedMessage')}</span>
      <ConnectWallet />
      <Image src={pic_login} alt="login image" width={600} height={360} />
    </div>
  );
};

export { NotConnectedMessage };
