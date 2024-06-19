import React from 'react';

import { PopupToastItem } from './components/PopupToastItem';
import s from './PopupToast.module.scss';
import type { IToastifyItem } from './types';

interface IPopupToast {
  items: IToastifyItem[];
  handleRemoveItem: (id: number) => void;
}

const PopupToast: React.FC<IPopupToast> = ({ items, handleRemoveItem }) => {
  return (
    <div className={s.wrapper}>
      {items.length > 0 &&
        items.map((el) => <PopupToastItem key={el.id} handleRemoveItem={handleRemoveItem} item={el} />)}
    </div>
  );
};

export { PopupToast };
