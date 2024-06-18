import { keepPreviousData, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { gql } from 'graphql-request';
import { formatUnits, getAddress } from 'viem';
import type { Address, Hash } from 'viem';
import { useAccount } from 'wagmi';

import { subgraphClient } from '@berezka-dao/core/configs';
import { TOKEN_MAP, dayUnix } from '@berezka-dao/core/constants';
import { UnknownIcon } from '@berezka-dao/shared/icons/tokens';

import type { OfferTrade, OfferStatus, OfferFilter, OfferSorting } from '../types';

type UseOffersDetailsQueryOptions = {
  filter?: OfferFilter;
  searchFilter?: string;
  filters?: OfferFilter[];
  offset?: number;
  limit?: number;
  sorting?: OfferSorting | null;
};

type OffersDetailsRawTokenFragment = {
  decimals: string;
  symbol: string;
  id: Address;
};

type OffersDetailsRawQuery = {
  tradeOffers: {
    creationHash: Hash;
    creationTimestamp: number;
    cancelTimestamp: number;
    cancelHash: Hash;
    completed: boolean;
    amountTo: string;
    amountFrom: string;
    amountFromWithFee: string;
    active: boolean;
    optionalTaker: Address;
    takenHash: Hash;
    takenTimestamp: number;
    tokenFrom: OffersDetailsRawTokenFragment;
    tokenTo: OffersDetailsRawTokenFragment;
    tradeID: string;
  }[];
};

const OFFERS_DETAILS_QUERY = gql`
  query OffersDetails(
    $filters: TradeOffer_filter
    $skip: Int
    $first: Int
    $orderBy: TradeOffer_orderBy
    $orderDirection: OrderDirection
  ) {
    tradeOffers(where: $filters, skip: $skip, first: $first, orderBy: $orderBy, orderDirection: $orderDirection) {
      optionalTaker
      creationHash
      creationTimestamp
      cancelTimestamp
      cancelHash
      completed
      amountTo
      amountFrom
      amountFromWithFee
      active
      takenHash
      takenTimestamp
      tokenFrom {
        ...TokenFragment
      }
      tokenTo {
        ...TokenFragment
      }
      tradeID
    }
  }

  fragment TokenFragment on Token {
    decimals
    symbol
    id
  }
`;

const transformOfferDetailsRawData = ({ tradeOffers }: OffersDetailsRawQuery): OfferTrade[] => {
  return tradeOffers.map(
    ({
      creationHash,
      creationTimestamp,
      cancelTimestamp,
      cancelHash,
      completed,
      amountTo,
      amountFrom,
      amountFromWithFee,
      optionalTaker,
      active,
      takenHash,
      takenTimestamp,
      tokenFrom,
      tokenTo,
      tradeID,
    }) => {
      const normalizedAddressFrom = getAddress(tokenFrom.id);
      const normalizedAddressTo = getAddress(tokenTo.id);
      let tokenFromDetails = TOKEN_MAP[normalizedAddressFrom];
      let tokenToDetails = TOKEN_MAP[normalizedAddressTo];

      if (!tokenFromDetails) {
        tokenFromDetails = {
          address: normalizedAddressFrom,
          name: tokenFrom.symbol,
          decimals: Number(tokenFrom.decimals),
          logo: UnknownIcon,
        };
      }

      if (!tokenToDetails) {
        tokenToDetails = {
          address: normalizedAddressTo,
          name: tokenTo.symbol,
          decimals: Number(tokenTo.decimals),
          logo: UnknownIcon,
        };
      }

      let status: OfferStatus;

      if (active) {
        status = 'pending';
      } else if (!completed) {
        status = 'cancelled';
      } else {
        status = 'accepted';
      }

      let txHash: Hash;

      if (status === 'pending') {
        txHash = creationHash;
      } else if (status === 'cancelled') {
        txHash = cancelHash;
      } else {
        txHash = takenHash;
      }

      let unixTimestamp: number;

      if (status === 'pending') {
        unixTimestamp = creationTimestamp;
      } else if (status === 'cancelled') {
        unixTimestamp = cancelTimestamp;
      } else {
        unixTimestamp = takenTimestamp;
      }

      return {
        id: tradeID,
        tokenFromDetails,
        tokenToDetails,
        receiver: optionalTaker,
        amountFrom: Number(formatUnits(BigInt(amountFrom), tokenFromDetails.decimals)),
        amountTo: Number(formatUnits(BigInt(amountTo), tokenToDetails.decimals)),
        amountFromWithFee: Number(formatUnits(BigInt(amountFromWithFee), tokenFromDetails.decimals)),
        txHash,
        status,
        unixTimestamp,
        recentlyAccepted: status === 'accepted' && unixTimestamp > dayjs().unix() - dayUnix,
      };
    },
  );
};

const sortData = (data: OfferTrade[], sorting?: OfferSorting | null) => {
  return data.sort((offer_a, offer_b) => {
    if (!sorting) {
      return 0;
    }
    switch (sorting.field) {
      case 'ID':
        return sorting.order === 'asc' ? offer_a.id.localeCompare(offer_b.id) : offer_b.id.localeCompare(offer_a.id);
      case 'AssetFrom':
        return sorting.order === 'asc'
          ? offer_a.tokenFromDetails.name.localeCompare(offer_b.tokenFromDetails.name)
          : offer_b.tokenFromDetails.name.localeCompare(offer_a.tokenFromDetails.name);
      case 'AssetTo':
        return sorting.order === 'asc'
          ? offer_a.tokenToDetails.name.localeCompare(offer_b.tokenToDetails.name)
          : offer_b.tokenToDetails.name.localeCompare(offer_a.tokenToDetails.name);
      case 'AmountFrom':
        return sorting.order === 'asc'
          ? offer_a.amountFrom - offer_b.amountFrom
          : offer_b.amountFrom - offer_a.amountFrom;
      case 'AmountTo':
        return sorting.order === 'asc' ? offer_a.amountTo - offer_b.amountTo : offer_b.amountTo - offer_a.amountTo;
      case 'Rate':
        return sorting.order === 'asc'
          ? offer_a.amountTo / offer_a.amountFrom - offer_b.amountTo / offer_b.amountFrom
          : offer_b.amountTo / offer_b.amountFrom - offer_a.amountTo / offer_a.amountFrom;
      case 'TxHash':
        return sorting.order === 'asc'
          ? offer_a.txHash.localeCompare(offer_b.txHash)
          : offer_b.txHash.localeCompare(offer_a.txHash);
      case 'Status':
        return sorting.order === 'asc'
          ? offer_a.status.localeCompare(offer_b.status)
          : offer_b.status.localeCompare(offer_a.status);
      case 'Date':
        return sorting.order === 'asc'
          ? offer_a.unixTimestamp - offer_b.unixTimestamp
          : offer_b.unixTimestamp - offer_a.unixTimestamp;
      default:
        return 0;
    }
  });
};

const filterData = (data: OfferTrade[], filters: OfferFilter[], filter: OfferFilter, searchFilter?: string) => {
  return data
    .filter((offer) => {
      if (filter === 'all') {
        if (filters.length === 0) {
          return true;
        }
        return filters.includes(offer.status);
      }
      return offer.status === filter;
    })
    .filter((offer) => {
      const {
        id,
        tokenFromDetails: { name: tokenFromName },
        tokenToDetails: { name: tokenToName },
      } = offer;
      if (!searchFilter) {
        return true;
      }
      return (
        tokenFromName.toLowerCase().startsWith(searchFilter.toLowerCase()) ||
        tokenToName.toLowerCase().startsWith(searchFilter.toLowerCase()) ||
        id.startsWith(searchFilter)
      );
    });
};

const paginateData = (data: OfferTrade[], offset?: number, limit?: number) => {
  return offset && limit ? data.slice(offset, offset + limit) : data;
};

const UseOffersDetailsQueryKey = 'offersDetails';

const useOffersDetailsQuery = ({
  filter = 'all',
  filters = ['all'],
  offset,
  limit,
  searchFilter,
  sorting,
}: UseOffersDetailsQueryOptions) => {
  const account = useAccount();
  return useQuery({
    placeholderData: keepPreviousData,
    queryKey: [UseOffersDetailsQueryKey, account.address],
    refetchInterval: 1000 * 30,
    queryFn: async () => {
      if (!account.address) {
        return [];
      }

      const offers = await subgraphClient
        .request<OffersDetailsRawQuery>(OFFERS_DETAILS_QUERY, {
          filters: {
            creator: account.address,
          },
        })
        .then(transformOfferDetailsRawData);
      return offers;
    },
    select: (offers) => {
      const filteredOffers = filterData(offers, filters, filter, searchFilter);
      const sortedOffers = sortData(filteredOffers, sorting);
      const paginatedOffers = paginateData(sortedOffers, offset, limit);
      return paginatedOffers;
    },
  });
};

export { useOffersDetailsQuery, UseOffersDetailsQueryKey };
