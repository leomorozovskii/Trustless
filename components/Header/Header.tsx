import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { ThemeSwitcher } from '@components/ThemeSwitcher';

import s from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <ThemeSwitcher />
        <ConnectButton />
      </div>
    </div>
  );
};

export default Header;
