import s from '../Table.module.scss';

export const TableHeadingRow: React.FC<React.PropsWithChildren> = ({ children }) => (
  <tr className={s.headingRow}>{children}</tr>
);
export const TableHeadingRowPlaceholder: React.FC<React.PropsWithChildren> = ({ children }) => (
  <tr className={s.headingRowPlaceholder}>{children}</tr>
);
