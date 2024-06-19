'use client';

import type { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { SearchIcon } from '@berezka-dao/shared/icons';
import { Input } from '@berezka-dao/shared/ui-kit/Input';

import s from './OffersSearchFilter.module.scss';

type OffersSearchFilterProps = {
  value: string;
  onValueChange: (searchFilter: string) => void;
};

const OffersSearchFilter: FC<OffersSearchFilterProps> = ({ value, onValueChange }) => {
  const { t } = useTranslation();
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
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
