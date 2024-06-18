import * as React from 'react';
import cn from 'classnames';

import { Row } from '@tanstack/react-table';
import s from '../Table.module.scss';

type Props<TData> = {
  row: Row<TData>;
};

const TableRow = <TData,>({ children, row }: React.PropsWithChildren<Props<TData>>) => (
  <tr
    className={cn(s.row, {
      [s.row_selected]: row.getIsSelected(),
    })}
  >
    {children}
  </tr>
);
const TableRowPlaceholder: React.FC<React.PropsWithChildren> = ({ children }) => (
  <tr className={s.rowPlaceholder}>{children}</tr>
);

export { TableRow, TableRowPlaceholder };
