import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAddress } from 'viem';

import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';

const ParamsData = () => {
  const searchParams = useSearchParams();
  const { setOfferToState, setOfferFromState, userTokens } = useOfferCreateContext();

  useEffect(() => {
    const tokenFromParam = searchParams.get('tokenFrom');
    let validatedTokenFrom = '';

    if (tokenFromParam) {
      try {
        validatedTokenFrom = getAddress(tokenFromParam);
        const includes = userTokens.find((token) => token.address === validatedTokenFrom);
        if (!includes || includes.balance === '0') {
          validatedTokenFrom = '';
        }
      } catch (error) {
        validatedTokenFrom = '';
      }
    }

    setOfferFromState({
      from: validatedTokenFrom,
    });
  }, [searchParams, setOfferFromState, userTokens]);

  useEffect(() => {
    const tokenToParam = searchParams.get('tokenTo');
    const amountToParam = searchParams.get('amountTo');
    const receiverParam = searchParams.get('receiver');
    const amountFromParam = searchParams.get('amountFrom');

    let validatedTokenTo = '';
    let validatedReceiver = '';

    if (tokenToParam) {
      try {
        validatedTokenTo = getAddress(tokenToParam);
      } catch (error) {
        validatedTokenTo = '';
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
      amount: amountFromParam || '',
      rate: '',
    });

    setOfferToState({
      to: validatedTokenTo,
      amount: amountToParam || '',
      receiver: validatedReceiver,
    });
  }, []);

  return null;
};

export default ParamsData;
