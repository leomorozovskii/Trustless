import React from 'react';
import s from './Header.module.scss';
import { ThemeSwitcher } from '@components/ThemeSwitcher';
import { Button } from '@components/Button';

const Header: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <ThemeSwitcher />
        <Button className={s.button}>
          Connect Wallet
        </Button>
      </div>
    </div>
  )
}

export default Header;