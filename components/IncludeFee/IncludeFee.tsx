import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tooltip } from 'react-tooltip';
import { Address } from 'viem';

import { InfoIcon } from '@assets/icons';
import { Checkbox } from '@components/Checkbox';
import { useTokenInfo } from '@components/AcceptOffer/hooks/useTokenInfo';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { useGetFee } from '@components/AcceptOffer/hooks/useGetFee';

import s from './IncludeFee.module.scss';

const IncludeFee = () => {
  const searchParams = useSearchParams();
  const { offerFromState, setOfferFromState, setOfferToState, setIsIncluded, isIncluded } = useOfferCreateContext();
  const [originalAmount, setOriginalAmount] = useState<string>(offerFromState.amount);
  const { calculatedFee } = useGetFee();
  const { tokenName, tokenValue } = useTokenInfo({
    address: offerFromState.from as Address,
    withFee: true,
  });

  const tokenFromParam = searchParams.get('tokenFrom');
  const tokenToParam = searchParams.get('tokenTo');
  const amountFromParam = searchParams.get('amountFrom');
  const amountToParam = searchParams.get('amountTo');
  const receiverParam = searchParams.get('receiver');

  useEffect(() => {
    if (searchParams) {
      setOfferFromState({
        from: tokenFromParam || '',
        amount: amountFromParam || '',
        rate: 0,
      });
      setOfferToState({
        to: tokenToParam || '',
        amount: amountToParam || '',
        receiver: receiverParam || '',
      });
    }
  }, [tokenFromParam, tokenToParam, amountFromParam, amountToParam, receiverParam]);

  const fee = useMemo(() => {
    if (!originalAmount || !calculatedFee) return;
    return Number(calculatedFee * Number(offerFromState.amount));
  }, [calculatedFee, originalAmount]);

  useEffect(() => {
    if (offerFromState.amount !== originalAmount && !isIncluded) {
      setOriginalAmount(offerFromState.amount);
    }
  }, [offerFromState.amount, isIncluded]);

  const handleCheckboxChange = () => {
    if (isIncluded) {
      setOfferFromState({ amount: originalAmount });
      setIsIncluded(false);
    } else {
      const newAmount = String(Number(originalAmount) + Number(tokenValue));
      setOfferFromState({ amount: newAmount });
      setOriginalAmount(offerFromState.amount);
      setIsIncluded(true);
    }
  };

  return (
    <div className={s.container}>
      <Checkbox checked={isIncluded} onCheckedChange={handleCheckboxChange} />
      <h2 className={s.label}>
        Include service fee 0.01% {tokenValue && tokenName && <span>({`${fee} ${tokenName}`})</span>}
      </h2>
      <div id="tooltip" className={s.tooltip}>
        <InfoIcon />
      </div>
      <Tooltip anchorSelect="#tooltip">
        The service fee is paid by the receiving part. You can include the cost of the commission so that the Receiver
        does not have to pay.
      </Tooltip>
    </div>
  );
};

export default IncludeFee;
