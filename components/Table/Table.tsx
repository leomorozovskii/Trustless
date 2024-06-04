'use client';

import React from 'react';
import { TableBody } from './components/TableBody';
import { TableCell } from './components/TableCell';
import { TableHeadingCell } from './components/TableHeadingCell';
import { TableHeader } from './components/TableHeader';
import { TableRow } from './components/TableRow';
import { TableWrapper } from './components/TableWrapper';
import type { TableProps } from './types';
import s from './Table.module.scss';
import { TableRowSelectionCell } from './components/TableRowSelectionCell';
import { TableHeadingRow } from './components/TableHeadingRow';
import { TableSkeleton } from './TableSkeleton';

export const Table = <TData,>({ table, isLoading }: TableProps<TData>) => {
  const { enableRowSelection } = table.options;
  const columns = table.getAllColumns();
  return (
    <div
      className={s.tableContainer}
      style={{
        ['--cols' as any]: columns.length + (enableRowSelection ? 1 : 0),
      }}
    >
      <TableWrapper>
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
        {isLoading && <TableSkeleton columns={columns} enableRowSelection={enableRowSelection} />}
        {!isLoading && (
          <TableBody>
            {table.getRowModel().rows?.map((row) => (
              <TableRow key={row.id}>
                {enableRowSelection && <TableRowSelectionCell row={row} />}
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} cell={cell} />
                ))}
              </TableRow>
            ))}
          </TableBody>
        )}
      </TableWrapper>
    </div>
  );
};
