import type { Address } from 'viem';

export const isEmptyAddress = (address?: Address | string): boolean => {
  return address === '0x0000000000000000000000000000000000000000';
};
