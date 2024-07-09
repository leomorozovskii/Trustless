import { customErc20Abi } from '@berezka-dao/core/abis/customErc20Abi';
import type { ContractTokens, ResponseToken } from '@berezka-dao/shared/retrieve-data/useUserTokens/types';

const getRawTokens = (responseTokens: ResponseToken[]) => {
  const contractTokens: ContractTokens[] = [];
  responseTokens.forEach((el: ResponseToken) => {
    contractTokens.push({
      address: el.contractAddress,
      abi: customErc20Abi,
      functionName: 'decimals',
    });
    contractTokens.push({
      address: el.contractAddress,
      abi: customErc20Abi,
      functionName: 'name',
    });
    contractTokens.push({
      address: el.contractAddress,
      abi: customErc20Abi,
      functionName: 'symbol',
    });
  });
  return contractTokens;
};

export { getRawTokens };
