import React from 'react';
import cn from 'classnames';

import { PaginationArrowLeftIcon, PaginationArrowRightIcon } from '@assets/icons';

import s from './Pagination.module.scss';

interface PaginationProps {
  startRow: number;
  endRow: number;
  totalRows: number;
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  startRow,
  endRow,
  totalRows,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
}) => {
  const adjustedEndRow = endRow > totalRows ? totalRows : endRow;

  return (
    <div className={s.container}>
      <span className={s.pageInfo}>
        {startRow}-{adjustedEndRow} of {totalRows}
      </span>
      <button aria-label="Previous Page" type="button" onClick={previousPage} disabled={!canPreviousPage}>
        <PaginationArrowLeftIcon
          className={cn(s.arrow, {
            [s.arrowDisabled]: !canPreviousPage,
          })}
        />
      </button>

      <button aria-label="Next Page" type="button" onClick={nextPage} disabled={!canNextPage}>
        <PaginationArrowRightIcon
          className={cn(s.arrow, {
            [s.arrowDisabled]: !canNextPage,
          })}
        />
      </button>
    </div>
  );
};

export default Pagination;
