'use client';

import { Cell, flexRender } from '@tanstack/react-table';
import s from '../Table.module.scss';

const TableCell = <TData, TValue>({ cell }: { cell: Cell<TData, TValue> }) => {
  const { meta } = cell.column.columnDef;
  return (
    <td
      className={s.cell}
      style={{
        width: meta?.columnWidth,
        justifyContent: meta?.columnAlign,
        marginLeft: meta?.columnMarginLeft,
        marginRight: meta?.columnMarginRight,
      }}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};

export { TableCell };
