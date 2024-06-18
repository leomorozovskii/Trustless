import s from '../Table.module.scss';

const TableHeadingRow: React.FC<React.PropsWithChildren> = ({ children }) => (
  <tr className={s.headingRow}>{children}</tr>
);
const TableHeadingRowPlaceholder: React.FC<React.PropsWithChildren> = ({ children }) => (
  <tr className={s.headingRowPlaceholder}>{children}</tr>
);

export { TableHeadingRow, TableHeadingRowPlaceholder };
