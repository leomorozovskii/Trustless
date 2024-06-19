'use client';

import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { TabsSkeleton, Tabs } from '@berezka-dao/shared/ui-kit/Tabs';

import type { OfferFilter, OffersStats } from '../../types';

type OffersFiltersProps = {
  value: OfferFilter;
  filters: OfferFilter[];
  offersStats?: OffersStats | undefined;
  isLoading?: boolean;
  onValueChange: (value: OfferFilter) => void;
};

const OffersFilters: FC<OffersFiltersProps> = ({ filters, value, offersStats, isLoading, onValueChange }) => {
  const { t } = useTranslation();
  if (isLoading) {
    <TabsSkeleton count={filters.length} />;
  }
  return (
    <Tabs<OfferFilter>
      value={value}
      options={filters
        .filter((filter) => (filter === 'all' ? true : !!offersStats?.[filter]))
        .map((filter) => ({
          value: filter,
          badge: filter === 'all' ? undefined : offersStats?.[filter].toString(),
          label: t(`offers.filters.${filter}`),
        }))}
      onValueChange={onValueChange}
    />
  );
};

export { OffersFilters };
