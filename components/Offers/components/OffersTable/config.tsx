import { OfferColumns, OfferTrade } from '@components/Offers/types';
import { createColumnHelper } from '@tanstack/react-table';

import {
  OffersTableTxHashHeading,
  OffersTableAmountFromHeading,
  OffersTableAmountToHeading,
  OffersTableAssetFromHeading,
  OffersTableAssetToHeading,
  OffersTableIdHeading,
  OffersTableRateHeading,
  OffersTableShareHeading,
  OffersTableStatusHeading,
  OffersTableDateHeading,
} from './components/OffersTableHeading';
import {
  OffersTableTxHash,
  OffersTableAmountFrom,
  OffersTableAmountTo,
  OffersTableAsset,
  OffersTableId,
  OffersTableRate,
  OffersTableShare,
  OffersTableStatus,
  OffersTableDate,
} from './components/OffersTableCells';

const columnHelper = createColumnHelper<OfferTrade>();
export const columns = [
  columnHelper.accessor((props) => props.id, {
    id: OfferColumns.ID,
    meta: {
      columnWidth: '100px',
      columnAlign: 'start',
    },
    enableSorting: false,
    cell: (info) => <OffersTableId id={info.getValue()} />,
    header: () => <OffersTableIdHeading />,
  }),
  columnHelper.accessor((props) => props.tokenFromDetails, {
    id: OfferColumns.AssetFrom,
    meta: {
      columnWidth: '100px',
      columnAlign: 'start',
    },
    enableSorting: false,
    cell: (info) => {
      const { name, logo: Logo } = info.getValue();
      return <OffersTableAsset icon={<Logo />} name={name} />;
    },
    header: () => <OffersTableAssetFromHeading />,
  }),
  columnHelper.accessor((props) => props.tokenToDetails, {
    id: OfferColumns.AssetTo,
    meta: {
      columnWidth: '100px',
      columnAlign: 'start',
    },
    enableSorting: false,
    cell: (info) => {
      const { name, logo: Logo } = info.getValue();
      return <OffersTableAsset icon={<Logo />} name={name} />;
    },
    header: () => <OffersTableAssetToHeading />,
  }),
  columnHelper.accessor((props) => ({ amount: props.amountFrom, amountWithFee: props.amountFromWithFee }), {
    id: OfferColumns.AmountFrom,
    size: 100,
    meta: {
      columnWidth: '100px',
      columnAlign: 'end',
    },
    enableSorting: false,
    cell: (info) => {
      const { amount, amountWithFee } = info.getValue();
      return <OffersTableAmountFrom amount={amount} amountWithFee={amountWithFee} />;
    },
    header: () => <OffersTableAmountFromHeading />,
  }),
  columnHelper.accessor((props) => props.amountTo, {
    id: OfferColumns.AmountTo,
    meta: {
      columnWidth: '120px',
      columnAlign: 'end',
    },
    enableSorting: false,
    cell: (info) => <OffersTableAmountTo amount={info.getValue()} />,
    header: () => <OffersTableAmountToHeading />,
  }),
  columnHelper.accessor((props) => props.amountTo / props.amountFrom, {
    id: OfferColumns.Rate,
    meta: {
      columnWidth: '100px',
      columnAlign: 'end',
    },
    enableSorting: false,
    cell: (info) => <OffersTableRate rate={info.getValue()} />,
    header: () => <OffersTableRateHeading />,
  }),
  columnHelper.accessor((props) => props.txHash, {
    id: OfferColumns.TxHash,
    meta: {
      columnWidth: 'auto',
      columnMinWidth: '138px',
      columnMarginLeft: '32px',
      columnPaddingRight: '26px',
      columnAlign: 'start',
    },
    enableSorting: false,
    cell: (info) => {
      const txHash = info.getValue();
      return <OffersTableTxHash hash={txHash} />;
    },
    header: () => <OffersTableTxHashHeading />,
  }),
  columnHelper.accessor((props) => props.status, {
    id: OfferColumns.Status,
    meta: {
      columnWidth: '120px',
      columnMarginLeft: '8px',
      columnAlign: 'start',
    },
    enableSorting: false,
    cell: (info) => <OffersTableStatus status={info.getValue()} />,
    header: () => <OffersTableStatusHeading />,
  }),
  columnHelper.accessor((props) => props.unixTimestamp, {
    id: OfferColumns.Date,
    meta: {
      columnWidth: '132px',
      columnAlign: 'start',
      columnPaddingLeft: '8px',
    },
    enableSorting: true,
    cell: (info) => <OffersTableDate unixTimestamp={info.getValue()} />,
    header: () => <OffersTableDateHeading />,
  }),
  columnHelper.accessor((props) => props.id, {
    id: OfferColumns.Share,
    meta: {
      columnWidth: '124px',
      columnAlign: 'end',
    },
    enableSorting: false,
    header: () => <OffersTableShareHeading />,
    cell: (info) => <OffersTableShare id={info.getValue()} />,
  }),
];
