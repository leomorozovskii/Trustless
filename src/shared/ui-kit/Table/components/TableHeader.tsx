import type { FC, PropsWithChildren } from 'react';

import s from '../Table.module.scss';

const TableHeader: FC<PropsWithChildren> = ({ children }) => <thead className={s.header}>{children}</thead>;
const TableHeaderPlaceholder: FC<PropsWithChildren> = ({ children }) => (
  <thead className={s.headerPlaceholder}>{children}</thead>
);

export { TableHeader, TableHeaderPlaceholder };
