import * as React from 'react';

import s from '../Table.module.scss';

const TableRow: React.FC<React.PropsWithChildren> = ({ children }) => <tr className={s.row}>{children}</tr>;

export { TableRow };
