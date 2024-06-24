'use client';

import type { Mutate, StoreApi, UseBoundStore } from 'zustand';

import { OffersCancelOffer } from './components/OffersCancelOffer/OffersCancelOffer';
import { OffersEmptyState } from './components/OffersEmptyState';
import { OffersFilters } from './components/OffersFilters';
import { OffersPagination } from './components/OffersPagination';
import { OfferReOpenOffer } from './components/OffersReOpenOffer/OffersReOpenOffer';
import { OffersSearchFilter } from './components/OffersSearchFilter';
import { OffersTable } from './components/OffersTable';
import { useOffersDetails } from './hooks/useOffersDetails';
import { useOffersStats } from './hooks/useOffersStats';
import type { OfferColumns, OffersStore } from './types';

type CreateOffersView = {
  columnsToDisplay: OfferColumns[];
};

const createOffersView = (
  useOffersStore: UseBoundStore<Mutate<StoreApi<OffersStore>, []>>,
  { columnsToDisplay }: CreateOffersView,
) => {
  return {
    CancelSelectedOrder: () => {
      const { offerId } = useOffersStore((state) => ({
        offerId: state.selection?.status === 'pending' ? state.selection.id : null,
      }));
      return <OffersCancelOffer offerId={offerId} />;
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
      const offerDetails = useOffersDetails({
        filter,
        limit: pagination.limit,
        offset: pagination.offset,
        searchFilter,
        sorting,
        filters,
      });
      const selectedOffer = offerDetails.data?.find((offer) => offer.id === selection?.id) || null;
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
      const offerDetails = useOffersDetails({
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
      const offersStats = useOffersStats({ searchFilter, filters });
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
      const offerStats = useOffersStats({ searchFilter, filters });
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
