import { useMemo } from 'react';
import { Address, formatUnits, getAddress } from 'viem';

import { useTokenInfo } from '@components/AcceptOffer/hooks/useTokenInfo';
import { useOfferAcceptContext } from '@context/offer/accept/OfferAcceptContext';
import { useQuery } from '@tanstack/react-query';
import { subgraphClient } from '@lib/subgraphClient';

interface OfferDetails {
  tokenFrom: Address;
  tokenTo: Address;
  amountFrom: bigint;
  amountTo: bigint;
  creator: Address;
  receiver: Address;
  fee: bigint;
  active: boolean;
  completed: boolean;
}
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
    amountFromWithFee: string;
    amountTo: string;
    creator: Address;
    active: boolean;
    optionalTaker: Address;
    completed: boolean;
  };
};

export const useGetOfferDetails = () => {
  const { acceptId } = useOfferAcceptContext();

  const {
    data: details,
    isLoading,
    error,
  } = useQuery({
    queryKey: [GET_OFFER_DETAILS_QUERY_KEY, acceptId],
    queryFn: async () => {
      return subgraphClient.request<OfferDetailsQueryRaw>(OFFER_DETAILS_QUERY, { id: acceptId }).then((data) => {
        const amountFrom = BigInt(data.tradeOffer.amountFrom);
        const amountTo = BigInt(data.tradeOffer.amountTo);
        const fee = amountFrom - BigInt(data.tradeOffer.amountFromWithFee);
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
          amountTo,
          creator: getAddress(data.tradeOffer.creator),
          receiver: getAddress(data.tradeOffer.optionalTaker),
          fee,
          active: data.tradeOffer.active,
          completed: data.tradeOffer.completed,
        };
      });
    },
  });

  const { tokenDecimals: tokenFromDecimals, isCustom } = useTokenInfo({
    address: details ? details.tokenFrom.id : '0x',
  });
  const { tokenDecimals: tokenToDecimals } = useTokenInfo({ address: details ? details.tokenTo.id : '0x' });

  const offerDetails: OfferDetails = useMemo(() => {
    if (!details) {
      return {
        tokenFrom: '' as Address,
        tokenTo: '' as Address,
        amountFrom: BigInt(0),
        amountTo: BigInt(0),
        creator: '' as Address,
        receiver: '' as Address,
        fee: BigInt(0),
        active: false,
        completed: false,
      };
    }

    return {
      tokenFrom: details.tokenFrom.id,
      tokenTo: details.tokenTo.id,
      amountFrom: details.amountFrom,
      amountTo: details.amountTo,
      creator: details.creator,
      fee: details.fee,
      active: details.active,
      receiver: details.receiver,
      completed: details.completed,
    };
  }, [details]);

  const rateToFrom = useMemo(() => {
    if (!details) return;
    if (!tokenFromDecimals) return;
    const amountFrom = formatUnits(details.amountFrom, tokenFromDecimals);
    if (!tokenToDecimals) return;
    const amountTo = formatUnits(details.amountTo, tokenToDecimals);
    const result = Number(amountFrom) / Number(amountTo);
    if (Number.isNaN(result)) return;
    return Number(result).toFixed(2);
  }, [details, tokenToDecimals, tokenFromDecimals]);

  return {
    ...offerDetails,
    rateToFrom,
    isLoading,
    error,
    isTokenFromCustom: isCustom,
  };
};
