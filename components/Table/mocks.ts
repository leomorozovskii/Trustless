import { TokenAddress } from '@lib/constants';

export interface ITableData {
  id: number;
  fromAssetName: string;
  toAssetName: string;
  fromAsset: TokenAddress;
  toAsset: TokenAddress;
  amount1: bigint;
  amount2: bigint;
  rate: bigint;
  address: string;
  status: string;
  date: string | Date;
  share?: string;
}

export const mockTableData: ITableData[] = [
  {
    id: 355157,
    fromAssetName: 'BUSD',
    toAssetName: 'USDT',
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
    fromAssetName: 'ETH',
    toAssetName: 'DAI',
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
    fromAssetName: 'BUSD',
    toAssetName: 'DAI',
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
    fromAssetName: 'USDT',
    toAssetName: 'ETH',
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
    fromAssetName: 'BUSD',
    toAssetName: 'BAT',
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
    fromAssetName: 'ETH',
    toAssetName: 'USDC',
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
    fromAssetName: 'USDC',
    toAssetName: 'DAI',
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
    fromAssetName: 'BUSD',
    toAssetName: 'ETH',
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
    fromAssetName: 'USDT',
    toAssetName: 'CVX',
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
    fromAssetName: 'DAI',
    toAssetName: 'USDC',
    fromAsset: TokenAddress.DAI,
    toAsset: TokenAddress.USDC,
    amount1: BigInt(27000),
    amount2: BigInt(13500),
    rate: BigInt(550),
    address: '0x1234ijkl5678mnop9012qrstu345',
    status: 'Pending',
    date: new Date(2024, 0, 30, 21, 5),
  },
];
