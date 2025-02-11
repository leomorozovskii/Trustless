import type { Table, RowData } from '@tanstack/react-table';
import type { ReactNode } from 'react';

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

export type TableProps<TData> = {
  table: Table<TData>;
  subtitle?: string;
  showHeader?: boolean;
  isLoading?: boolean;
  emptyState?: ReactNode;
  disableRowSelection?: boolean;
};
