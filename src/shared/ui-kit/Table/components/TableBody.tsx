import type { FC, PropsWithChildren } from 'react';

import s from '../Table.module.scss';

const TableBody: FC<PropsWithChildren> = ({ children }) => <tbody className={s.body}>{children}</tbody>;

export { TableBody };
