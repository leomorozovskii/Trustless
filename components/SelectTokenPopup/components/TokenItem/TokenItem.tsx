import React, { memo } from 'react';
import s from './TokenItem.module.scss';
import { IconProps } from '@assets/icons/tokens';

export interface ITokenItem {
  title: string;
  IconComponent: React.FC<IconProps>;
  onClick(): void;
}

const TokenItem: React.FC<ITokenItem> = ({ title, IconComponent, onClick }) => {
  return (
    <div onClick={onClick} className={s.tokenItem}>
      <IconComponent />
      <p className={s.title}>{title}</p>
    </div>
  );
};

export default memo(TokenItem);
