import type { Address } from 'viem';
import { formatUnits, getAddress } from 'viem';

import { TOKEN_MAP } from '@berezka-dao/core/constants';

const isEmptyAddress = (address?: Address | string): boolean => {
  return address === '0x0000000000000000000000000000000000000000';
};

const getIsTokenCustom = (address: Address) => {
  return !TOKEN_MAP[address];
};

const getIsReceiver = (userAddress: Address | undefined, receiverAddress: Address) => {
  if (!userAddress) return;
  return getAddress(userAddress) === getAddress(receiverAddress) || isEmptyAddress(receiverAddress);
};

const getIsCreator = (userAddress: Address | undefined, creatorAddress: Address) => {
  if (!userAddress) return;
  return getAddress(userAddress) === getAddress(creatorAddress);
};

const getRateToFrom = (amountFrom: string, amountTo: string, decimalsFrom: string, decimalsTo: string) => {
  const amountToFormatted = formatUnits(BigInt(amountTo), Number(decimalsFrom));
  const amountFromFormatted = formatUnits(BigInt(amountFrom), Number(decimalsTo));
  const result = Number(amountFromFormatted) / Number(amountToFormatted);
  return Number(result.toFixed(5));
};

export { getIsTokenCustom, getIsReceiver, getIsCreator, getRateToFrom, isEmptyAddress };
