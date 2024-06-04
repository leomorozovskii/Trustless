'use client';

import { Tabs } from '@components/Tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TabsSkeleton } from '@components/Tabs/TabsSkeleton';
import { OfferFilter } from '../../types';

type OffersFiltersProps = {
  value: OfferFilter;
  filters: { badge?: string; value: OfferFilter }[];
  isLoading?: boolean;
  onValueChange: (value: OfferFilter) => void;
};

const OffersFilters: React.FC<OffersFiltersProps> = ({ filters, value, isLoading, onValueChange }) => {
  const { t } = useTranslation();
  if (isLoading) {
    <TabsSkeleton count={filters.length} />;
  }
  return (
    <Tabs<OfferFilter>
      value={value}
      options={filters.map((filter) => ({
        value: filter.value,
        badge: filter.badge,
        label: t(`offers.filters.${filter.value}`),
      }))}
      onValueChange={onValueChange}
    />
  );
};

export { OffersFilters };
