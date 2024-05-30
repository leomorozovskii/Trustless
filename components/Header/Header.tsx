import React from 'react';

import { ThemeSwitcher } from '@components/ThemeSwitcher';
import { ConnectWallet } from '@components/ConnectWallet';

import s from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <ThemeSwitcher />
        <ConnectWallet />
      </div>
    </div>
  );
};

export default Header;
