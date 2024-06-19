import * as React from 'react';

import s from '../Table.module.scss';

const TableBody: React.FC<React.PropsWithChildren> = ({ children }) => <tbody className={s.body}>{children}</tbody>;

export { TableBody };
