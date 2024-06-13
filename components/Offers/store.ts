import { create } from 'zustand';

import { OfferFilter, OfferSorting, OffersStore } from './types';

type CreateUseOffersStoreParams = {
  limit: number;
  filters: OfferFilter[];
  sorting?: OfferSorting | null;
};

const createUseOffersStore = ({ limit, sorting = null, filters }: CreateUseOffersStoreParams) =>
  create<OffersStore>()((set) => ({
    selection: null,
    sorting,
    filters,
    searchFilter: '',
    filter: 'all',
    pagination: {
      offset: 0,
      limit,
    },
    setSelection: (selection) => set({ selection }),
    setSorting: (newSorting) => set({ sorting: newSorting }),
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
