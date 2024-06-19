import type { Hash } from 'viem';

import type { TokenData } from '@berezka-dao/core/types/tokenData';

type OfferStatus = 'pending' | 'accepted' | 'cancelled';

type OfferFilter = OfferStatus | 'all';

enum OfferColumns {
  ID = 'ID',
  AssetFrom = 'AssetFrom',
  AssetTo = 'AssetTo',
  AmountFrom = 'AmountFrom',
  AmountTo = 'AmountTo',
  Rate = 'Rate',
  TxHash = 'TxHash',
  Status = 'Status',
  Date = 'Date',
  Receiver = 'Receiver',
  Share = 'Share',
}

interface OffersStats {
  accepted: number;
  cancelled: number;
  pending: number;
  total: number;
}

type OfferSortingOrder = 'asc' | 'desc';

interface OfferSorting {
  field: OfferColumns;
  order: OfferSortingOrder;
}

interface OffersState {
  selection: string | null;
  sorting: OfferSorting | null;
  filter: OfferFilter;
  filters: OfferFilter[];
  searchFilter: string;
  pagination: {
    offset: number;
    limit: number;
  };
}

interface OffersActions {
  setSearchFilter: (searchFilter: string) => void;
  setFilter: (filter: OfferFilter) => void;
  setSorting: (sorting: OfferSorting | null) => void;
  setSelection: (selectedId: string | null) => void;
  nextPage: () => void;
  prevPage: () => void;
}

interface OffersStore extends OffersState, OffersActions {}

interface OfferTrade {
  id: string;
  tokenFromDetails: TokenData;
  tokenToDetails: TokenData;
  amountFrom: number;
  amountFromWithFee: number;
  amountTo: number;
  txHash: Hash;
  receiver: string;
  unixTimestamp: number;
  status: OfferStatus;
  recentlyAccepted: boolean;
}

export type {
  OfferStatus,
  OfferFilter,
  OffersStats,
  OfferSortingOrder,
  OfferSorting,
  OffersState,
  OffersActions,
  OffersStore,
  OfferTrade,
};
export { OfferColumns };
