import type { FC } from 'react';

import { PopupToastItem } from './components/PopupToastItem';
import s from './PopupToast.module.scss';
import type { ToastifyItem } from './types';

type Props = {
  items: ToastifyItem[];
  handleRemoveItem: (id: number) => void;
};

const PopupToast: FC<Props> = ({ items, handleRemoveItem }) => {
  return (
    <div className={s.wrapper}>
      {items.length > 0 &&
        items.map((el) => <PopupToastItem key={el.id} handleRemoveItem={handleRemoveItem} item={el} />)}
    </div>
  );
};

export { PopupToast };
