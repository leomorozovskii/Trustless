import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAddress } from 'viem';

import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';

const ParamsData = () => {
  const searchParams = useSearchParams();
  const { setOfferToState, setOfferFromState } = useOfferCreateContext();

  useEffect(() => {
    const tokenFromParam = searchParams.get('tokenFrom');
    const tokenToParam = searchParams.get('tokenTo');
    const amountToParam = searchParams.get('amountTo');
    const receiverParam = searchParams.get('receiver');
    const amountFromParam = searchParams.get('amountFrom');

    let validatedTokenFrom = '';
    let validatedTokenTo = '';
    let validatedReceiver = '';

    if (tokenFromParam) {
      try {
        validatedTokenFrom = getAddress(tokenFromParam);
      } catch (error) {
        validatedTokenFrom = '';
      }
    }

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
      from: validatedTokenFrom,
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
