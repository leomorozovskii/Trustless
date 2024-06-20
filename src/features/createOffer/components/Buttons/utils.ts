import type { Address } from 'viem';

const checkAddress = (address: string | undefined) => {
  if (!address) {
    return '0x0000000000000000000000000000000000000000' as Address;
  }
  return address as Address;
};

const checkValidAmount = (value: string) => {
  if (Number.isNaN(Number(value))) return false;
  return Math.sign(Number(value)) === 1;
};

export { checkAddress, checkValidAmount };
