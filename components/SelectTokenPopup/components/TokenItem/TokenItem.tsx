import React from 'react';

import { IconProps } from '@assets/icons/tokens';

import s from './TokenItem.module.scss';

export interface ITokenItem {
  title: string;
  IconComponent: React.FC<IconProps>;
  onClick(): void;
}

const TokenItem: React.FC<ITokenItem> = ({ title, IconComponent, onClick }) => {
  return (
    <button className={s.tokenItem} onClick={onClick}>
      <IconComponent />
      <p className={s.title}>{title}</p>
    </button>
  );
};

export default TokenItem;
