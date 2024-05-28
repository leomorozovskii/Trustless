import React, { memo } from 'react';
import cn from 'classnames';
import s from '../Table.module.scss';

interface TableBodyProps {
  rows: any[];
  prepareRow: any;
  getTableBodyProps: any;
  onSelectRow: () => void;
}

const TableBody: React.FC<TableBodyProps> = ({
  rows,
  prepareRow,
  getTableBodyProps,
  onSelectRow,
}) => {
  return (
    <tbody {...getTableBodyProps()} className={s.tableBody}>
      {rows.map((row) => {
        prepareRow(row);
        return (
          <tr
            {...row.getRowProps()}
            key={row.id}
            className={cn(s.row, {
              [s.cancelled]: row.original.status === 'Cancelled',
            })}
          >
            {row.cells.map((cell) => {
              return (
                <td {...cell.getCellProps()} key={cell.id}>
                  {cell.render('Cell')}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default memo(TableBody);
