import React, { createContext, PropsWithChildren, useContext, useState } from 'react';

import PopupToast from '@components/PopupToast/PopupToast';
import { IToastifyItem, IToastifyValues } from '@context/toastify/ToastifyProvider.interfaces';

const ToastifyContext = createContext<IToastifyValues | undefined>(undefined);

export const ToastifyProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState<IToastifyItem[]>([]);

  const handleAddItem = (item: Omit<IToastifyItem, 'id'>) => {
    const newItem: IToastifyItem = { ...item, id: Date.now() };
    setItems((prevState) => [...prevState, newItem]);
  };

  const handleRemoveItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const values: IToastifyValues = {
    items,
    handleAddItem,
    handleRemoveItem,
  };

  return (
    <ToastifyContext.Provider value={values}>
      <PopupToast items={items} handleRemoveItem={handleRemoveItem} />
      {children}
    </ToastifyContext.Provider>
  );
};

export const useToastifyContext = (): IToastifyValues => {
  const context = useContext(ToastifyContext);
  if (!context) {
    throw new Error('useToastifyContext must be used within a ThemeProvider');
  }
  return context;
};
