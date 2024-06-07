import { TokenData } from '@lib/constants';
import { Hash } from 'viem';

export type OfferStatus = 'open' | 'accepted' | 'cancelled';

export type OfferFilter = OfferStatus | 'all';

export enum OfferColumns {
  ID = 'ID',
  AssetFrom = 'AssetFrom',
  AssetTo = 'AssetTo',
  AmountFrom = 'AmountFrom',
  AmountTo = 'AmountTo',
  Rate = 'Rate',
  TxHash = 'TxHash',
  Status = 'Status',
  Date = 'Date',
  Share = 'Share',
}

export interface OffersStats {
  accepted: number;
  cancelled: number;
  open: number;
  total: number;
}

export type OfferSortingOrder = 'asc' | 'desc';

export interface OfferSorting {
  field: OfferColumns;
  order: OfferSortingOrder;
}

export interface OffersState {
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

export interface OffersActions {
  setSearchFilter: (searchFilter: string) => void;
  setFilter: (filter: OfferFilter) => void;
  setSorting: (sorting: OfferSorting | null) => void;
  setSelection: (selectedId: string | null) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export interface OffersStore extends OffersState, OffersActions {}

export interface OfferTrade {
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
}
