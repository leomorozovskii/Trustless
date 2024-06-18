import type { Address } from 'viem';

// eslint-disable-next-line import/no-restricted-paths
import { UsdtIcon, UnknownIcon, UsdcIcon } from '@berezka-dao/shared/icons/tokens';

import type { TokenMap } from '../types';

type TokenSepolia = 'USDT' | 'META' | 'PUCKI' | 'USDC';

const TokenAddressSepolia: Record<TokenSepolia, Address> = {
  USDT: '0x820CD06B058dcc48a61f44CE58E03C561DdfDCA9',
  META: '0xB30352A908819A71ed87e451Afc99dD0A34E42Cc',
  PUCKI: '0xcabd7d5dBEeF08b4395bb7caC1b715a0B5625199',
  USDC: '0x1F05b02B94de421820d090F6E9FAa0bdBECdb1B8',
};

export const TOKEN_MAP_SEPOLIA: TokenMap = {
  [TokenAddressSepolia.USDT]: { address: TokenAddressSepolia.USDT, name: 'USDT', logo: UsdtIcon, decimals: 6 },
  [TokenAddressSepolia.META]: { address: TokenAddressSepolia.META, name: 'META', logo: UnknownIcon, decimals: 18 },
  [TokenAddressSepolia.PUCKI]: { address: TokenAddressSepolia.PUCKI, name: 'PUCKI', logo: UnknownIcon, decimals: 18 },
  [TokenAddressSepolia.USDC]: { address: TokenAddressSepolia.USDC, name: 'USDC', logo: UsdcIcon, decimals: 6 },
};
