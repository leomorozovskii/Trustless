'use client';

import React, { useEffect, useState } from 'react';
import { useTable, useSortBy, useFilters, usePagination } from 'react-table';

import { Tabs } from '@components/Tabs';
import { Table } from '@components/Table';
import { mockTableData } from '@components/Table/mocks';
import { useOffersTableData } from '@components/Table/hooks/useOffersTableData';
import { useOffersColumns } from '@components/Table/hooks/useOffersColumns';
import { useOffersSearchFilter } from '@components/Table/hooks/useOffersSearchFilter';
import { useStatusCount } from '@components/Table/hooks/useStatusCount';
import { OfferState } from '@lib/constants';
import { useOffersTabs } from '@lib/hooks/useTabs';

import s from './Offers.module.scss';

const tabs = [
  { label: OfferState.All, query: OfferState.All },
  { label: OfferState.Open, query: OfferState.Open },
  { label: OfferState.Pending, query: OfferState.Pending },
  { label: OfferState.Accepted, query: OfferState.Accepted },
  { label: OfferState.Cancelled, query: OfferState.Cancelled },
];

const OffersPage: React.FC = () => {
  const { activeTab, handleTabClick, status } = useOffersTabs(tabs);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<OfferState>(status);

  // TODO add real data
  const tableData = useOffersTableData({ data: mockTableData, filterStatus });
  const columns = useOffersColumns();
  const { filteredData } = useOffersSearchFilter({
    data: tableData,
    query: searchQuery,
  });

  const { statusCounts } = useStatusCount({
    // TODO add real data
    data: mockTableData,
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    rows,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: {
        sorting: [
          {
            id: 'id',
            desc: false,
          },
        ],
        pageIndex: 0,
        pageSize: 100,
      },
    },
    useFilters,
    useSortBy,
    usePagination,
  );

  useEffect(() => {
    setFilterStatus(status);
  }, [status]);

  return (
    <div className={s.container}>
      <h1 className={s.title}>My offers</h1>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
        tabBages={statusCounts}
      />
      <div className={s.tableContainer}>
        <Table
          data={rows}
          rows={page}
          searchValue={searchQuery}
          onSearch={setSearchQuery}
          pageIndex={pageIndex}
          pageSize={pageSize}
          pageCount={pageCount}
          gotoPage={gotoPage}
          previousPage={previousPage}
          nextPage={nextPage}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          prepareRow={prepareRow}
        />
      </div>
    </div>
  );
};

export default OffersPage;
