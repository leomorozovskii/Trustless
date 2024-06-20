import type { Address } from 'viem';

import {
  UsdtIcon,
  UsdcIcon,
  WbtcIcon,
  LinkIcon,
  UniIcon,
  WeethIcon,
  PepeIcon,
  DaiIcon,
  // eslint-disable-next-line import/no-restricted-paths
} from '@berezka-dao/shared/icons/tokens';

import type { TokenMap } from '../types';

type TokenArbitrum = 'USDT' | 'USDC.e' | 'USDC' | 'WBTC' | 'LINK' | 'UNI' | 'weETH' | 'PEPE' | 'DAI';

const TokenAddressArbitrum: Record<TokenArbitrum, Address> = {
  USDT: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
  USDC: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  'USDC.e': '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
  WBTC: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
  LINK: '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
  UNI: '0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0',
  weETH: '0x35751007a407ca6FEFfE80b3cB397736D2cf4dbe',
  PEPE: '0x25d887Ce7a35172C62FeBFD67a1856F20FaEbB00',
  DAI: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
};

export const TOKEN_MAP_ARBITRUM: TokenMap = {
  [TokenAddressArbitrum.USDT]: { address: TokenAddressArbitrum.USDT, symbol: 'USDT', logo: UsdtIcon, decimals: 6 },
  [TokenAddressArbitrum.USDC]: { address: TokenAddressArbitrum.USDC, symbol: 'USDC', logo: UsdcIcon, decimals: 6 },
  [TokenAddressArbitrum['USDC.e']]: {
    address: TokenAddressArbitrum['USDC.e'],
    symbol: 'USDC.e',
    logo: UsdcIcon,
    decimals: 6,
  },
  [TokenAddressArbitrum.WBTC]: { address: TokenAddressArbitrum.WBTC, symbol: 'WBTC', logo: WbtcIcon, decimals: 8 },
  [TokenAddressArbitrum.LINK]: { address: TokenAddressArbitrum.LINK, symbol: 'LINK', logo: LinkIcon, decimals: 18 },
  [TokenAddressArbitrum.UNI]: { address: TokenAddressArbitrum.UNI, symbol: 'UNI', logo: UniIcon, decimals: 18 },
  [TokenAddressArbitrum.weETH]: { address: TokenAddressArbitrum.weETH, symbol: 'weETH', logo: WeethIcon, decimals: 18 },
  [TokenAddressArbitrum.PEPE]: { address: TokenAddressArbitrum.PEPE, symbol: 'PEPE', logo: PepeIcon, decimals: 18 },
  [TokenAddressArbitrum.DAI]: { address: TokenAddressArbitrum.DAI, symbol: 'DAI', logo: DaiIcon, decimals: 18 },
};
