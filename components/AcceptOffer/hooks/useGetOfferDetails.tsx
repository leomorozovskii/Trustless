import { useEffect, useMemo, useState } from 'react';
import { Address, formatUnits, getAddress } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

import { trustlessOtcAbi } from '@assets/abis/trustlessOtcAbi';
import { useTokenInfo } from '@components/AcceptOffer/hooks/useTokenInfo';
import { environment } from '@lib/environment';

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

export const useGetOfferDetails = ({ id }: { id: string | null }) => {
  const memoizedId = useMemo(() => {
    if (!id) return BigInt(0);
    return BigInt(id);
  }, [id]);

  const {
    data: details,
    isLoading,
    error,
  } = useReadContract({
    address: environment.contractAddress,
    abi: trustlessOtcAbi,
    functionName: 'getOfferDetails',
    args: [memoizedId],
  });

  const { address } = useAccount();
  const { tokenDecimals: tokenFromDecimals, isCustom } = useTokenInfo({ address: details ? details[0] : '0x' });
  const { tokenDecimals: tokenToDecimals } = useTokenInfo({ address: details ? details[1] : '0x' });
  const [isCreator, setIsCreator] = useState<boolean | null>(null);

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
      tokenFrom: details[0],
      tokenTo: details[1],
      amountFrom: details[2],
      amountTo: details[3],
      creator: details[4],
      fee: details[5],
      active: details[6],
      completed: details[7],
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

  const rateToFrom = useMemo(() => {
    if (!details) return;
    if (!tokenFromDecimals) return;
    const amountFrom = formatUnits(details[2], tokenFromDecimals);
    if (!tokenToDecimals) return;
    const amountTo = formatUnits(details[3], tokenToDecimals);
    const result = Number(amountFrom) / Number(amountTo);
    if (Number.isNaN(result)) return;
    return String(result);
  }, [details, tokenToDecimals, tokenFromDecimals]);

  return {
    ...offerDetails,
    rateToFrom,
    isLoading,
    isCreator,
    error,
    isTokenFromCustom: isCustom,
  };
};
