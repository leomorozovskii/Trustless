import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { useFilters, usePagination, useSortBy, useTable } from 'react-table';

import { mockTableData } from '@components/Table/mocks';
import { useOfferSelect } from '@components/Table/hooks/useOfferSelect';
import { useOffersColumns } from '@components/Table/hooks/useOffersColumns';
import { useOffersSearchFilter } from '@components/Table/hooks/useOffersSearchFilter';
import { useOffersTableData } from '@components/Table/hooks/useOffersTableData';
import { useStatusCount } from '@components/Table/hooks/useStatusCount';
import { OfferState } from '@lib/constants';
import { useOffersTabs } from '@lib/hooks/useTabs';
import { IOffer, OffersColumnAccessors, IOffersContext } from '@/context/offers/types';

const OffersContext = createContext<IOffersContext | null>(null);

const mockTabs = [
  { label: OfferState.All, query: OfferState.All },
  { label: OfferState.Open, query: OfferState.Open },
  { label: OfferState.Pending, query: OfferState.Pending },
  { label: OfferState.Accepted, query: OfferState.Accepted },
  { label: OfferState.Cancelled, query: OfferState.Cancelled },
];

export const OffersProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { activeTab, handleTabClick, status } = useOffersTabs(mockTabs);
  const { selectedOffer, toggleOfferSelection } = useOfferSelect();

  console.log('selectedOffer', selectedOffer);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<OfferState>(status);

  const handleSearch = useCallback((e: string) => {
    setSearchQuery(e);
  }, []);

  const handleFilterStatus = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterStatus(e.target.value as OfferState);
  }, []);

  // TODO add real data
  const tableData = useOffersTableData({ data: mockTableData, filterStatus });
  const columns = useOffersColumns({
    selectedOffer,
    toggleOfferSelection,
  });
  const { filteredData } = useOffersSearchFilter({
    data: tableData,
    query: searchQuery,
  });

  const { statusCounts } = useStatusCount<IOffer, OfferState>({
    // TODO add real data
    data: mockTableData,
    keyExtractor: (item) => item.status,
  });

  const table = useTable(
    {
      columns,
      data: filteredData,
      initialState: {
        sorting: [
          {
            id: OffersColumnAccessors.ID,
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
    <OffersContext.Provider
      value={{
        table,
        selectedOffer,
        toggleOfferSelection,
        tabs: mockTabs,
        statusCounts,
        activeTab,
        searchQuery,
        handleTabClick,
        handleSearch,
        handleFilterStatus,
      }}
    >
      {children}
    </OffersContext.Provider>
  );
};

export const useOffersContext = () => {
  const context = useContext(OffersContext);
  if (!context) throw new Error('useOfferContext must be used within an OfferProvider');
  return context;
};
