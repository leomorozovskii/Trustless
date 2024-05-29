import React from 'react';

import TableBody from '@components/Table/components/TableBody';
import TableContainer from '@components/Table/components/TableContainer';
import TableHeader from '@components/Table/components/TableHeader';

import s from './Table.module.scss';

interface TableProps {
  data: any[];
  pageSize: number;
  pageCount: number;
  pageIndex: number;
  searchValue: string;
  onSearch: (query: string) => void;
  gotoPage: (pageIndex: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  getTableProps: any;
  getTableBodyProps: any;
  headerGroups: any;
  rows: any;
  prepareRow: any;
}

const Table: React.FC<TableProps> = ({
  data,
  searchValue,
  onSearch,
  pageSize,
  pageIndex,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
}) => {
  return (
    <TableContainer
      data={data}
      searchValue={searchValue}
      pageSize={pageSize}
      onSearch={onSearch}
      pageIndex={pageIndex}
      previousPage={previousPage}
      nextPage={nextPage}
      canPreviousPage={canPreviousPage}
      canNextPage={canNextPage}
    >
      <table {...getTableProps()} className={s.table}>
        <TableHeader headerGroups={headerGroups} />
        <TableBody
          rows={rows}
          prepareRow={prepareRow}
          getTableBodyProps={getTableBodyProps}
        />
      </table>
    </TableContainer>
  );
};

export default Table;
