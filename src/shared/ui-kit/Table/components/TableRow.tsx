import type { Row } from '@tanstack/react-table';
import cn from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import s from '../Table.module.scss';

type Props<TData> = {
  row: Row<TData>;
};

const TableRow = <TData,>({ children, row }: PropsWithChildren<Props<TData>>) => (
  <tr
    className={cn(s.row, {
      [s.row_selected]: row.getIsSelected(),
    })}
  >
    {children}
  </tr>
);
const TableRowPlaceholder: FC<PropsWithChildren> = ({ children }) => <tr className={s.rowPlaceholder}>{children}</tr>;

export { TableRow, TableRowPlaceholder };
