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

export interface TokenData {
  name: string;
  logo: React.FC<IconProps>;
}

export enum TokenAddress {
  USDT = '0x0000000000000000000000000000000000000001',
  ETH = '0x0000000000000000000000000000000000000002',
  CBETH = '0x0000000000000000000000000000000000000003',
  WETH = '0x0000000000000000000000000000000000000004',
  DAI = '0x0000000000000000000000000000000000000005',
  BUSD = '0x0000000000000000000000000000000000000006',
  USDC = '0x0000000000000000000000000000000000000007',
  CVX = '0x0000000000000000000000000000000000000008',
  WSTETH = '0x0000000000000000000000000000000000000009',
  LINK = '0x000000000000000000000000000000000000000a',
  MANA = '0x000000000000000000000000000000000000000b',
  STETH = '0x000000000000000000000000000000000000000c',
  YFI = '0x000000000000000000000000000000000000000d',
  MKR = '0x000000000000000000000000000000000000000e',
  BAT = '0x000000000000000000000000000000000000000f',
  UNI = '0x0000000000000000000000000000000000000010',
  ALCX = '0x0000000000000000000000000000000000000011',
  WBTC = '0x0000000000000000000000000000000000000012',
  ARMOR = '0x0000000000000000000000000000000000000013',
  FEI = '0x0000000000000000000000000000000000000014',
  UNKNOWN = '0x0000000000000000000000000000000000000015',
  DAO = '0x0000000000000000000000000000000000000016',
}

export const TOKEN_MAP: { [address: string]: TokenData } = {
  [TokenAddress.USDT]: { name: 'USDT', logo: UsdtIcon },
  [TokenAddress.ETH]: { name: 'ETH', logo: EthIcon },
  [TokenAddress.CBETH]: { name: 'cbETH', logo: CbETHIcon },
  [TokenAddress.WETH]: { name: 'WETH', logo: WethIcon },
  [TokenAddress.DAI]: { name: 'DAI', logo: DaiIcon },
  [TokenAddress.BUSD]: { name: 'BUSD', logo: BusdIcon },
  [TokenAddress.USDC]: { name: 'USDC', logo: UsdcIcon },
  [TokenAddress.CVX]: { name: 'CVX', logo: CVXIcon },
  [TokenAddress.WSTETH]: { name: 'wstETH', logo: WstETHIcon },
  [TokenAddress.LINK]: { name: 'LINK', logo: LinkIcon },
  [TokenAddress.MANA]: { name: 'MANA', logo: ManaIcon },
  [TokenAddress.STETH]: { name: 'stETH', logo: WstETHIcon },
  [TokenAddress.YFI]: { name: 'YFI', logo: YfiIcon },
  [TokenAddress.MKR]: { name: 'MKR', logo: MkrIcon },
  [TokenAddress.BAT]: { name: 'BAT', logo: BatIcon },
  [TokenAddress.UNI]: { name: 'UNI', logo: UniIcon },
  [TokenAddress.ALCX]: { name: 'ALCX', logo: AlcxIcon },
  [TokenAddress.WBTC]: { name: 'WBTC', logo: WbtcIcon },
  [TokenAddress.ARMOR]: { name: 'ARMOR', logo: ARMORIcon },
  [TokenAddress.FEI]: { name: 'FEI', logo: FeiIcon },
  [TokenAddress.UNKNOWN]: { name: 'Unknown', logo: UnknownIcon },
  [TokenAddress.DAO]: { name: 'DAO', logo: DaoTokenIcon },
};

export enum OfferState {
  All = 'all',
  Open = 'open',
  Pending = 'pending',
  Accepted = 'accepted',
  Cancelled = 'cancelled',
}

export enum CreateOfferState {
  None = 'none',
  Filled = 'filled',
  Approved = 'approved',
  Created = 'created',
}
