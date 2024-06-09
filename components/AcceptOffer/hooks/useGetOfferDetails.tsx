import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { Address, formatUnits, getAddress } from 'viem';

import { useTokenInfo } from '@components/AcceptOffer/hooks/useTokenInfo';
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

export const useGetOfferDetails = ({ id }: { id: string | null }) => {
  const memoizedId = useMemo(() => {
    if (!id) return '0';
    return id;
  }, [id]);

  const {
    data: details,
    isLoading,
    error,
  } = useQuery({
    queryKey: [GET_OFFER_DETAILS_QUERY_KEY, memoizedId],
    queryFn: async () => {
      return subgraphClient.request<OfferDetailsQueryRaw>(OFFER_DETAILS_QUERY, { id: memoizedId }).then((data) => {
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

  const { address } = useAccount();
  const [isCreator, setIsCreator] = useState<boolean | null>(null);
  const [isReceiver, setIsReceiver] = useState<boolean | null>(null);
  const {
    tokenDecimals: tokenFromDecimals,
    isCustom,
    tokenValue,
  } = useTokenInfo({
    address: details ? details.tokenFrom.id : '0x',
    amount: details ? details.amountFrom : BigInt(0),
    withFee: true,
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

  useEffect(() => {
    if (!address || !offerDetails.creator) return;
    try {
      setIsCreator(getAddress(address) === getAddress(offerDetails.creator));
    } catch (e) {
      setIsCreator(false);
    }
  }, [address, offerDetails.creator]);

  useEffect(() => {
    if (!address || !details || !details.receiver) return;
    try {
      setIsReceiver(getAddress(address) === getAddress(details.receiver));
    } catch (e) {
      setIsReceiver(false);
    }
  }, [address, details]);

  const rateToFrom = useMemo(() => {
    if (!details || !tokenValue) return;
    if (!tokenFromDecimals) return;
    const amountFrom = tokenValue;
    if (!tokenToDecimals) return;
    const amountTo = formatUnits(details.amountTo, tokenToDecimals);
    const result = Number(amountFrom) / Number(amountTo);
    if (Number.isNaN(result)) return;
    return String(Number(result.toFixed(5)));
  }, [details, tokenToDecimals, tokenFromDecimals, tokenValue]);

  return {
    ...offerDetails,
    rateToFrom,
    isLoading,
    isCreator,
    isReceiver,
    error,
    isTokenFromCustom: isCustom,
  };
};
