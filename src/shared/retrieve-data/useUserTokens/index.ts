import { useQuery } from '@tanstack/react-query';
import { formatUnits, fromHex, getAddress } from 'viem';
import { useAccount, useConfig } from 'wagmi';
import { readContracts } from 'wagmi/actions';

import { environment } from '@berezka-dao/core/environment';
import type { Token } from '@berezka-dao/features/createOffer';
import { useToastifyContext } from '@berezka-dao/shared/components/PopupToast';
import { notUndefined } from '@berezka-dao/shared/utils/notUndefined';

import type { ResponseAlchemy, ResponseToken } from './types';
import { getRawTokens } from './utils';

const USER_TOKENS_KEY = 'USER_TOKENS_KEY';

const useUserTokens = () => {
  const { address } = useAccount();
  const { handleAddItem } = useToastifyContext();
  const config = useConfig();

  return useQuery({
    queryKey: [USER_TOKENS_KEY, address],
    queryFn: async () => {
      let pageKey: string | undefined = undefined;
      let tokens: ResponseToken[] = [];

      try {
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

        const filteredTokens = tokens.filter((token) => fromHex(token.tokenBalance, 'number') > 0);

        const result = await readContracts(config, {
          contracts: getRawTokens(filteredTokens),
        });

        const newTokens: Token[] = result
          .map((_, idx) => {
            if (idx % 3 === 0) {
              if (
                result[idx].status === 'success' &&
                result[idx + 1]?.status === 'success' &&
                result[idx + 2]?.status === 'success'
              ) {
                const balance = fromHex(filteredTokens[idx / 3].tokenBalance, 'bigint');
                return {
                  address: getAddress(filteredTokens[idx / 3].contractAddress),
                  balance: formatUnits(balance, Number(result[idx].result)),
                  decimals: Number(result[idx].result),
                  name: String(result[idx + 1].result),
                  symbol: String(result[idx + 2].result),
                };
              }
            }
            return undefined;
          })
          .filter(notUndefined)
          .sort((a, b) => {
            return Number(b.balance) - Number(a.balance);
          });

        return newTokens;
      } catch {
        handleAddItem({ title: 'Tokens Error', text: 'Something went wrong', type: 'error' });
      }
    },
  });
};

export { useUserTokens, USER_TOKENS_KEY };
