import React, { memo } from 'react';

import s from '../Table.module.scss';

interface TableContainerProps extends React.PropsWithChildren {}

const TableContainer: React.FC<TableContainerProps> = ({ children }) => {
  return <div className={s.tableContainer}>{children}</div>;
};

export default memo(TableContainer);
