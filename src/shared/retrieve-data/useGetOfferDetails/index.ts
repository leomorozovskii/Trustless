import { useQuery } from '@tanstack/react-query';
import { formatUnits, getAddress } from 'viem';
import { useAccount } from 'wagmi';

import { subgraphClient } from '@berezka-dao/core/configs';

import { OFFER_DETAILS_QUERY } from './query';
import type { OfferDetails, OfferDetailsQueryRaw } from './types';
import { getIsCreator, getIsReceiver, getIsTokenCustom, getRateToFrom } from './utils';

const GET_OFFER_DETAILS_QUERY_KEY = 'GET_OFFER_DETAILS';

export const useGetOfferDetails = ({ id }: { id: string }) => {
  const { address } = useAccount();
  const {
    data: details,
    isLoading,
    error,
  } = useQuery({
    queryKey: [GET_OFFER_DETAILS_QUERY_KEY, id, address],
    queryFn: async (): Promise<OfferDetails> => {
      const subgraphData = await subgraphClient
        .request<OfferDetailsQueryRaw>(OFFER_DETAILS_QUERY, { id: id })
        .then((data) => {
          const amountFrom = BigInt(data.tradeOffer.amountFrom);
          const amountTo = BigInt(data.tradeOffer.amountTo);
          const amountFromWithFee = BigInt(data.tradeOffer.amountFromWithFee);

          return {
            tokenFrom: {
              ...data.tradeOffer.tokenFrom,
              address: getAddress(data.tradeOffer.tokenFrom.id),
            },
            tokenTo: {
              ...data.tradeOffer.tokenTo,
              address: getAddress(data.tradeOffer.tokenTo.id),
            },
            amountFromWithFee,
            amountFrom,
            amountTo,
            creator: getAddress(data.tradeOffer.creator),
            optionalTaker: getAddress(data.tradeOffer.optionalTaker),
            active: data.tradeOffer.active,
            completed: data.tradeOffer.completed,
          };
        });

      const formattedAmountFrom = formatUnits(
        BigInt(subgraphData.amountFromWithFee),
        Number(subgraphData.tokenFrom.decimals),
      );
      const formattedAmountTo = formatUnits(BigInt(subgraphData.amountTo), Number(subgraphData.tokenTo.decimals));
      const fee = subgraphData.amountFrom - BigInt(subgraphData.amountFromWithFee);

      const isTokenFromCustom = getIsTokenCustom(getAddress(subgraphData.tokenFrom.address));
      const isCreator = address && getIsCreator(address, subgraphData.creator);
      const isReceiver = address && getIsReceiver(address, subgraphData.optionalTaker);

      const rateToFrom = getRateToFrom(
        subgraphData.amountFromWithFee,
        subgraphData.amountTo,
        subgraphData.tokenTo.decimals,
        subgraphData.tokenFrom.decimals,
      );

      return {
        ...subgraphData,
        formattedAmountFrom,
        formattedAmountTo,
        isTokenFromCustom,
        isCreator,
        isReceiver,
        rateToFrom,
        fee,
      };
    },
  });

  return {
    ...details,
    isLoading,
    error,
  };
};
