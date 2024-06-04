import s from './OffersTableCell.module.scss';

type OffersTableCellProps = {
  children: React.ReactNode;
};

const OffersTableCell: React.FC<OffersTableCellProps> = ({ children }) => {
  return <span className={s.cell}>{children}</span>;
};

export { OffersTableCell };
