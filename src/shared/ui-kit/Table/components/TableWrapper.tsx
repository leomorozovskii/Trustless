'use client';

import type { FC, PropsWithChildren } from 'react';

import s from '../Table.module.scss';

const TableWrapper: FC<PropsWithChildren> = ({ children }) => <table className={s.table}>{children}</table>;

export { TableWrapper };
