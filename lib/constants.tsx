import { Address } from 'viem';

import { IconProps, UnknownIcon, UsdcIcon, UsdtIcon } from '@assets/icons/tokens';
import { environment } from '@lib/environment';

export interface TokenData {
  address: Address;
  name: string;
  logo: React.FC<IconProps>;
  decimals: number;
}

export type Token = 'USDT' | 'META' | 'PUCKI' | 'USDC';

const TokenAddressTestnet: Record<Token, Address> = {
  USDT: '0x820CD06B058dcc48a61f44CE58E03C561DdfDCA9',
  META: '0xB30352A908819A71ed87e451Afc99dD0A34E42Cc',
  PUCKI: '0xcabd7d5dBEeF08b4395bb7caC1b715a0B5625199',
  USDC: '0x1F05b02B94de421820d090F6E9FAa0bdBECdb1B8',
};

// TODO :: fill with real addresses for mainnet
const TokenAddressMainnet: Record<Token, Address> = {
  USDT: '0x820CD06B058dcc48a61f44CE58E03C561DdfDCA9',
  META: '0xB30352A908819A71ed87e451Afc99dD0A34E42Cc',
  PUCKI: '0xcabd7d5dBEeF08b4395bb7caC1b715a0B5625199',
  USDC: '0x1F05b02B94de421820d090F6E9FAa0bdBECdb1B8',
};

export const TokenAddress: Record<Token, Address> = environment.isTestnet ? TokenAddressTestnet : TokenAddressMainnet;

export const TOKEN_MAP: { [address: string]: TokenData } = {
  [TokenAddress.USDT]: { address: TokenAddress.USDT, name: 'USDT', logo: UsdtIcon, decimals: 6 },
  [TokenAddress.META]: { address: TokenAddress.META, name: 'META', logo: UnknownIcon, decimals: 18 },
  [TokenAddress.PUCKI]: { address: TokenAddress.PUCKI, name: 'PUCKI', logo: UnknownIcon, decimals: 18 },
  [TokenAddress.USDC]: { address: TokenAddress.USDC, name: 'USDC', logo: UsdcIcon, decimals: 6 },
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
