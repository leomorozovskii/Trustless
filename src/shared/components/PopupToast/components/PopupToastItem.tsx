import cn from 'classnames';
import { useEffect } from 'react';

import { ClearCross } from '@berezka-dao/shared/icons';

import s from '../PopupToast.module.scss';
import type { IToastifyItem } from '../types';

interface PopupToastItemProps {
  item: IToastifyItem;
  handleRemoveItem: (id: number) => void;
}

const PopupToastItem: React.FC<PopupToastItemProps> = ({ item, handleRemoveItem }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      handleRemoveItem(item.id);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [item]);

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
