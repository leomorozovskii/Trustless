import type { FC, PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { PopupToast } from './PopupToast';
import type { ToastifyItem, ToastifyValues } from './types';

const ToastifyContext = createContext<ToastifyValues | undefined>(undefined);

const ToastifyProvider: FC<PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState<ToastifyItem[]>([]);

  const handleAddItem = useCallback((item: Omit<ToastifyItem, 'id'>) => {
    const newItem: ToastifyItem = { ...item, id: Date.now() };
    setItems((prevState) => [...prevState, newItem]);
  }, []);

  const handleRemoveItem = useCallback((id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const values: ToastifyValues = useMemo(
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

const useToastifyContext = (): ToastifyValues => {
  const context = useContext(ToastifyContext);
  if (!context) {
    throw new Error('useToastifyContext must be used within a ThemeProvider');
  }
  return context;
};

export { useToastifyContext, ToastifyProvider };
