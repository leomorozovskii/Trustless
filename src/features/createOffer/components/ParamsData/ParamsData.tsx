import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import type { Address } from 'viem';
import { erc20Abi, getAddress } from 'viem';
import { useReadContracts } from 'wagmi';

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

  const { data: tokenDecimals } = useReadContracts(
    offerToState.to && {
      allowFailure: false,
      contracts: [
        {
          address: offerFromState.from,
          abi: erc20Abi,
          functionName: 'decimals',
        },
        {
          address: offerToState.to,
          abi: erc20Abi,
          functionName: 'decimals',
        },
      ],
    },
  );

  useEffect(() => {
    if (!tokenDecimals) return;
    setOfferFromState({ decimals: tokenDecimals[0] });
  }, [setOfferFromState, tokenDecimals]);

  useEffect(() => {
    if (!tokenDecimals) return;
    setOfferToState({ decimals: tokenDecimals[1] });
  }, [setOfferToState, tokenDecimals]);

  return null;
};

export { ParamsData };
