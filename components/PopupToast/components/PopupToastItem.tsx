import { memo, useEffect } from 'react';
import cn from 'classnames';

import { ClearCross } from '@assets/icons';
import { IToastifyItem } from '@context/toastify/ToastifyProvider.interfaces';

import s from '../PopupToast.module.scss';

interface IPopupToastItem {
  item: IToastifyItem;
  handleRemoveItem: (id: number) => void;
}

const PopupToastItem: React.FC<IPopupToastItem> = ({ item, handleRemoveItem }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      handleRemoveItem(item.id);
    }, 3000);

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
      <p className={s.text}>{item.text}</p>
    </div>
  );
};

export default memo(PopupToastItem);
