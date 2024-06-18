'use client';

import type { Cell } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

import s from '../Table.module.scss';

const TableCell = <TData, TValue>({ cell }: { cell: Cell<TData, TValue> }) => {
  const { meta } = cell.column.columnDef;
  return (
    <td
      className={s.cell}
      style={{
        width: meta?.columnWidth,
        minWidth: meta?.columnMinWidth,
        justifyContent: meta?.columnAlign,
        textAlign: meta?.columnAlign,
        marginLeft: meta?.columnMarginLeft,
        marginRight: meta?.columnMarginRight,
        paddingLeft: meta?.columnPaddingLeft,
        paddingRight: meta?.columnPaddingRight,
      }}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};

export { TableCell };
