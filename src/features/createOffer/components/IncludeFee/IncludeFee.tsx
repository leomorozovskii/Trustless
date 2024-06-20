import { useMemo } from 'react';

import { TOKEN_MAP } from '@berezka-dao/core/constants';
import { useGetFee } from '@berezka-dao/features/acceptOffer/components/AcceptOffer/hooks/useGetFee';
import { useOfferCreateContext } from '@berezka-dao/features/createOffer/store';
import { OfferProgress } from '@berezka-dao/features/createOffer/types';
import { Checkbox } from '@berezka-dao/shared/ui-kit/Checkbox';

import s from './IncludeFee.module.scss';

const IncludeFee = () => {
  const { offerFromState, setOfferFromState, activeStep } = useOfferCreateContext();
  const { calculatedFee } = useGetFee();

  const tokenName = useMemo(() => {
    if (!offerFromState.from) return;
    const tokenSymbol = TOKEN_MAP[offerFromState.from]?.symbol;
    if (!tokenSymbol) return offerFromState.customTokenName;
    return tokenSymbol;
  }, [offerFromState.customTokenName, offerFromState.from]);

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
          {calculatedFee && Number(offerFromState.amount) > 0 && (
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
      {(activeStep === OfferProgress.Filled || activeStep === OfferProgress.None) && (
        <Checkbox label="Infinite approve" onCheckedChange={(checked) => setOfferFromState({ isInfinite: checked })} />
      )}
    </div>
  );
};

export { IncludeFee };
