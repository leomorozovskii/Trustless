import React, { memo } from 'react';
import s from './Table.module.scss';
import TableContainer from '@components/Table/components/TableContainer';
import TableHeader from '@components/Table/components/TableHeader';
import TableBody from '@components/Table/components/TableBody';

interface TableProps extends React.PropsWithChildren {
  getTableProps: any;
  getTableBodyProps: any;
  headerGroups: any;
  rows: any;
  prepareRow: any;
}

const Table: React.FC<TableProps> = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
  children,
}) => {
  return (
    <TableContainer>
      {children}
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

export default memo(Table);
