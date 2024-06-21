type ToastifyItem = {
  id: number;
  title: string;
  text?: string;
  type: 'error' | 'success';
};

type ToastifyValues = {
  items: ToastifyItem[];
  handleAddItem: (item: Omit<ToastifyItem, 'id'>) => void;
  handleRemoveItem: (id: number) => void;
};

export type { ToastifyItem, ToastifyValues };
