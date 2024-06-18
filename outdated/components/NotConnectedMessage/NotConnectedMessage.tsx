import { useTranslation } from 'react-i18next';
import Image from 'next/image';

import pic_login from 'public/images/pic_login.png';

import { ConnectWallet } from '@components/ConnectWallet';
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
