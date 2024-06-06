'use client';

import { OfferColumns, OfferFilter } from './types';

import { createOffersView } from './view';
import { createUseOffersStore } from './store';

import s from './OffersTemplate.module.scss';

type OffersTemplateActions = 'cancel' | 'search' | 're-open';

type CreateOffersParams = {
  filters?: OfferFilter[];
  hideFilters?: boolean;
  actions: OffersTemplateActions[];
  columnsToDisplay?: OfferColumns[];
};

type OffersProps = {
  title: string;
};

export const createOffersTemplate = ({
  filters = [],
  actions,
  hideFilters = false,
  columnsToDisplay = [
    OfferColumns.ID,
    OfferColumns.AssetFrom,
    OfferColumns.AssetTo,
    OfferColumns.AmountFrom,
    OfferColumns.AmountTo,
    OfferColumns.Rate,
    OfferColumns.Address,
    OfferColumns.Status,
  ],
}: CreateOffersParams) => {
  const useOffersStore = createUseOffersStore({
    limit: 100,
    filters,
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
            <OffersView.Pagination />
          </div>
        </div>
        <OffersView.Table />
      </div>
    );
  };
  return OffersTemplate;
};
