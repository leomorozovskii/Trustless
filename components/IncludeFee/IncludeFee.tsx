import React, { useEffect, useMemo, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { Address } from 'viem';

import { InfoIcon } from '@assets/icons';
import { Checkbox } from '@components/Checkbox';
import { useTokenInfo } from '@components/AcceptOffer/hooks/useTokenInfo';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { useGetFee } from '@components/AcceptOffer/hooks/useGetFee';

import s from './IncludeFee.module.scss';

const IncludeFee = () => {
  const { offerFromState, setOfferFromState, setIsFeeIncluded, isFeeIncluded } = useOfferCreateContext();
  const [originalAmount, setOriginalAmount] = useState<string>(offerFromState.amount);
  const { calculatedFee } = useGetFee();
  const { tokenName, tokenValue } = useTokenInfo({
    address: offerFromState.from as Address,
    withFee: true,
  });

  const fee = useMemo(() => {
    if (!originalAmount || !calculatedFee) return;
    return Number(calculatedFee * Number(offerFromState.amount));
  }, [calculatedFee, originalAmount]);

  useEffect(() => {
    if (offerFromState.amount !== originalAmount && !isFeeIncluded) {
      setOriginalAmount(offerFromState.amount);
    }
  }, [offerFromState.amount, isFeeIncluded]);

  const handleCheckboxChange = () => {
    setIsFeeIncluded(false);
    if (isFeeIncluded) {
      setOfferFromState({ amount: originalAmount });
      setIsFeeIncluded(false);
    } else {
      setIsFeeIncluded(true);
      if (!originalAmount) return;
      const newAmount = String(Number(originalAmount) + Number(tokenValue ?? fee));
      setOfferFromState({ amount: newAmount });
      setOriginalAmount(offerFromState.amount);
    }
  };

  return (
    <div className={s.container}>
      <Checkbox checked={isFeeIncluded} onCheckedChange={handleCheckboxChange} />
      <h2 className={s.label}>
        Include service fee 0.01%{' '}
        {fee && tokenName ? <span>({`${fee} ${tokenName}`})</span> : fee && <span>({`${fee}`})</span>}
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
