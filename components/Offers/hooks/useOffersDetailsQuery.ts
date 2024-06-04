import { environment } from '@/environment';
import { trustlessOtcAbi } from '@assets/abis/trustlessOtcAbi';
import { Address, erc20Abi, formatUnits } from 'viem';
import { Config, useAccount, useConfig } from 'wagmi';
import { readContract, readContracts } from 'wagmi/actions';
import { TOKEN_MAP, TokenData } from '@lib/constants';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { UnknownIcon } from '@assets/icons/tokens';
import { OfferTrade, OfferStatus, OfferFilter, OfferSorting } from '../types';

type UseOffersDetailsQueryOptions = {
  filter: OfferFilter;
  searchFilter: string;
  filters: OfferFilter[];
  offset: number;
  limit: number;
  sorting: OfferSorting | null;
};

const getTokenData = async (config: Config, token: Address): Promise<TokenData> => {
  const [decimals, symbol] = await readContracts(config, {
    allowFailure: false,
    contracts: [
      { address: token, functionName: 'decimals', abi: erc20Abi },
      { address: token, functionName: 'symbol', abi: erc20Abi },
    ],
  });
  return {
    address: token,
    name: symbol,
    logo: UnknownIcon,
    decimals,
  };
};

const mkTransformOfferDetails =
  (config: Config, id: bigint) =>
  async ([tokenFrom, tokenTo, amountFrom, amountTo, creator, , active, completed]: readonly [
    Address,
    Address,
    bigint,
    bigint,
    Address,
    bigint,
    boolean,
    boolean,
  ]): Promise<OfferTrade> => {
    let tokenFromDetails = TOKEN_MAP[tokenFrom.toLowerCase()];
    let tokenToDetails = TOKEN_MAP[tokenTo.toLowerCase()];

    if (!tokenFromDetails) {
      tokenFromDetails = await getTokenData(config, tokenFrom);
    }

    if (!tokenToDetails) {
      tokenToDetails = await getTokenData(config, tokenTo);
    }

    let status: OfferStatus;

    if (active) {
      status = 'open';
    } else if (!completed) {
      status = 'cancelled';
    } else {
      status = 'accepted';
    }

    return {
      id: id.toString(),
      tokenFromDetails,
      tokenToDetails,
      amountFrom: Number(formatUnits(amountFrom, tokenFromDetails.decimals)),
      amountTo: Number(formatUnits(amountTo, tokenToDetails.decimals)),
      address: creator, // TODO :: replace this after answer about address field
      status,
    };
  };

const sortData = (data: OfferTrade[], sorting: OfferSorting | null) => {
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
      case 'Address':
        return sorting.order === 'asc'
          ? offer_a.address.localeCompare(offer_b.address)
          : offer_b.address.localeCompare(offer_a.address);
      case 'Status':
        return sorting.order === 'asc'
          ? offer_a.status.localeCompare(offer_b.status)
          : offer_b.status.localeCompare(offer_a.status);
      default:
        return 0;
    }
  });
};

const filterData = (data: OfferTrade[], filters: OfferFilter[], filter: OfferFilter, searchFilter: string) => {
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

const paginateData = (data: OfferTrade[], offset: number, limit: number) => {
  return data.slice(offset, offset + limit);
};

const UseOffersDetailsQueryKey = 'offersDetails';

const useOffersDetailsQuery = ({
  filter,
  offset,
  limit,
  filters,
  searchFilter,
  sorting,
}: UseOffersDetailsQueryOptions) => {
  const account = useAccount();
  const wagmiConfig = useConfig();
  return useQuery({
    placeholderData: keepPreviousData,
    queryKey: [UseOffersDetailsQueryKey, account.address],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      if (!account.address) {
        return [];
      }
      const userTrades = await readContract(wagmiConfig, {
        address: environment.contractAddress as Address,
        functionName: 'getUserTrades',
        abi: trustlessOtcAbi,
        args: [account.address],
      });
      const offers = await Promise.all(
        userTrades.map((offerId) =>
          readContract(wagmiConfig, {
            address: environment.contractAddress as Address,
            functionName: 'getOfferDetails',
            abi: trustlessOtcAbi,
            args: [offerId],
          }).then(mkTransformOfferDetails(wagmiConfig, offerId)),
        ),
      );
      return offers;
    },
    select: (data) => {
      const sortedData = sortData(data, sorting);
      const filteredData = filterData(sortedData, filters, filter, searchFilter);
      const paginatedData = paginateData(filteredData, offset, limit);
      return { offers: paginatedData, total: filteredData.length };
    },
  });
};

export { useOffersDetailsQuery, UseOffersDetailsQueryKey };
