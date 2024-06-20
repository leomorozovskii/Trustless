import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import type { Address } from 'viem';
import { getAddress } from 'viem';
import { useReadContracts } from 'wagmi';

import { customErc20Abi } from '@berezka-dao/core/abis/customErc20Abi';
import { useOfferCreateContext } from '@berezka-dao/features/createOffer/store';

const ParamsData = () => {
  const searchParams = useSearchParams();
  const { setOfferToState, setOfferFromState, offerFromState, offerToState } = useOfferCreateContext();

  useEffect(() => {
    const tokenFromParam = searchParams.get('tokenFrom');
    const tokenToParam = searchParams.get('tokenTo');
    const amountToParam = searchParams.get('amountTo');
    const receiverParam = searchParams.get('receiver');
    const amountFromParam = searchParams.get('amountFrom');

    let validatedTokenFrom: Address | undefined;
    let validatedTokenTo: Address | undefined;
    let validatedReceiver = '';

    if (tokenFromParam) {
      try {
        validatedTokenFrom = getAddress(tokenFromParam);
      } catch (error) {
        validatedTokenFrom = undefined;
      }
    }

    if (tokenToParam) {
      try {
        validatedTokenTo = getAddress(tokenToParam);
      } catch (error) {
        validatedTokenTo = undefined;
      }
    }

    if (receiverParam) {
      try {
        validatedReceiver = getAddress(receiverParam);
      } catch (error) {
        validatedReceiver = '';
      }
    }

    setOfferFromState({
      from: validatedTokenFrom,
      amount: amountFromParam || '',
      rate: '',
    });

    setOfferToState({
      to: validatedTokenTo,
      amount: amountToParam || '',
      receiver: validatedReceiver,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: [tokenFromDecimals, tokenToDecimals] = [] } = useReadContracts(
    offerToState.to && {
      allowFailure: false,
      contracts: [
        {
          address: offerFromState.from,
          abi: customErc20Abi,
          functionName: 'decimals',
        },
        {
          address: offerToState.to,
          abi: customErc20Abi,
          functionName: 'decimals',
        },
      ],
    },
  );

  useEffect(() => {
    if (!tokenFromDecimals) return;
    setOfferFromState({ decimals: tokenFromDecimals });
  }, [setOfferFromState, tokenFromDecimals]);

  useEffect(() => {
    if (!tokenToDecimals) return;
    setOfferToState({ decimals: tokenToDecimals });
  }, [setOfferToState, tokenToDecimals]);

  return null;
};

export { ParamsData };
