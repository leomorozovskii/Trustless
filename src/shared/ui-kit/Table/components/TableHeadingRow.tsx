import type { FC, PropsWithChildren } from 'react';

import s from '../Table.module.scss';

const TableHeadingRow: FC<PropsWithChildren> = ({ children }) => <tr className={s.headingRow}>{children}</tr>;
const TableHeadingRowPlaceholder: FC<PropsWithChildren> = ({ children }) => (
  <tr className={s.headingRowPlaceholder}>{children}</tr>
);

export { TableHeadingRow, TableHeadingRowPlaceholder };
