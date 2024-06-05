import React from 'react';

import { IToastifyItem } from '@context/toastify/ToastifyProvider.interfaces';
import PopupToastItem from '@components/PopupToast/components/PopupToastItem';

import s from './PopupToast.module.scss';

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

export default PopupToast;
