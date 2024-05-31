import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ShareIcon } from '@assets/icons';
import { CryptoAddress } from '@components/CryptoAddress';
import { Checkbox } from '@components/Checkbox';
import { FormattedDate } from '@components/FormattedDate';
import { TokenBadge } from '@components/TokenBadge';
import { OfferStatus } from '@components/OfferStatus';
import FormattedNumber from '@components/FormattedAmount/FormattedAmount';
import { useOfferSelect } from '@components/Table/hooks/useOfferSelect';
import { OffersColumnAccessors } from '@context/offers/offers-context.interfaces';
import cn from 'classnames';

import s from '../Table.module.scss';

interface UseOffersColumnsProps {
  selectedOffer: ReturnType<typeof useOfferSelect>['selectedOffer'];
  toggleOfferSelection: ReturnType<typeof useOfferSelect>['toggleOfferSelection'];
}
export const useOffersColumns = ({ selectedOffer, toggleOfferSelection }: UseOffersColumnsProps) => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        Header: t('offers.column.id'),
        accessor: OffersColumnAccessors.ID,
        Cell: ({ cell }: any) => {
          const { row } = cell;
          const isChecked = selectedOffer?.id === row.original.id;

          return (
            <div className={cn(s.idColumn, { [s.isChecked]: isChecked })}>
              <Checkbox
                label={cell.value}
                checked={isChecked}
                onCheckedChange={() => toggleOfferSelection(row.original)}
              />
            </div>
          );
        },
      },
      {
        Header: t('offers.column.fromAsset'),
        accessor: OffersColumnAccessors.FROM_ASSET,
        Cell: ({ cell: { value } }) => <TokenBadge address={value} />,
      },
      {
        Header: t('offers.column.toAsset'),
        accessor: OffersColumnAccessors.TO_ASSET,
        Cell: ({ cell: { value } }) => <TokenBadge address={value} />,
      },
      {
        Header: t('offers.column.amount1'),
        accessor: OffersColumnAccessors.AMOUNT1,
        Cell: ({ cell: { value } }) => <FormattedNumber value={value} />,
      },
      {
        Header: t('offers.column.amount2'),
        accessor: OffersColumnAccessors.AMOUNT2,
        Cell: ({ cell: { value } }) => <FormattedNumber value={value} />,
      },
      {
        Header: t('offers.column.rate'),
        accessor: OffersColumnAccessors.RATE,
        Cell: ({ cell: { value } }) => <FormattedNumber value={value} />,
      },
      {
        Header: t('offers.column.address'),
        accessor: OffersColumnAccessors.ADDRESS,
        Cell: ({ cell: { value } }) => <CryptoAddress address={value} />,
      },
      {
        Header: t('offers.column.status'),
        accessor: OffersColumnAccessors.STATUS,
        Cell: ({ cell: { value }, row }) => <OfferStatus status={value} offerId={row.original.id} />,
      },
      {
        Header: t('offers.column.date'),
        accessor: OffersColumnAccessors.DATE,
        Cell: ({ cell: { value } }) => (
          <div
            style={{
              textAlign: 'left',
            }}
          >
            <FormattedDate date={value} />
          </div>
        ),
      },
      {
        Header: t('offers.column.share'),
        accessor: OffersColumnAccessors.SHARE,
        Cell: () => (
          <div className={s.shareWidget}>
            <button aria-label="Share" className={s.shareButton}>
              <ShareIcon />
            </button>
          </div>
        ),
      },
    ],
    [selectedOffer?.id, t, toggleOfferSelection],
  );

  return columns;
};
