import { createColumnHelper } from '@tanstack/react-table';

import type { OfferTrade } from '@berezka-dao/features/displayOffers/types';
import { OfferColumns } from '@berezka-dao/features/displayOffers/types';

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
  OffersTableReceiver,
} from './components/OffersTableCells';
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
  OffersTableReceiverHeading,
} from './components/OffersTableHeading';

const columnHelper = createColumnHelper<OfferTrade>();
const columns = [
  columnHelper.accessor((props) => props.id, {
    id: OfferColumns.ID,
    meta: {
      columnWidth: '70px',
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
      const { symbol, logo: Logo } = info.getValue();
      return <OffersTableAsset icon={<Logo width={20} height={20} />} name={symbol} />;
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
      const { symbol, logo: Logo } = info.getValue();
      return <OffersTableAsset icon={<Logo width={20} height={20} />} name={symbol} />;
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
      columnWidth: '100px',
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
      columnMinWidth: '180px',
      columnPaddingLeft: '24px',
      columnPaddingRight: '24px',
      columnAlign: 'start',
    },
    enableSorting: false,
    cell: (info) => {
      const txHash = info.getValue();
      return <OffersTableTxHash hash={txHash} />;
    },
    header: () => <OffersTableTxHashHeading />,
  }),
  columnHelper.accessor(
    (props) => ({
      status: props.status,
      id: props.id,
    }),
    {
      id: OfferColumns.Status,
      meta: {
        columnWidth: '90px',
        columnAlign: 'start',
      },
      enableSorting: false,
      cell: (info) => {
        const { status, id } = info.getValue();
        return <OffersTableStatus id={id} status={status} />;
      },
      header: () => <OffersTableStatusHeading />,
    },
  ),
  columnHelper.accessor((props) => props.receiver, {
    id: OfferColumns.Receiver,
    meta: {
      columnWidth: '170px',
      columnPaddingLeft: '18px',
      columnAlign: 'start',
    },
    enableSorting: false,
    header: () => <OffersTableReceiverHeading />,
    cell: (info) => <OffersTableReceiver receiver={info.getValue()} />,
  }),
  columnHelper.accessor((props) => props.unixTimestamp, {
    id: OfferColumns.Date,
    meta: {
      columnWidth: '128px',
      columnAlign: 'start',
      columnPaddingLeft: '8px',
    },
    enableSorting: true,
    cell: (info) => <OffersTableDate unixTimestamp={info.getValue()} />,
    header: () => <OffersTableDateHeading />,
  }),
  columnHelper.accessor((props) => ({ status: props.status, id: props.id }), {
    id: OfferColumns.Share,
    meta: {
      columnWidth: '34px',
      columnAlign: 'end',
    },
    enableSorting: false,
    header: () => <OffersTableShareHeading />,
    cell: (info) => {
      const { status, id } = info.getValue();
      return status === 'pending' && <OffersTableShare id={id} />;
    },
  }),
];

export { columns };
