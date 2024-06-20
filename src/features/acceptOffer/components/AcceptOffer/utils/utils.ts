import type { Address } from 'viem';
import { formatUnits, getAddress } from 'viem';

import { TOKEN_MAP } from '@berezka-dao/core/constants';

const isEmptyAddress = (address?: Address | string): boolean => {
  return address === '0x0000000000000000000000000000000000000000';
};

const getIsTokenCustom = (address: Address) => {
  return !TOKEN_MAP[address];
};

const getIsReceiver = (userAddress: Address, receiverAddress: Address) => {
  return getAddress(userAddress) === getAddress(receiverAddress) || isEmptyAddress(receiverAddress);
};

const getIsCreator = (userAddress: Address, creatorAddress: Address) => {
  return getAddress(userAddress) === getAddress(creatorAddress);
};

const getRateToFrom = (amountFrom: bigint, amountTo: bigint, decimalsFrom: string, decimalsTo: string) => {
  const amountToFormatted = formatUnits(amountTo, Number(decimalsFrom));
  const amountFromFormatted = formatUnits(amountFrom, Number(decimalsTo));
  const result = Number(amountFromFormatted) / Number(amountToFormatted);
  return Number(result.toFixed(5));
};

export { getIsTokenCustom, getIsReceiver, getIsCreator, getRateToFrom, isEmptyAddress };
