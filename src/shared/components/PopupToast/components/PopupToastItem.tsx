import cn from 'classnames';
import type { FC } from 'react';
import { useEffect } from 'react';

import { ClearCross } from '@berezka-dao/shared/icons';

import s from '../PopupToast.module.scss';
import type { ToastifyItem } from '../types';

type Props = {
  item: ToastifyItem;
  handleRemoveItem: (id: number) => void;
};

const PopupToastItem: FC<Props> = ({ item, handleRemoveItem }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      handleRemoveItem(item.id);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [handleRemoveItem, item]);

  return (
    <div className={cn(s.item, { [s.success]: item.type === 'success', [s.error]: item.type === 'error' })}>
      <div className={s.titleContainer}>
        <h2 className={s.title}>{item.title}</h2>
        <button aria-label="Remove toast" onClick={() => handleRemoveItem(item.id)}>
          <ClearCross className={s.pointer} />
        </button>
      </div>
      {item.text && <p className={s.text}>{item.text}</p>}
    </div>
  );
};

export { PopupToastItem };
