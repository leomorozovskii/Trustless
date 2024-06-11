'use client';

import { Mutate, StoreApi, UseBoundStore } from 'zustand';
import React from 'react';
import { OffersTable } from './components/OffersTable';
import { OfferColumns, OffersStore } from './types';
import { OffersFilters } from './components/OffersFilters';
import { OffersSearchFilter } from './components/OffersSearchFilter';
import { OffersPagination } from './components/OffersPagination';
import { useOffersDetailsQuery } from './hooks/useOffersDetailsQuery';
import { OffersCancelOffer } from './components/OffersCancelOffer/OffersCancelOffer';
import { OfferReOpenOffer } from './components/OffersReOpenOffer/OffersReOpenOffer';
import { OffersEmptyState } from './components/OffersEmptyState';
import { useOffersStatsQuery } from './hooks/useOffersStatsQuery';

type CreateOffersView = {
  columnsToDisplay: OfferColumns[];
};

const createOffersView = (
  useOffersStore: UseBoundStore<Mutate<StoreApi<OffersStore>, []>>,
  { columnsToDisplay }: CreateOffersView,
) => {
  return {
    CancelSelectedOrder: () => {
      const { selection } = useOffersStore((state) => ({
        selection: state.selection,
      }));
      return <OffersCancelOffer offerId={selection} />;
    },
    ReOpenOrder: () => {
      const { filter, searchFilter, pagination, selection, sorting, filters } = useOffersStore((state) => ({
        filter: state.filter,
        searchFilter: state.searchFilter,
        pagination: state.pagination,
        selection: state.selection,
        sorting: state.sorting,
        filters: state.filters,
      }));
      const offerDetails = useOffersDetailsQuery({
        filter,
        limit: pagination.limit,
        offset: pagination.offset,
        searchFilter,
        sorting,
        filters,
      });
      const selectedOffer = offerDetails.data?.find((offer) => offer.id === selection) || null;
      return <OfferReOpenOffer offer={selectedOffer} />;
    },
    Table: () => {
      const { filter, searchFilter, sorting, pagination, setSorting, setSelection, filters } = useOffersStore(
        (state) => ({
          filter: state.filter,
          searchFilter: state.searchFilter,
          pagination: state.pagination,
          sorting: state.sorting,
          setSorting: state.setSorting,
          setSelection: state.setSelection,
          filters: state.filters,
        }),
      );
      const offerDetails = useOffersDetailsQuery({
        filter,
        filters,
        limit: pagination.limit,
        offset: pagination.offset,
        searchFilter,
        sorting,
      });
      if (!offerDetails.isLoading && offerDetails.data?.length === 0) {
        return <OffersEmptyState />;
      }
      return (
        <OffersTable
          sorting={sorting}
          offers={offerDetails.data}
          onSortingChange={setSorting}
          onRowSelectionChange={setSelection}
          columnsToDisplay={columnsToDisplay}
          isLoading={offerDetails.isLoading}
        />
      );
    },
    Filters: () => {
      const { filter, searchFilter, filters, setFilter } = useOffersStore((state) => ({
        filter: state.filter,
        filters: state.filters,
        setFilter: state.setFilter,
        searchFilter: state.searchFilter,
      }));
      const offersStats = useOffersStatsQuery({ searchFilter, filters });
      return (
        <OffersFilters
          filters={filters}
          offersStats={offersStats.data}
          value={filter}
          onValueChange={setFilter}
          isLoading={offersStats.isLoading}
        />
      );
    },
    SearchFilter: () => {
      const { searchFilter, setSearchFilter } = useOffersStore((state) => ({
        searchFilter: state.searchFilter,
        setSearchFilter: state.setSearchFilter,
      }));
      return <OffersSearchFilter value={searchFilter} onValueChange={setSearchFilter} />;
    },
    Pagination: () => {
      const { pagination, searchFilter, nextPage, prevPage, filters } = useOffersStore((state) => ({
        searchFilter: state.searchFilter,
        pagination: state.pagination,
        nextPage: state.nextPage,
        prevPage: state.prevPage,
        filters: state.filters,
      }));
      const offerStats = useOffersStatsQuery({ searchFilter, filters });
      return (
        <OffersPagination
          total={offerStats.data?.total}
          offset={pagination.offset}
          limit={pagination.limit}
          onNextPage={nextPage}
          onPrevPage={prevPage}
          isLoading={offerStats.isLoading}
        />
      );
    },
  };
};

export { createOffersView };
