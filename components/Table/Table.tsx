import { useMemo } from 'react';
import { useTable } from 'react-table';
import cn from 'classnames';
import { TokenAddress } from '@lib/constants';
import s from './Table.module.scss';
import { TokenBadge } from '@components/TokenBadge';
import FormattedNumber from '@components/FormattedAmount/FormattedAmount';
import { CryptoAddress } from '@components/CryptoAddress';
import { OfferStatus } from '@components/OfferStatus';
import { ShareIcon } from '@assets/icons';
import { FormattedDate } from '@components/FormattedDate';
import { Button } from '@components/Button';

const Table = () => {
  const data = useMemo(
    () => [
      {
        id: 355157,
        fromAsset: TokenAddress.BUSD,
        toAsset: TokenAddress.USDT,
        amount1: BigInt(10000),
        amount2: BigInt(5000),
        rate: BigInt(608),
        address: '0x1532132fdsfds2312dadf8976ae',
        status: 'Open',
        date: new Date(2024, 9, 12, 11, 36),
      },
      {
        id: 355158,
        fromAsset: TokenAddress.ETH,
        toAsset: TokenAddress.DAI,
        amount1: BigInt(20000),
        amount2: BigInt(10000),
        rate: BigInt(458),
        address: '0x45fe23c98vn4cdsijkl2198sdjkl',
        status: 'Pending',
        date: new Date(2024, 8, 5, 15, 22),
      },
      {
        id: 355159,
        fromAsset: TokenAddress.BUSD,
        toAsset: TokenAddress.DAI,
        amount1: BigInt(15000),
        amount2: BigInt(7500),
        rate: BigInt(520),
        address: '0x23948fdsjkl40832casf24398fjk',
        status: 'Accepted',
        date: new Date(2024, 7, 20, 9, 40),
      },
      {
        id: 355160,
        fromAsset: TokenAddress.USDT,
        toAsset: TokenAddress.ETH,
        amount1: BigInt(5000),
        amount2: BigInt(2500),
        rate: BigInt(300),
        address: '0xabcd1234efgh5678ijkl9012mno3',
        status: 'Cancelled',
        date: new Date(2024, 6, 15, 13, 15),
      },
      {
        id: 355161,
        fromAsset: TokenAddress.BUSD,
        toAsset: TokenAddress.BAT,
        amount1: BigInt(12000),
        amount2: BigInt(6000),
        rate: BigInt(340),
        address: '0x9876543210abcdef1234567890abc',
        status: 'Open',
        date: new Date(2024, 5, 22, 8, 55),
      },
      {
        id: 355162,
        fromAsset: TokenAddress.ETH,
        toAsset: TokenAddress.USDC,
        amount1: BigInt(18000),
        amount2: BigInt(9000),
        rate: BigInt(690),
        address: '0x1234abc5678def9012ghi3456jkl',
        status: 'Pending',
        date: new Date(2024, 4, 10, 17, 45),
      },
      {
        id: 355163,
        fromAsset: TokenAddress.USDC,
        toAsset: TokenAddress.DAI,
        amount1: BigInt(22000),
        amount2: BigInt(11000),
        rate: BigInt(800),
        address: '0xdef78901ghi2345jkl678901mno2',
        status: 'Accepted',
        date: new Date(2024, 3, 18, 10, 30),
      },
      {
        id: 355164,
        fromAsset: TokenAddress.BUSD,
        toAsset: TokenAddress.ETH,
        amount1: BigInt(25000),
        amount2: BigInt(12500),
        rate: BigInt(400),
        address: '0x4567klmn8910opqr2345stuv6789',
        status: 'Cancelled',
        date: new Date(2024, 2, 25, 19, 20),
      },
      {
        id: 355165,
        fromAsset: TokenAddress.USDT,
        toAsset: TokenAddress.CVX,
        amount1: BigInt(30000),
        amount2: BigInt(15000),
        rate: BigInt(680),
        address: '0x8901mnop2345qrst6789uvwxy012',
        status: 'Open',
        date: new Date(2024, 1, 10, 6, 12),
      },
      {
        id: 355166,
        fromAsset: TokenAddress.DAI,
        toAsset: TokenAddress.USDC,
        amount1: BigInt(27000),
        amount2: BigInt(13500),
        rate: BigInt(550),
        address: '0x1234ijkl5678mnop9012qrstu345',
        status: 'Pending',
        date: new Date(2024, 0, 30, 21, 5),
      },
    ],
    [],
  );

  const columns = useMemo(
    () => [
      { Header: 'OFFER ID', accessor: 'id' },
      {
        Header: 'FROM ASSET 1',
        accessor: 'fromAsset',
        Cell: ({ cell: { value } }: any) => <TokenBadge address={value} />,
      },
      {
        Header: 'TO ASSET 2',
        accessor: 'toAsset',
        Cell: ({ cell: { value } }: any) => <TokenBadge address={value} />,
      },
      {
        Header: 'AMOUNT 1',
        accessor: 'amount1',
        Cell: ({ cell: { value } }: any) => <FormattedNumber value={value} />,
      },
      {
        Header: 'AMOUNT 2',
        accessor: 'amount2',
        Cell: ({ cell: { value } }: any) => <FormattedNumber value={value} />,
      },
      {
        Header: 'RATE',
        accessor: 'rate',
        Cell: ({ cell: { value } }: any) => <FormattedNumber value={value} />,
      },
      {
        Header: 'ADDRESS',
        accessor: 'address',
        Cell: ({ cell: { value } }: any) => <CryptoAddress address={value} />,
      },
      {
        Header: 'STATUS',
        accessor: 'status',
        Cell: ({ cell: { value }, row }: any) => (
          <OfferStatus status={value} offerId={row.original.id} />
        ),
      },
      {
        Header: 'DATE',
        accessor: 'date',
        Cell: ({ cell: { value } }: any) => <FormattedDate date={value} />,
      },
      {
        Header: 'SHARE WIDGET',
        accessor: 'share',
        Cell: () => (
          <div className={s.shareWidget}>
            <button className={s.shareButton}>
              <ShareIcon />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className={s.tableContainer}>
      <div className={s.tableHeader}>
        <Button className={s.cancelButton}>Cancel offer</Button>

        <input
          type="text"
          placeholder="Offer ID or Asset"
          className={s.searchInput}
        />
      </div>
      <table {...getTableProps()} className={s.table}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  key={column.id}
                  className={cn(s.tableHeaderCell, {
                    [s.tableHeaderCell_active]: column.isSorted,
                  })}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className={s.tableBody}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={row.id}
                className={cn({
                  [s.cancelled]: row.original.status === 'Cancelled',
                })}
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.id}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
