import cn from 'classnames';
import s from './OffersTableCell.module.scss';

type OffersTableCellProps = {
  children: React.ReactNode;
  full?: boolean;
  uppercase?: boolean;
};

const OffersTableCell: React.FC<OffersTableCellProps> = ({ children, full, uppercase }) => {
  return (
    <span
      className={cn(s.cell, {
        [s.cell_full]: full,
        [s.cell_uppercase]: uppercase,
      })}
    >
      {children}
    </span>
  );
};

export { OffersTableCell };
