'use client';

import React from 'react';

import s from '../Table.module.scss';

const TableWrapper: React.FC<React.PropsWithChildren> = ({ children }) => <table className={s.table}>{children}</table>;

export { TableWrapper };
