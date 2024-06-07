import type { Table, RowData } from '@tanstack/react-table';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    isLoading?: boolean;
    columnWidth?: string | number;
    columnMinWidth?: string | number;
    columnAlign?: 'start' | 'center' | 'end';
    columnMarginLeft?: string | number;
    columnMarginRight?: string | number;
    columnPaddingLeft?: string | number;
    columnPaddingRight?: string | number;
  }
}

export interface TableProps<TData> {
  table: Table<TData>;
  isLoading?: boolean;
}
