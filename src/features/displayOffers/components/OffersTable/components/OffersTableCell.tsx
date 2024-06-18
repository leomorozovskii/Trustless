import cn from 'classnames';

import s from './OffersTableCell.module.scss';

type OffersTableCellProps = {
  children: React.ReactNode;
  full?: boolean;
  uppercase?: boolean;
  column?: boolean;
  secondaryText?: React.ReactNode;
  small?: boolean;
};

const OffersTableCell: React.FC<OffersTableCellProps> = ({
  children,
  full,
  uppercase,
  column,
  secondaryText,
  small,
}) => {
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
