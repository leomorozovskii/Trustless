/* eslint-disable jsx-a11y/control-has-associated-label */

import type { Column, Row } from '@tanstack/react-table';
import cn from 'classnames';

import { Skeleton } from '@berezka-dao/shared/ui-kit/Skeleton';

import s from './TableSkeleton.module.scss';

type TableSkeletonProps<TData> = {
  columns: Column<TData>[];
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean) | undefined;
};

const TableSkeleton = <TData,>({ columns, enableRowSelection }: TableSkeletonProps<TData>) => {
  return (
    <tbody className={s.container}>
      {[...Array(10)].map((_, idx) => (
        <tr className={s.row} key={idx}>
          {enableRowSelection && (
            <td className={cn(s.cell, s.selectionCell)}>
              <Skeleton loading width="24px" height="20px" />
            </td>
          )}
          {columns.map((column) => (
            <td
              key={column.id}
              className={s.cell}
              style={{
                width: column.columnDef.meta?.columnWidth,
                marginLeft: column.columnDef.meta?.columnMarginLeft,
                marginRight: column.columnDef.meta?.columnMarginRight,
              }}
            >
              <Skeleton loading width="100%" height="20px" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export { TableSkeleton };
