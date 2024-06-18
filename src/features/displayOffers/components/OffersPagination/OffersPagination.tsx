'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

import { PaginationArrowLeftIcon, PaginationArrowRightIcon } from '@berezka-dao/shared/icons';
import { Skeleton } from '@berezka-dao/shared/ui-kit/Skeleton';

import s from './OffersPagination.module.scss';

type OffersPaginationProps = {
  offset: number;
  limit: number;
  total?: number;
  isLoading?: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
};

const OffersPagination: React.FC<OffersPaginationProps> = ({
  offset,
  limit,
  total = 0,
  onNextPage,
  onPrevPage,
  isLoading,
}) => {
  const { t } = useTranslation();
  const rangeStart = offset + 1;
  const rangeEnd = Math.min(offset + limit, total);
  const hasPrev = offset > 0;
  const hasNext = offset + limit < total;
  if (isLoading) {
    return <Skeleton width="124px" height="34px" />;
  }
  if (!total) {
    return null;
  }
  return (
    <div className={s.container}>
      <span className={s.label}>{t('offers.pagination.label', { rangeStart, rangeEnd, total })}</span>
      <button aria-label={t('shared.prevPage')} className={s.button} onClick={onPrevPage} disabled={!hasPrev}>
        <PaginationArrowLeftIcon />
      </button>
      <button aria-label={t('shared.nextPage')} className={s.button} onClick={onNextPage} disabled={!hasNext}>
        <PaginationArrowRightIcon />
      </button>
    </div>
  );
};

export { OffersPagination };
