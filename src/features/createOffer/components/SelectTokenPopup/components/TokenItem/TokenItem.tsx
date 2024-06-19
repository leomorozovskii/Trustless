import type { ComponentProps, FC } from 'react';

import type { UnknownIcon } from '@berezka-dao/shared/icons/tokens';

import s from './TokenItem.module.scss';

interface ITokenItem {
  title: string;
  IconComponent: FC<ComponentProps<typeof UnknownIcon>>;
  onClick(): void;
}

const TokenItem: FC<ITokenItem> = ({ title, IconComponent, onClick }) => {
  return (
    <button className={s.tokenItem} onClick={onClick}>
      <IconComponent width={20} height={20} />
      <p className={s.title}>{title}</p>
    </button>
  );
};

export { TokenItem };
