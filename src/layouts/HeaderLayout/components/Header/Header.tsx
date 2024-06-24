import type { FC } from 'react';

import { ConnectWallet } from '@berezka-dao/shared/components/ConnectWallet';

import s from './Header.module.scss';
import { MobileBurger } from '../MobileBurger';

const Header: FC = () => {
  return (
    <div className={s.wrapper}>
      <ConnectWallet />
      <MobileBurger />
    </div>
  );
};

export { Header };
