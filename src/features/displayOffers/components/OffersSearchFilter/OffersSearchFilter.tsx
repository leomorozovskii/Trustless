'use client';

import { useTranslation } from 'react-i18next';

import { SearchIcon } from '@berezka-dao/shared/icons';
import { Input } from '@berezka-dao/shared/ui-kit/Input';

import s from './OffersSearchFilter.module.scss';

type OffersSearchFilterProps = {
  value: string;
  onValueChange: (searchFilter: string) => void;
};

const OffersSearchFilter = ({ value, onValueChange }: OffersSearchFilterProps) => {
  const { t } = useTranslation();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value);
  };
  return (
    <div className={s.container}>
      <Input
        icon={<SearchIcon />}
        value={value}
        onChange={handleOnChange}
        placeholder={t('offers.search.placeholder')}
      />
    </div>
  );
};

export { OffersSearchFilter };
