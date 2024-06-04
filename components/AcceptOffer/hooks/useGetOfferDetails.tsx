import { useMemo } from 'react';
import { Address, formatUnits } from 'viem';
import { useReadContract } from 'wagmi';

import { trustlessOtcAbi } from '@assets/abis/trustlessOtcAbi';
import { useTokenInfo } from '@components/AcceptOffer/hooks/useTokenInfo';
import { useOfferContext } from '@context/offer/OfferContext';
import { environment } from '@/environment';

interface OfferDetails {
  tokenFrom: Address;
  tokenTo: Address;
  amountFrom: bigint;
  amountTo: bigint;
  creator: Address;
  fee: bigint;
  active: boolean;
  completed: boolean;
}

export const useGetOfferDetails = () => {
  const { acceptId } = useOfferContext();
  const memoizedId = useMemo(() => {
    if (!acceptId) return BigInt(0);
    return BigInt(acceptId);
  }, [acceptId]);

  const {
    data: details,
    isLoading,
    error,
  } = useReadContract({
    address: environment.contractAddress as Address,
    abi: trustlessOtcAbi,
    functionName: 'getOfferDetails',
    args: [memoizedId],
  });

  const { tokenDecimals: tokenFromDecimals, isCustom } = useTokenInfo(
    details ? (details[0] as Address) : ('' as Address),
  );
  const { tokenDecimals: tokenToDecimals } = useTokenInfo(details ? (details[1] as Address) : ('' as Address));

  const offerDetails: OfferDetails = useMemo(() => {
    if (!details) {
      return {
        tokenFrom: '' as Address,
        tokenTo: '' as Address,
        amountFrom: BigInt(0),
        amountTo: BigInt(0),
        creator: '' as Address,
        fee: BigInt(0),
        active: false,
        completed: false,
      };
    }

    return {
      tokenFrom: details[0] as Address,
      tokenTo: details[1] as Address,
      amountFrom: details[2],
      amountTo: details[3],
      creator: details[4] as Address,
      fee: details[5],
      active: details[6],
      completed: details[7],
    };
  }, [details]);

  const rate = useMemo(() => {
    if (!details) return;
    if (!tokenFromDecimals) return;
    const num1 = formatUnits(details[2], tokenFromDecimals);
    if (!tokenToDecimals) return;
    const num2 = formatUnits(details[3], tokenToDecimals);
    const result = Number(num1) / Number(num2);
    if (Number.isNaN(result)) return;
    return Number(result).toFixed(2);
  }, [details, tokenToDecimals, tokenFromDecimals]);

  return {
    ...offerDetails,
    rate,
    isLoading,
    error,
    isTokenFromCustom: isCustom,
  };
};
