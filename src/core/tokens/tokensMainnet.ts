import type { Address } from 'viem';

import {
  UsdtIcon,
  UsdcIcon,
  StETHIcon,
  ShibIcon,
  XrpIcon,
  ToncoinIcon,
  WethIcon,
  WbtcIcon,
  LinkIcon,
  UniIcon,
  NearIcon,
  WeethIcon,
  LeoIcon,
  PepeIcon,
  DaiIcon,
  BnbIcon,
  // eslint-disable-next-line import/no-restricted-paths
} from '@berezka-dao/shared/icons/tokens';

import type { TokenMap } from '../types';

type TokenMainnet =
  | 'USDT'
  | 'USDC'
  | 'stETH'
  | 'SHIB'
  | 'XRP'
  | 'TONCOIN'
  | 'WETH'
  | 'WBTC'
  | 'LINK'
  | 'UNI'
  | 'NEAR'
  | 'weETH'
  | 'LEO'
  | 'PEPE'
  | 'DAI'
  | 'BNB';

const TokenAddressMainnet: Record<TokenMainnet, Address> = {
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  stETH: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
  SHIB: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
  XRP: '0x628F76eAB0C1298F7a24d337bBbF1ef8A1Ea6A24',
  TONCOIN: '0x582d872A1B094FC48F5DE31D3B73F2D9bE47def1',
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  WBTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  UNI: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  NEAR: '0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4',
  weETH: '0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee',
  LEO: '0x2AF5D2aD76741191D15Dfe7bF6aC92d4Bd912Ca3',
  PEPE: '0x6982508145454Ce325dDbE47a25d4ec3d2311933',
  DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  BNB: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
};

export const TOKEN_MAP_MAINNET: TokenMap = {
  [TokenAddressMainnet.USDT]: { address: TokenAddressMainnet.USDT, name: 'USDT', logo: UsdtIcon, decimals: 6 },
  [TokenAddressMainnet.USDC]: { address: TokenAddressMainnet.USDC, name: 'USDC', logo: UsdcIcon, decimals: 6 },
  [TokenAddressMainnet.stETH]: { address: TokenAddressMainnet.stETH, name: 'stETH', logo: StETHIcon, decimals: 18 },
  [TokenAddressMainnet.SHIB]: { address: TokenAddressMainnet.SHIB, name: 'SHIB', logo: ShibIcon, decimals: 18 },
  [TokenAddressMainnet.XRP]: { address: TokenAddressMainnet.XRP, name: 'XRP', logo: XrpIcon, decimals: 0 },
  [TokenAddressMainnet.TONCOIN]: {
    address: TokenAddressMainnet.TONCOIN,
    name: 'TONCOIN',
    logo: ToncoinIcon,
    decimals: 9,
  },
  [TokenAddressMainnet.WETH]: { address: TokenAddressMainnet.WETH, name: 'WETH', logo: WethIcon, decimals: 18 },
  [TokenAddressMainnet.WBTC]: { address: TokenAddressMainnet.WBTC, name: 'WBTC', logo: WbtcIcon, decimals: 8 },
  [TokenAddressMainnet.LINK]: { address: TokenAddressMainnet.LINK, name: 'LINK', logo: LinkIcon, decimals: 18 },
  [TokenAddressMainnet.UNI]: { address: TokenAddressMainnet.UNI, name: 'UNI', logo: UniIcon, decimals: 18 },
  [TokenAddressMainnet.NEAR]: { address: TokenAddressMainnet.NEAR, name: 'NEAR', logo: NearIcon, decimals: 24 },
  [TokenAddressMainnet.weETH]: { address: TokenAddressMainnet.weETH, name: 'weETH', logo: WeethIcon, decimals: 18 },
  [TokenAddressMainnet.LEO]: { address: TokenAddressMainnet.LEO, name: 'LEO', logo: LeoIcon, decimals: 18 },
  [TokenAddressMainnet.PEPE]: { address: TokenAddressMainnet.PEPE, name: 'PEPE', logo: PepeIcon, decimals: 18 },
  [TokenAddressMainnet.DAI]: { address: TokenAddressMainnet.DAI, name: 'DAI', logo: DaiIcon, decimals: 18 },
  [TokenAddressMainnet.BNB]: { address: TokenAddressMainnet.BNB, name: 'BNB', logo: BnbIcon, decimals: 18 },
};
