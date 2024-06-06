import { environment } from '@/environment';
import {
  ARMORIcon,
  AlcxIcon,
  BatIcon,
  BusdIcon,
  CVXIcon,
  CbETHIcon,
  DaiIcon,
  DaoTokenIcon,
  EthIcon,
  FeiIcon,
  IconProps,
  LinkIcon,
  ManaIcon,
  MkrIcon,
  UniIcon,
  UnknownIcon,
  UsdcIcon,
  UsdtIcon,
  WbtcIcon,
  WethIcon,
  WstETHIcon,
  YfiIcon,
} from '@assets/icons/tokens';
import { Address } from 'viem';

export interface TokenData {
  address: Address;
  name: string;
  logo: React.FC<IconProps>;
  decimals: number;
}

export type Token =
  | 'USDT'
  | 'META'
  | 'PUCKI'
  | 'USDC'
  | 'ETH'
  | 'CBETH'
  | 'WETH'
  | 'DAI'
  | 'BUSD'
  | 'CVX'
  | 'WSTETH'
  | 'LINK'
  | 'MANA'
  | 'STETH'
  | 'YFI'
  | 'MKR'
  | 'BAT'
  | 'UNI'
  | 'ALCX'
  | 'WBTC'
  | 'ARMOR'
  | 'FEI'
  | 'UNKNOWN'
  | 'DAO';

const TokenAddressTestnet: Record<Token, Address> = {
  USDT: '0x820CD06B058dcc48a61f44CE58E03C561DdfDCA9',
  META: '0xB30352A908819A71ed87e451Afc99dD0A34E42Cc',
  PUCKI: '0xcabd7d5dBEeF08b4395bb7caC1b715a0B5625199',
  USDC: '0x1F05b02B94de421820d090F6E9FAa0bdBECdb1B8',
  ETH: '0x0000000000000000000000000000000000000002',
  CBETH: '0x0000000000000000000000000000000000000003',
  WETH: '0x0000000000000000000000000000000000000004',
  DAI: '0x0000000000000000000000000000000000000005',
  BUSD: '0x0000000000000000000000000000000000000006',
  CVX: '0x0000000000000000000000000000000000000008',
  WSTETH: '0x0000000000000000000000000000000000000009',
  LINK: '0x000000000000000000000000000000000000000a',
  MANA: '0x000000000000000000000000000000000000000b',
  STETH: '0x000000000000000000000000000000000000000c',
  YFI: '0x000000000000000000000000000000000000000d',
  MKR: '0x000000000000000000000000000000000000000e',
  BAT: '0x000000000000000000000000000000000000000f',
  UNI: '0x0000000000000000000000000000000000000010',
  ALCX: '0x0000000000000000000000000000000000000011',
  WBTC: '0x0000000000000000000000000000000000000012',
  ARMOR: '0x0000000000000000000000000000000000000013',
  FEI: '0x0000000000000000000000000000000000000014',
  UNKNOWN: '0x0000000000000000000000000000000000000015',
  DAO: '0x0000000000000000000000000000000000000016',
};

// TODO :: fill with real addresses for mainnet
const TokenAddressMainnet: Record<Token, Address> = {
  USDT: '0x820CD06B058dcc48a61f44CE58E03C561DdfDCA9',
  META: '0xB30352A908819A71ed87e451Afc99dD0A34E42Cc',
  PUCKI: '0xcabd7d5dBEeF08b4395bb7caC1b715a0B5625199',
  USDC: '0x1F05b02B94de421820d090F6E9FAa0bdBECdb1B8',
  ETH: '0x0000000000000000000000000000000000000002',
  CBETH: '0x0000000000000000000000000000000000000003',
  WETH: '0x0000000000000000000000000000000000000004',
  DAI: '0x0000000000000000000000000000000000000005',
  BUSD: '0x0000000000000000000000000000000000000006',
  CVX: '0x0000000000000000000000000000000000000008',
  WSTETH: '0x0000000000000000000000000000000000000009',
  LINK: '0x000000000000000000000000000000000000000a',
  MANA: '0x000000000000000000000000000000000000000b',
  STETH: '0x000000000000000000000000000000000000000c',
  YFI: '0x000000000000000000000000000000000000000d',
  MKR: '0x000000000000000000000000000000000000000e',
  BAT: '0x000000000000000000000000000000000000000f',
  UNI: '0x0000000000000000000000000000000000000010',
  ALCX: '0x0000000000000000000000000000000000000011',
  WBTC: '0x0000000000000000000000000000000000000012',
  ARMOR: '0x0000000000000000000000000000000000000013',
  FEI: '0x0000000000000000000000000000000000000014',
  UNKNOWN: '0x0000000000000000000000000000000000000015',
  DAO: '0x0000000000000000000000000000000000000016',
};

export const TokenAddress: Record<Token, Address> = environment.isTestnet ? TokenAddressTestnet : TokenAddressMainnet;

export const TOKEN_MAP: { [address: string]: TokenData } = {
  [TokenAddress.USDT]: { address: TokenAddress.USDT, name: 'USDT', logo: UsdtIcon, decimals: 6 },
  [TokenAddress.META]: { address: TokenAddress.META, name: 'META', logo: UnknownIcon, decimals: 18 },
  [TokenAddress.PUCKI]: { address: TokenAddress.PUCKI, name: 'PUCKI', logo: UnknownIcon, decimals: 18 },
  [TokenAddress.USDC]: { address: TokenAddress.USDC, name: 'USDC', logo: UsdcIcon, decimals: 6 },
  [TokenAddress.ETH]: { address: TokenAddress.ETH, name: 'ETH', logo: EthIcon, decimals: 18 },
  [TokenAddress.CBETH]: { address: TokenAddress.CBETH, name: 'cbETH', logo: CbETHIcon, decimals: 18 },
  [TokenAddress.WETH]: { address: TokenAddress.WETH, name: 'WETH', logo: WethIcon, decimals: 18 },
  [TokenAddress.DAI]: { address: TokenAddress.DAI, name: 'DAI', logo: DaiIcon, decimals: 18 },
  [TokenAddress.BUSD]: { address: TokenAddress.BUSD, name: 'BUSD', logo: BusdIcon, decimals: 18 },
  [TokenAddress.CVX]: { address: TokenAddress.CVX, name: 'CVX', logo: CVXIcon, decimals: 18 },
  [TokenAddress.WSTETH]: { address: TokenAddress.WSTETH, name: 'wstETH', logo: WstETHIcon, decimals: 18 },
  [TokenAddress.LINK]: { address: TokenAddress.LINK, name: 'LINK', logo: LinkIcon, decimals: 18 },
  [TokenAddress.MANA]: { address: TokenAddress.MANA, name: 'MANA', logo: ManaIcon, decimals: 18 },
  [TokenAddress.STETH]: { address: TokenAddress.STETH, name: 'stETH', logo: WstETHIcon, decimals: 18 },
  [TokenAddress.YFI]: { address: TokenAddress.YFI, name: 'YFI', logo: YfiIcon, decimals: 18 },
  [TokenAddress.MKR]: { address: TokenAddress.MKR, name: 'MKR', logo: MkrIcon, decimals: 18 },
  [TokenAddress.BAT]: { address: TokenAddress.BAT, name: 'BAT', logo: BatIcon, decimals: 18 },
  [TokenAddress.UNI]: { address: TokenAddress.UNI, name: 'UNI', logo: UniIcon, decimals: 18 },
  [TokenAddress.ALCX]: { address: TokenAddress.ALCX, name: 'ALCX', logo: AlcxIcon, decimals: 18 },
  [TokenAddress.WBTC]: { address: TokenAddress.WBTC, name: 'WBTC', logo: WbtcIcon, decimals: 18 },
  [TokenAddress.ARMOR]: { address: TokenAddress.ARMOR, name: 'ARMOR', logo: ARMORIcon, decimals: 18 },
  [TokenAddress.FEI]: { address: TokenAddress.FEI, name: 'FEI', logo: FeiIcon, decimals: 18 },
  [TokenAddress.UNKNOWN]: { address: TokenAddress.UNKNOWN, name: 'Unknown', logo: UnknownIcon, decimals: 18 },
  [TokenAddress.DAO]: { address: TokenAddress.DAO, name: 'DAO', logo: DaoTokenIcon, decimals: 18 },
};

export const links = {
  etherscan: environment.isTestnet ? 'https://sepolia.etherscan.io' : 'https://etherscan.io',
};

export const WalletIconsMap = {
  metaMask: '',
  coinbaseWallet: '',
} as const;

export enum OfferState {
  All = 'all',
  Open = 'open',
  Pending = 'pending',
  Accepted = 'accepted',
  Cancelled = 'cancelled',
}

export enum OfferProgress {
  None = 'none',
  Filled = 'filled',
  Approved = 'approved',
  Created = 'created',
}
