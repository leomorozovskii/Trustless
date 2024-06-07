'use client';

import { Tabs } from '@components/Tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TabsSkeleton } from '@components/Tabs/TabsSkeleton';
import { OfferFilter, OffersStats } from '../../types';

type OffersFiltersProps = {
  value: OfferFilter;
  filters: OfferFilter[];
  offersStats?: OffersStats | undefined;
  isLoading?: boolean;
  onValueChange: (value: OfferFilter) => void;
};

const OffersFilters: React.FC<OffersFiltersProps> = ({ filters, value, offersStats, isLoading, onValueChange }) => {
  const { t } = useTranslation();
  if (isLoading) {
    <TabsSkeleton count={filters.length} />;
  }
  return (
    <Tabs<OfferFilter>
      value={value}
      options={filters.map((filter) => ({
        value: filter,
        badge: filter === 'all' ? undefined : offersStats?.[filter].toString(),
        label: t(`offers.filters.${filter}`),
      }))}
      onValueChange={onValueChange}
    />
  );
};

export { OffersFilters };
