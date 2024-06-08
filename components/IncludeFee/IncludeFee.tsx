import React, { useMemo } from 'react';
import { Address } from 'viem';

import { useTokenInfo } from '@components/AcceptOffer/hooks/useTokenInfo';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { useGetFee } from '@components/AcceptOffer/hooks/useGetFee';

import s from './IncludeFee.module.scss';

const IncludeFee = () => {
  const { offerFromState } = useOfferCreateContext();
  const { calculatedFee } = useGetFee();
  const { tokenName } = useTokenInfo({
    address: offerFromState.from as Address,
    withFee: true,
  });

  const fee = useMemo(() => {
    if (!offerFromState.amount || !calculatedFee || !Number.isFinite(offerFromState.amount)) return;
    return Number(calculatedFee * Number(offerFromState.amount));
  }, [calculatedFee, offerFromState.amount, offerFromState.amountError]);

  return (
    <div className={s.container}>
      <h2 className={s.label}>
        Service fee {calculatedFee && `${calculatedFee}%`}{' '}
        {fee && tokenName ? <span>({`${fee} ${tokenName}`})</span> : fee && <span>({`${fee}`})</span>}
        {calculatedFee && Number(offerFromState.amount) > 0 && !offerFromState.amountError && (
          <span>
            . Receiver will get {Number(offerFromState.amount) * (1 - calculatedFee)} {tokenName}
          </span>
        )}
      </h2>
    </div>
  );
};

export default IncludeFee;
