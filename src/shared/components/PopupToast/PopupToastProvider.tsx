import type { PropsWithChildren } from 'react';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { PopupToast } from './PopupToast';
import type { IToastifyItem, IToastifyValues } from './types';

const ToastifyContext = createContext<IToastifyValues | undefined>(undefined);

const ToastifyProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState<IToastifyItem[]>([]);

  const handleAddItem = useCallback((item: Omit<IToastifyItem, 'id'>) => {
    const newItem: IToastifyItem = { ...item, id: Date.now() };
    setItems((prevState) => [...prevState, newItem]);
  }, []);

  const handleRemoveItem = useCallback((id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const values: IToastifyValues = useMemo(
    () => ({
      items,
      handleAddItem,
      handleRemoveItem,
    }),
    [items, handleAddItem, handleRemoveItem],
  );

  return (
    <ToastifyContext.Provider value={values}>
      <PopupToast items={items} handleRemoveItem={handleRemoveItem} />
      {children}
    </ToastifyContext.Provider>
  );
};

const useToastifyContext = (): IToastifyValues => {
  const context = useContext(ToastifyContext);
  if (!context) {
    throw new Error('useToastifyContext must be used within a ThemeProvider');
  }
  return context;
};

export { useToastifyContext, ToastifyProvider };
