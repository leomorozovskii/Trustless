import { useTranslation } from 'react-i18next';

import { GasPrice } from '@berezka-dao/shared/components/GasPrice';
import { TxButton } from '@berezka-dao/shared/components/TxFlow';
import { useGetMinFee } from '@berezka-dao/shared/hooks/useGetMinFee';
import { useGetOfferDetails } from '@berezka-dao/shared/retrieve-data/useGetOfferDetails';

import s from './CancelOffer.module.scss';
import { useCancelOffer } from './hooks/useCancelOffer';

const CancelOffer = ({ cancelId }: { cancelId: string }) => {
  const { t } = useTranslation();
  const { isCreator } = useGetOfferDetails({ id: cancelId });

  const { cancelOffer, onCancelReceipt, cancelRequest } = useCancelOffer({ cancelId });
  const { minFee } = useGetMinFee({ data: cancelRequest, active: true });

  return (
    <div className={s.container}>
      <TxButton
        type="button"
        disabled={!isCreator}
        errorTitle={t('error.cancel')}
        onReceipt={onCancelReceipt}
        writeContract={cancelOffer}
      >
        {({ isLoading: isButtonLoading }) => (isButtonLoading ? t('token.canceling') : t('token.cancel'))}
      </TxButton>
      <GasPrice minFee={minFee} />
      <p className={s.terms}>
        By continuing, you accept <span className={s.conditions}>Terms & Conditions</span>
      </p>
    </div>
  );
};

export { CancelOffer };
