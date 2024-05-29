import React from 'react';

import { SearchIcon } from '@assets/icons';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Pagination } from '@components/Pagination';

import s from '../Table.module.scss';

interface TableContainerProps extends React.PropsWithChildren {
  data: any[];
  pageIndex: number;
  pageSize: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
  onSearch: (query: string) => void;
  searchValue: string;
}

const TableContainer: React.FC<TableContainerProps> = ({
  data,
  searchValue,
  children,
  onSearch,
  pageSize,
  pageIndex,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
}) => (
  <div className={s.tableContainer}>
    <div className={s.tableHeader}>
      <div className={s.searchContainer}>
        <Button className={s.cancelButton}>Cancel offer</Button>
        <Input
          icon={<SearchIcon />}
          size="md"
          value={searchValue}
          type="text"
          placeholder="Offer ID or Asset"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <Pagination
        startRow={pageIndex * pageSize + 1}
        endRow={(pageIndex + 1) * pageSize}
        totalRows={data.length}
        previousPage={previousPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
      />
    </div>
    {children}
  </div>
);

export default TableContainer;
