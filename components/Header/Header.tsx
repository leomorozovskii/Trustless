import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { Button } from '@components/Button';
import { ThemeSwitcher } from '@components/ThemeSwitcher';

import s from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <ThemeSwitcher />
        <ConnectButton />
        {/* <Button className={s.button}>Connect Wallet</Button> */}
      </div>
    </div>
  );
};

export default Header;
