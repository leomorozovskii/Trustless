import { useQuery } from '@tanstack/react-query';
import { fromHex } from 'viem';
import { useAccount } from 'wagmi';

import { environment } from '@berezka-dao/core/environment';

import type { ResponseAlchemy, ResponseToken } from './types';

const RAW_TOKENS_KEY = 'RAW_TOKENS_KEY';

const useGetRawTokens = () => {
  const { address } = useAccount();

  return useQuery({
    queryKey: [RAW_TOKENS_KEY, address],
    queryFn: async () => {
      let pageKey: string | undefined = undefined;
      let tokens: ResponseToken[] = [];

      do {
        const requestBody = JSON.stringify({
          jsonrpc: '2.0',
          method: 'alchemy_getTokenBalances',
          headers: {
            'Content-Type': 'application/json',
          },
          params: [address, 'erc20', { pageKey }],
          id: 1,
        });

        const requestOptions: RequestInit = {
          method: 'POST',
          body: requestBody,
          redirect: 'follow',
        };

        const response = await fetch(environment.apiUrl, requestOptions);
        const data: ResponseAlchemy = await response.json();
        pageKey = data.result.pageKey;
        tokens = tokens.concat(data.result.tokenBalances);
      } while (pageKey);

      return tokens.filter((token) => fromHex(token.tokenBalance, 'number') > 0);
    },
  });
};

export { useGetRawTokens, RAW_TOKENS_KEY };
