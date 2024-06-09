import { create } from 'zustand';

import { OfferColumns, OfferFilter, OfferGrouping, OffersStore } from './types';

type CreateUseOffersStoreParams = {
  limit: number;
  filters: OfferFilter[];
  grouping: OfferGrouping[] | null;
};

const createUseOffersStore = ({ limit, filters, grouping }: CreateUseOffersStoreParams) =>
  create<OffersStore>()((set) => ({
    selection: null,
    sorting: { order: 'desc', field: OfferColumns.Date },
    grouping,
    filters,
    searchFilter: '',
    filter: 'all',
    pagination: {
      offset: 0,
      limit,
    },
    setSelection: (selection) => set({ selection }),
    setSorting: (sorting) => set({ sorting }),
    setSearchFilter: (searchFilter) =>
      set((state) => ({ searchFilter, selection: null, pagination: { ...state.pagination, offset: 0 } })),
    setFilter: (filter) =>
      set((state) => ({ filter, selection: null, pagination: { ...state.pagination, offset: 0 } })),
    nextPage: () =>
      set((state) => ({
        pagination: { ...state.pagination, selection: null, offset: state.pagination.offset + state.pagination.limit },
      })),
    prevPage: () =>
      set((state) => ({
        pagination: { ...state.pagination, selection: null, offset: state.pagination.offset - state.pagination.limit },
      })),
  }));

export { createUseOffersStore };
