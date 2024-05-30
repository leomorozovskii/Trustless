import { OfferState } from '@lib/constants';
import type { TableInstance } from 'react-table';

export enum OffersColumnAccessors {
  ID = 'id',
  FROM_ASSET = 'fromAsset',
  TO_ASSET = 'toAsset',
  AMOUNT1 = 'amount1',
  AMOUNT2 = 'amount2',
  RATE = 'rate',
  ADDRESS = 'address',
  STATUS = 'status',
  DATE = 'date',
  SHARE = 'share',
}

export interface IOffer {
  id: number;
  fromAssetName: string;
  toAssetName: string;
  fromAsset: string;
  toAsset: string;
  amount1: string;
  amount2: string;
  rate: string;
  address: string;
  status: OfferState;
  date: string;
}

export type OffersTableTypeWorkaround<T extends Object> = TableInstance<T> & {
  gotoPage: (index: number) => void;
  state: {
    pageIndex: number;
    pageSize: number;
  };
};

// TODO: fix types
export interface IOffersContext {
  table: any;
  statusCounts: {
    [key: string]: number;
  };
  searchQuery: string;
  // TODO: fix types
  tabs: any[];
  selectedOffer: IOffer | null;
  toggleOfferSelection: (offer: IOffer) => void;
  activeTab: OfferState;
  handleTabClick: (status: OfferState) => void;
  handleSearch: (e: string) => void;
  handleFilterStatus: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
