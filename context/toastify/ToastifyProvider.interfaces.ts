interface IToastifyItem {
  id: number;
  title: string;
  text?: string;
  type: 'error' | 'success';
}

interface IToastifyValues {
  items: IToastifyItem[];
  handleAddItem: (item: Omit<IToastifyItem, 'id'>) => void;
  handleRemoveItem: (id: number) => void;
}

export type { IToastifyValues, IToastifyItem };
