'use client';

import { Header, flexRender } from '@tanstack/react-table';
import { SortingIcon } from '@assets/icons';
import cn from 'classnames';
import s from '../Table.module.scss';

const TableHeadingCell = <TData, TValue>({ header }: { header: Header<TData, TValue> }) => {
  return (
    <th
      className={s.headingCell}
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

export { TableHeadingCell };
