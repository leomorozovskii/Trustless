import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import s from './RateContainer.module.scss';

type Props = {
  value: number | undefined;
};

const RateContainer: FC<Props> = ({ value }) => {
  const { t } = useTranslation();

  return (
    <div className={s.rateContainer}>
      <h2 className={s.rate}>{value}</h2>
      <p className={s.rateLabel}>{t('offer.accept.rate')}</p>
    </div>
  );
};

export { RateContainer };
