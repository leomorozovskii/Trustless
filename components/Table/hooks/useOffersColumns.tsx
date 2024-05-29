import { useMemo } from 'react';
import { Column } from 'react-table';

import { ShareIcon } from '@assets/icons';
import { CryptoAddress } from '@components/CryptoAddress';
import { FormattedDate } from '@components/FormattedDate';
import { TokenBadge } from '@components/TokenBadge';
import FormattedNumber from '@components/FormattedAmount/FormattedAmount';
import { OfferStatus } from '@components/OfferStatus';

import { ITableData } from '@components/Table/mocks';
import s from '../Table.module.scss';

// TODO Fix sorting
const customSortMethod = (rowA: any, rowB: any, columnId: string) => {
  // Пример сортировки: числа сравниваются как числа, строки - как строки
  if (
    typeof rowA.values[columnId] === 'number' &&
    typeof rowB.values[columnId] === 'number'
  ) {
    return rowA.values[columnId] - rowB.values[columnId];
  }

  if (
    typeof rowA.values[columnId] === 'string' &&
    typeof rowB.values[columnId] === 'string'
  ) {
    return rowA.values[columnId].localeCompare(rowB.values[columnId]);
  }

  return 0;
};

export const useOffersColumns = () => {
  const columns: Column<ITableData>[] = useMemo(
    () => [
      { Header: 'offer id', accessor: 'id' },
      {
        Header: 'from asset 1',
        accessor: 'fromAsset',
        Cell: ({ cell: { value } }) => <TokenBadge address={value} />,
      },
      {
        Header: 'to asset 2',
        accessor: 'toAsset',
        Cell: ({ cell: { value } }) => <TokenBadge address={value} />,
      },
      {
        Header: 'amount 1',
        accessor: 'amount1',
        Cell: ({ cell: { value } }) => <FormattedNumber value={value} />,
        sortMethod: customSortMethod,
      },
      {
        Header: 'amount 2',
        accessor: 'amount2',
        Cell: ({ cell: { value } }) => <FormattedNumber value={value} />,
        sortMethod: customSortMethod,
      },
      {
        Header: 'rate',
        accessor: 'rate',
        Cell: ({ cell: { value } }) => <FormattedNumber value={value} />,
      },
      {
        Header: 'address',
        accessor: 'address',
        Cell: ({ cell: { value } }) => <CryptoAddress address={value} />,
      },
      {
        Header: 'status',
        accessor: 'status',
        Cell: ({ cell: { value }, row }) => (
          <OfferStatus status={value} offerId={row.original.id} />
        ),
      },
      {
        Header: 'date',
        accessor: 'date',
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
        Header: 'share widget',
        accessor: 'share',
        Cell: () => (
          <div className={s.shareWidget}>
            <button aria-label="Share" className={s.shareButton}>
              <ShareIcon />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  return columns;
};
