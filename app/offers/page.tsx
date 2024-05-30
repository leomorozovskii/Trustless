'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

import { Tabs } from '@components/Tabs';
import { Table } from '@components/Table';
import { OffersTableHeader } from '@components/Table/components/OffersTableHeader';
import { OffersProvider, useOffersContext } from '@/context/offers/offers-context';

import s from './Offers.module.scss';

const OffersPage: React.FC = () => {
  const { t } = useTranslation();
  const { table, statusCounts, tabs, activeTab, handleTabClick, handleSearch, searchQuery } = useOffersContext();

  const {
    page,
    pageIndex,
    pageSize,
    pageCount,
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  } = table;

  return (
    <div className={s.container}>
      <h1 className={s.title}>{t('offers.title')}</h1>
      <Tabs tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick} tabBages={statusCounts} />
      <div className={s.tableContainer}>
        <Table
          rows={page}
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          prepareRow={prepareRow}
        >
          <OffersTableHeader
            data={rows}
            searchValue={searchQuery}
            onSearch={handleSearch}
            pageIndex={pageIndex}
            pageSize={pageSize}
            previousPage={previousPage}
            nextPage={nextPage}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
          />
        </Table>
      </div>
    </div>
  );
};

const OffersPageWithProvider: React.FC = () => (
  <OffersProvider>
    <OffersPage />
  </OffersProvider>
);

export default OffersPageWithProvider;
