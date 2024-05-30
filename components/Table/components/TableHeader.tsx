import { useCallback } from 'react';
import cn from 'classnames';

import { ArrowDownIcon, ArrowUpIcon } from '@assets/icons';

import s from '../Table.module.scss';

// TODO: fix any
interface TableHeaderProps {
  headerGroups: any[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ headerGroups }) => {
  const renderIcon = useCallback((column: any) => {
    if (column.isSorted) {
      return column.isSortedDesc ? <ArrowDownIcon className={s.sortIcon} /> : <ArrowUpIcon className={s.sortIcon} />;
    }
    return <ArrowDownIcon className={cn(s.sortIcon, s.sortIcon_hidden)} />;
  }, []);

  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
          {/* TODO  fix any */}
          {headerGroup.headers.map((column: any) => {
            return (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                key={column.id}
                className={cn(s.tableHeaderCell, {
                  [s.tableHeaderCell_active]: column.isSorted,
                })}
              >
                <span>{column.render('Header')}</span>
                {/* Добавление значков сортировки */}
                <span className={s.sortIconContainer}>{renderIcon(column)}</span>
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
