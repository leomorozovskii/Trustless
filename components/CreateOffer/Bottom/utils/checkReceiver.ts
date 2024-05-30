import { Address } from 'viem';

export const checkReceiver = (address: string | undefined) => {
  if (!address) {
    return '0x0000000000000000000000000000000000000000' as Address;
  }
  return address as Address;
};
