import type { FC } from 'react';

import { ConnectWallet } from '@berezka-dao/shared/components/ConnectWallet';

import s from './Header.module.scss';

const Header: FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <ConnectWallet />
      </div>
    </div>
  );
};

export { Header };
