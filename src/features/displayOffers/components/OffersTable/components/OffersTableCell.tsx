import cn from 'classnames';
import type { FC, ReactNode } from 'react';

import s from './OffersTableCell.module.scss';

type OffersTableCellProps = {
  children: ReactNode;
  full?: boolean;
  uppercase?: boolean;
  column?: boolean;
  secondaryText?: ReactNode;
  small?: boolean;
};

const OffersTableCell: FC<OffersTableCellProps> = ({ children, full, uppercase, column, secondaryText, small }) => {
  return (
    <span
      className={cn(s.cell, {
        [s.cell_full]: full,
        [s.cell_uppercase]: uppercase,
        [s.cell_column]: column,
        [s.cell_small]: small,
      })}
    >
      {children}
      {secondaryText && <span className={s.cell__secondaryText}>{secondaryText}</span>}
    </span>
  );
};

export { OffersTableCell };
