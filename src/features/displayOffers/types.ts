import type { Hash } from 'viem';

import type { TokenData } from '@berezka-dao/core/types/tokenData';

type OfferStatus = 'pending' | 'accepted' | 'cancelled' | 'forMe' | 'acceptedByMe';

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

type OffersStats = {
  accepted: number;
  cancelled: number;
  pending: number;
  forMe: number;
  acceptedByMe: number;
  total: number;
};

type OfferSortingOrder = 'asc' | 'desc';

type OfferSorting = {
  field: OfferColumns;
  order: OfferSortingOrder;
};

type OffersState = {
  selection: OfferTrade | null;
  sorting: OfferSorting | null;
  filter: OfferFilter;
  filters: OfferFilter[];
  searchFilter: string;
  pagination: {
    offset: number;
    limit: number;
  };
};

type OffersActions = {
  setSearchFilter: (searchFilter: string) => void;
  setFilter: (filter: OfferFilter) => void;
  setSorting: (sorting: OfferSorting | null) => void;
  setSelection: (selected: OfferTrade | null) => void;
  nextPage: () => void;
  prevPage: () => void;
};

type OffersStore = OffersState & OffersActions;

type OfferTrade = {
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
};

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
