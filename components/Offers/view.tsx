'use client';

import { Mutate, StoreApi, UseBoundStore } from 'zustand';
import { OffersTable } from './components/OffersTable';
import { OfferColumns, OffersStore } from './types';
import { OffersFilters } from './components/OffersFilters';
import { OffersSearchFilter } from './components/OffersSearchFilter';
import { OffersPagination } from './components/OffersPagination';
import { useOffersDetailsQuery } from './hooks/useOffersDetailsQuery';
import { OffersCancelOffer } from './components/OffersCancelOffer/OffersCancelOffer';
import { OfferReOpenOffer } from './components/OffersReOpenOffer/OffersReOpenOffer';
import { OffersEmptyState } from './components/OffersEmptyState';
import { useFilteredWithBadges } from './hooks/useFilteredWithBadges';

type CreateOffersView = {
  columnsToDisplay: OfferColumns[];
};

const createOffersView = (
  useOffersStore: UseBoundStore<Mutate<StoreApi<OffersStore>, []>>,
  { columnsToDisplay }: CreateOffersView,
) => {
  return {
    CancelSelectedOrder: () => {
      const { selection, resetSelection } = useOffersStore((state) => ({
        selection: state.selection,
        resetSelection: () => state.setSelection(null),
      }));
      return <OffersCancelOffer offerId={selection} onCancelOffer={resetSelection} />;
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
      const selectedOffer = offerDetails.data?.offers.find((offer) => offer.id === selection) || null;
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
      if (!offerDetails.isFetching && offerDetails.data?.total === 0) {
        return <OffersEmptyState />;
      }
      return (
        <OffersTable
          sorting={sorting}
          offers={offerDetails.data?.offers}
          onSortingChange={setSorting}
          onRowSelectionChange={setSelection}
          columnsToDisplay={columnsToDisplay}
          isLoading={offerDetails.isFetching && offerDetails.data?.offers.length === 0}
        />
      );
    },
    Filters: () => {
      const { filter, filters, setFilter } = useOffersStore((state) => ({
        filter: state.filter,
        filters: state.filters,
        setFilter: state.setFilter,
      }));
      const filtersWithBadges = useFilteredWithBadges(filters);
      return (
        <OffersFilters
          filters={filtersWithBadges.data}
          value={filter}
          onValueChange={setFilter}
          isLoading={filtersWithBadges.isFetching && filtersWithBadges.data.length === 0}
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
      const { pagination, filter, sorting, searchFilter, nextPage, prevPage, filters } = useOffersStore((state) => ({
        filter: state.filter,
        searchFilter: state.searchFilter,
        sorting: state.sorting,
        pagination: state.pagination,
        nextPage: state.nextPage,
        prevPage: state.prevPage,
        filters: state.filters,
      }));
      const offerDetails = useOffersDetailsQuery({
        filter,
        filters,
        limit: pagination.limit,
        searchFilter,
        offset: pagination.offset,
        sorting,
      });
      if (!offerDetails.isFetching && offerDetails.data?.total === 0) {
        return null;
      }
      return (
        <OffersPagination
          total={offerDetails.data?.total}
          offset={pagination.offset}
          limit={pagination.limit}
          onNextPage={nextPage}
          onPrevPage={prevPage}
          isLoading={offerDetails.isFetching && offerDetails.data?.offers.length === 0}
        />
      );
    },
  };
};

export { createOffersView };
