import React, { useMemo } from 'react';
import { Address } from 'viem';

import { useTokenInfo } from '@components/AcceptOffer/hooks/useTokenInfo';
import { useGetFee } from '@components/AcceptOffer/hooks/useGetFee';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';

import { Checkbox } from '@components/Checkbox';
import s from './IncludeFee.module.scss';

const IncludeFee = () => {
  const { offerFromState, setOfferFromState } = useOfferCreateContext();
  const { calculatedFee } = useGetFee();
  const { tokenName } = useTokenInfo({
    address: offerFromState.from as Address,
    withFee: true,
  });

  const fee = useMemo(() => {
    if (!offerFromState.amount || !calculatedFee || !Number.isFinite(Number(offerFromState.amount))) return;
    return Number(((calculatedFee / 100) * Number(offerFromState.amount)).toFixed(5));
  }, [calculatedFee, offerFromState.amount]);

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <h2 className={s.label}>
          Service fee {calculatedFee && `${calculatedFee}%`}{' '}
          {fee ? <span>({`${fee}${tokenName ? ` ${tokenName}` : ''}`}). </span> : ''}
          {calculatedFee && Number(offerFromState.amount) > 0 && !offerFromState.amountError && (
            <span>
              Receiver will get{' '}
              {Number(
                (Number(offerFromState.amount) - (Number(offerFromState.amount) / 100) * calculatedFee).toFixed(9),
              )}{' '}
              {tokenName}
            </span>
          )}
        </h2>
      </div>
      <Checkbox label="Infinite approve" onCheckedChange={(checked) => setOfferFromState({ isInfinite: checked })} />
    </div>
  );
};

export default IncludeFee;
