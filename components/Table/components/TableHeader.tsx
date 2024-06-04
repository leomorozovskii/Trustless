import * as React from 'react';

import s from '../Table.module.scss';

const TableHeader: React.FC<React.PropsWithChildren> = ({ children }) => <thead className={s.header}>{children}</thead>;

export { TableHeader };
