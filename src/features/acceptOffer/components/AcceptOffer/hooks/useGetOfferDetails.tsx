import { useQuery } from '@tanstack/react-query';
import type { Address } from 'viem';
import { formatUnits, getAddress } from 'viem';
import { useAccount } from 'wagmi';

import { subgraphClient } from '@berezka-dao/core/configs';
import {
  getIsCreator,
  getIsReceiver,
  getIsTokenCustom,
  getRateToFrom,
} from '@berezka-dao/features/acceptOffer/components/AcceptOffer/utils/utils';

const OFFER_DETAILS_QUERY = `
  query OfferDetails($id: BigInt!) {
    tradeOffer(id: $id) {
      tokenFrom {
        ...TokenFragment
      }
      tokenTo {
        ...TokenFragment
      }
      amountFrom
      amountFromWithFee
      amountTo
      creator
      active
      optionalTaker
      completed
    }
  }

  fragment TokenFragment on Token {
    decimals
    symbol
    id
  }
`;

const GET_OFFER_DETAILS_QUERY_KEY = 'GET_OFFER_DETAILS';

type OfferDetailsQueryRaw = {
  tradeOffer: {
    tokenFrom: {
      id: Address;
      symbol: string;
      decimals: string;
    };
    tokenTo: {
      id: Address;
      symbol: string;
      decimals: string;
    };
    amountFrom: string;
    formattedAmountFrom: string;
    amountFromWithFee: string;
    amountTo: string;
    formattedAmountTo: string;
    creator: Address;
    isCreator: boolean | undefined;
    receiver: Address;
    isReceiver: boolean | undefined;
    fee: bigint;
    rateToFrom: number;
    isTokenFromCustom: boolean;
    active: boolean;
    optionalTaker: Address;
    completed: boolean;
  };
};

export const useGetOfferDetails = ({ id }: { id: string }) => {
  const { address } = useAccount();
  const {
    data: details,
    isLoading,
    error,
  } = useQuery({
    queryKey: [GET_OFFER_DETAILS_QUERY_KEY, id, address],
    queryFn: async () => {
      return subgraphClient.request<OfferDetailsQueryRaw>(OFFER_DETAILS_QUERY, { id: id }).then((data) => {
        const amountFrom = BigInt(data.tradeOffer.amountFrom);
        const amountTo = BigInt(data.tradeOffer.amountTo);
        const formattedAmountFrom = formatUnits(
          BigInt(data.tradeOffer.amountFromWithFee),
          Number(data.tradeOffer.tokenFrom.decimals),
        );
        const formattedAmountTo = formatUnits(
          BigInt(data.tradeOffer.amountTo),
          Number(data.tradeOffer.tokenTo.decimals),
        );
        const fee = amountFrom - BigInt(data.tradeOffer.amountFromWithFee);

        const isTokenFromCustom = getIsTokenCustom(getAddress(data.tradeOffer.tokenFrom.id));
        const isCreator = getIsCreator(address, data.tradeOffer.creator);
        const isReceiver = getIsReceiver(address, data.tradeOffer.optionalTaker);

        const rateToFrom = getRateToFrom(
          data.tradeOffer.amountFromWithFee,
          data.tradeOffer.amountTo,
          data.tradeOffer.tokenTo.decimals,
          data.tradeOffer.tokenFrom.decimals,
        );

        return {
          tokenFrom: {
            ...data.tradeOffer.tokenFrom,
            id: getAddress(data.tradeOffer.tokenFrom.id),
          },
          tokenTo: {
            ...data.tradeOffer.tokenTo,
            id: getAddress(data.tradeOffer.tokenTo.id),
          },
          amountFrom,
          formattedAmountFrom,
          amountTo,
          formattedAmountTo,
          creator: getAddress(data.tradeOffer.creator),
          receiver: getAddress(data.tradeOffer.optionalTaker),
          fee,
          isCreator,
          isReceiver,
          rateToFrom,
          isTokenFromCustom: isTokenFromCustom,
          active: data.tradeOffer.active,
          completed: data.tradeOffer.completed,
        };
      });
    },
  });

  return {
    ...details,
    isLoading,
    error,
  };
};
