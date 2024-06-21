import dayjs from 'dayjs';
import { formatUnits, getAddress } from 'viem';
import type { Address, Hash } from 'viem';
import { useAccount } from 'wagmi';

import { TOKEN_MAP, dayUnix } from '@berezka-dao/core/constants';
import { UnknownIcon } from '@berezka-dao/shared/icons/tokens';
import type { OffersQuery } from '@berezka-dao/shared/retrieve-data/useOffersQuery';
import { useOffersQuery, useOffersQueryKey } from '@berezka-dao/shared/retrieve-data/useOffersQuery';

import type { OfferTrade, OfferStatus, OfferFilter, OfferSorting } from '../types';

type UseOffersDetailsParams = {
  filter?: OfferFilter;
  searchFilter?: string;
  filters?: OfferFilter[];
  offset?: number;
  limit?: number;
  sorting?: OfferSorting | null;
};

const mkTransformOffersQueryData =
  (creator: Address) =>
  ({ tradeOffers }: OffersQuery): OfferTrade[] => {
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
        taker,
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
        const normalizedReceiver = optionalTaker && getAddress(optionalTaker);
        const normalizedTaker = taker && getAddress(taker);

        if (!tokenFromDetails) {
          tokenFromDetails = {
            address: normalizedAddressFrom,
            symbol: tokenFrom.symbol,
            decimals: Number(tokenFrom.decimals),
            logo: UnknownIcon,
          };
        }

        if (!tokenToDetails) {
          tokenToDetails = {
            address: normalizedAddressTo,
            symbol: tokenTo.symbol,
            decimals: Number(tokenTo.decimals),
            logo: UnknownIcon,
          };
        }

        let status: OfferStatus;

        if (active) {
          if (creator === normalizedReceiver) {
            status = 'forMe';
          } else {
            status = 'pending';
          }
        } else if (!completed) {
          status = 'cancelled';
        } else {
          if (creator === normalizedTaker) {
            status = 'acceptedByMe';
          } else {
            status = 'accepted';
          }
        }

        let txHash: Hash;

        if (active) {
          txHash = creationHash;
        } else if (!completed) {
          txHash = cancelHash;
        } else {
          txHash = takenHash;
        }

        let unixTimestamp: number;

        if (active) {
          unixTimestamp = creationTimestamp;
        } else if (!completed) {
          unixTimestamp = cancelTimestamp;
        } else {
          unixTimestamp = takenTimestamp;
        }

        return {
          id: tradeID,
          tokenFromDetails,
          tokenToDetails,
          receiver: normalizedReceiver,
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

const sortOffers = (data: OfferTrade[], sorting?: OfferSorting | null) => {
  return data.sort((offer_a, offer_b) => {
    if (!sorting) {
      return 0;
    }
    switch (sorting.field) {
      case 'ID':
        return sorting.order === 'asc' ? offer_a.id.localeCompare(offer_b.id) : offer_b.id.localeCompare(offer_a.id);
      case 'AssetFrom':
        return sorting.order === 'asc'
          ? offer_a.tokenFromDetails.symbol.localeCompare(offer_b.tokenFromDetails.symbol)
          : offer_b.tokenFromDetails.symbol.localeCompare(offer_a.tokenFromDetails.symbol);
      case 'AssetTo':
        return sorting.order === 'asc'
          ? offer_a.tokenToDetails.symbol.localeCompare(offer_b.tokenToDetails.symbol)
          : offer_b.tokenToDetails.symbol.localeCompare(offer_a.tokenToDetails.symbol);
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

const filterOffers = (data: OfferTrade[], filters: OfferFilter[], filter: OfferFilter, searchFilter?: string) => {
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
        tokenFromDetails: { symbol: tokenFromName },
        tokenToDetails: { symbol: tokenToName },
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

const paginateOffers = (data: OfferTrade[], offset?: number, limit?: number) => {
  return offset && limit ? data.slice(offset, offset + limit) : data;
};

const useOffersDetailsQueryKey = useOffersQueryKey;

const useOffersDetails = ({
  filter = 'all',
  filters = ['all'],
  offset,
  limit,
  searchFilter,
  sorting,
}: UseOffersDetailsParams) => {
  const account = useAccount();
  return useOffersQuery({
    variables: {
      filters: {
        or: [
          {
            creator: account.address,
          },
          {
            optionalTaker: account.address,
          },
          {
            taker: account.address,
          },
        ],
      },
    },
    select: (data) => {
      if (!account.address) {
        return [];
      }
      const offers = mkTransformOffersQueryData(account.address)(data);
      const filteredOffers = filterOffers(offers, filters, filter, searchFilter);
      const sortedOffers = sortOffers(filteredOffers, sorting);
      const paginatedOffers = paginateOffers(sortedOffers, offset, limit);
      return paginatedOffers;
    },
  });
};

export { useOffersDetails, useOffersDetailsQueryKey };
