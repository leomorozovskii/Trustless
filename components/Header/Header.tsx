import React from 'react';
import s from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <h1>switch</h1>
        <h1>connect</h1>
      </div>
    </div>
  )
}

export default Header;