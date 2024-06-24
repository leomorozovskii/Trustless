'use client';

import type { Header, Row } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import cn from 'classnames';

import { SortingIcon } from '@berezka-dao/shared/icons';

import s from '../Table.module.scss';

type Props<TData, TValue> = {
  header: Header<TData, TValue>;
  enableRowSelection: ((row: Row<TData>) => boolean) | boolean | undefined;
};

const TableHeadingCell = <TData, TValue>({ header, enableRowSelection }: Props<TData, TValue>) => {
  return (
    <th
      className={cn(s.headingCell, {
        [s.headingCell_selectable]: enableRowSelection,
      })}
      onClick={header.column.getToggleSortingHandler()}
      colSpan={header.colSpan}
      style={{
        width: header.column.columnDef.meta?.columnWidth,
        minWidth: header.column.columnDef.meta?.columnMinWidth,
        justifyContent: header.column.columnDef.meta?.columnAlign,
        textAlign: header.column.columnDef.meta?.columnAlign,
        marginLeft: header.column.columnDef.meta?.columnMarginLeft,
        marginRight: header.column.columnDef.meta?.columnMarginRight,
        paddingLeft: header.column.columnDef.meta?.columnPaddingLeft,
        paddingRight: header.column.columnDef.meta?.columnPaddingRight,
      }}
    >
      <span className={s.headingCell__content}>
        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
        {header.column.getCanSort() && (
          <SortingIcon
            className={cn(s.sortingIcon, {
              [s.sortingIcon_active]: header.column.getIsSorted(),
            })}
          />
        )}
      </span>
    </th>
  );
};

const TableHeadingCellPlaceholder = <TData, TValue>({ header }: { header: Header<TData, TValue> }) => {
  return (
    <th
      className={s.headingCellPlaceholder}
      colSpan={header.colSpan}
      aria-label={header.column.columnDef.id}
      style={{
        width: header.column.columnDef.meta?.columnWidth,
        minWidth: header.column.columnDef.meta?.columnMinWidth,
        justifyContent: header.column.columnDef.meta?.columnAlign,
        textAlign: header.column.columnDef.meta?.columnAlign,
        marginLeft: header.column.columnDef.meta?.columnMarginLeft,
        marginRight: header.column.columnDef.meta?.columnMarginRight,
        paddingLeft: header.column.columnDef.meta?.columnPaddingLeft,
        paddingRight: header.column.columnDef.meta?.columnPaddingRight,
      }}
    />
  );
};

export { TableHeadingCell, TableHeadingCellPlaceholder };
