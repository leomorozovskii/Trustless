'use client';

import React from 'react';
import cn from 'classnames';
import { TableBody } from './components/TableBody';
import { TableCell } from './components/TableCell';
import { TableHeadingCell, TableHeadingCellPlaceholder } from './components/TableHeadingCell';
import { TableHeader, TableHeaderPlaceholder } from './components/TableHeader';
import { TableRow, TableRowPlaceholder } from './components/TableRow';
import { TableWrapper } from './components/TableWrapper';
import type { TableProps } from './types';
import s from './Table.module.scss';
import { TableRowSelectionCell } from './components/TableRowSelectionCell';
import { TableHeadingRow, TableHeadingRowPlaceholder } from './components/TableHeadingRow';
import { TableSkeleton } from './TableSkeleton';

export const Table = <TData,>({
  table,
  showHeader = true,
  subtitle,
  isLoading,
  emptyState = null,
  disableRowSelection = false,
}: TableProps<TData>) => {
  const { enableRowSelection, data } = table.options;
  const columns = table.getAllColumns();
  return (
    <div
      className={s.tableContainer}
      style={{
        ['--cols' as any]: columns.length + (enableRowSelection ? 1 : 0),
      }}
    >
      <TableWrapper>
        {showHeader ? (
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableHeadingRow key={headerGroup.id}>
                {enableRowSelection && (
                  <th className={s.headingRowSelectionCell}>
                    <span className={s.headingRowSelectionCell__content}>Select</span>
                  </th>
                )}
                {headerGroup.headers.map((header) => (
                  <TableHeadingCell key={header.id} header={header} />
                ))}
              </TableHeadingRow>
            ))}
          </TableHeader>
        ) : (
          <TableHeaderPlaceholder>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableHeadingRowPlaceholder key={headerGroup.id}>
                {enableRowSelection && (
                  <th className={s.headingRowSelectionCell}>
                    <span className={s.headingRowSelectionCell__content}>Select</span>
                  </th>
                )}
                {headerGroup.headers.map((header) => (
                  <TableHeadingCellPlaceholder key={header.id} header={header} />
                ))}
              </TableHeadingRowPlaceholder>
            ))}
          </TableHeaderPlaceholder>
        )}
        {isLoading && <TableSkeleton columns={columns} enableRowSelection={enableRowSelection} />}
        {!isLoading && (
          <TableBody>
            {subtitle && (
              <tr
                className={cn(s.subtitle, {
                  [s.enableRowSelection]: enableRowSelection,
                })}
              >
                <td>{subtitle}</td>
              </tr>
            )}
            {data.length > 0 ? (
              table.getRowModel().rows?.map((row) => (
                <TableRow key={row.id} row={row}>
                  {enableRowSelection && <TableRowSelectionCell row={row} disabled={disableRowSelection} />}
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} cell={cell} />
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRowPlaceholder>
                <td
                  className={cn(s.emptyState, {
                    [s.enableRowSelection]: enableRowSelection,
                  })}
                  colSpan={columns.length + (enableRowSelection ? 1 : 0)}
                >
                  {emptyState}
                </td>
              </TableRowPlaceholder>
            )}
          </TableBody>
        )}
      </TableWrapper>
    </div>
  );
};
