'use client';

import { OfferColumns, OfferFilter, OfferSorting } from './types';

import { createOffersView } from './view';
import { createUseOffersStore } from './store';

import s from './OffersTemplate.module.scss';

type OffersTemplateActions = 'cancel' | 'search' | 're-open';

type CreateOffersParams = {
  filters?: OfferFilter[];
  hideFilters?: boolean;
  sorting?: OfferSorting | null;
  actions: OffersTemplateActions[];
  columnsToDisplay?: OfferColumns[];
};

type OffersProps = {
  title: string;
};

export const createOffersTemplate = ({
  filters = [],
  actions,
  sorting = null,
  hideFilters = false,
  columnsToDisplay = [
    OfferColumns.ID,
    OfferColumns.AssetFrom,
    OfferColumns.AssetTo,
    OfferColumns.AmountFrom,
    OfferColumns.AmountTo,
    OfferColumns.Rate,
    OfferColumns.TxHash,
    OfferColumns.Date,
    OfferColumns.Status,
  ],
}: CreateOffersParams) => {
  const useOffersStore = createUseOffersStore({
    limit: 100,
    filters,
    sorting,
  });
  const OffersView = createOffersView(useOffersStore, { columnsToDisplay });

  const actionsMap: Record<OffersTemplateActions, React.FC> = {
    cancel: OffersView.CancelSelectedOrder,
    search: OffersView.SearchFilter,
    're-open': OffersView.ReOpenOrder,
  };

  const OffersTemplate = ({ title }: OffersProps) => {
    return (
      <div className={s.container}>
        <div className={s.header}>
          <span className={s.title}>{title}</span>
          {!hideFilters && (
            <div className={s.filters}>
              <OffersView.Filters />
            </div>
          )}
          <div className={s.actions}>
            <div className={s.actions__left}>
              {actions.map((action) => {
                const ActionComponent = actionsMap[action];
                return <ActionComponent key={action} />;
              })}
            </div>
            <div className={s.actions__right}>
              <OffersView.Pagination />
            </div>
          </div>
        </div>
        <div className={s.table}>
          <OffersView.Table />
        </div>
      </div>
    );
  };
  return OffersTemplate;
};
