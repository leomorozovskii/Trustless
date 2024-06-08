import { useEffect } from 'react';
import { getAddress } from 'viem';
import { useSearchParams } from 'next/navigation';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';

const ParamsData = () => {
  const searchParams = useSearchParams();
  const { setOfferToState, setOfferFromState } = useOfferCreateContext();

  useEffect(() => {
    const tokenToParam = searchParams.get('tokenTo');
    const amountToParam = searchParams.get('amountTo');
    const receiverParam = searchParams.get('receiver');
    const tokenFromParam = searchParams.get('tokenFrom');
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
      rate: 0,
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
