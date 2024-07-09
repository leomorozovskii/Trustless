import { useEffect, useState } from 'react';
import { formatUnits, fromHex, getAddress } from 'viem';
import { useAccount, useConfig } from 'wagmi';
import { readContracts } from 'wagmi/actions';

import { useToastifyContext } from '@berezka-dao/shared/components/PopupToast';
import { useGetRawTokens } from '@berezka-dao/shared/retrieve-data/useGetRawTokens';
import { notUndefined } from '@berezka-dao/shared/utils/notUndefined';

import { getRawTokens } from './utils';
import type { Token } from '../../types';

export const useGetUserTokens = () => {
  const { address } = useAccount();
  const { handleAddItem } = useToastifyContext();
  const config = useConfig();

  const { data: tokens, isLoading } = useGetRawTokens();
  const [userTokens, setUserTokens] = useState<Token[] | null>(null);

  useEffect(() => {
    setUserTokens(null);
  }, [address, setUserTokens]);

  useEffect(() => {
    if (!address) return;

    const fetchUserTokens = async () => {
      if (!tokens) return;

      try {
        const result = await readContracts(config, {
          contracts: getRawTokens(tokens),
        });

        const newTokens: Token[] = result
          .map((_, idx) => {
            if (idx % 3 === 0) {
              if (
                result[idx].status === 'success' &&
                result[idx + 1]?.status === 'success' &&
                result[idx + 2]?.status === 'success'
              ) {
                const balance = fromHex(tokens[idx / 3].tokenBalance, 'bigint');
                return {
                  address: getAddress(tokens[idx / 3].contractAddress),
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

        setUserTokens((prevState) => {
          if (!prevState) {
            return newTokens;
          }
          return [...prevState, ...newTokens];
        });
      } catch {
        handleAddItem({ title: 'Tokens Error', text: 'Something went wrong', type: 'error' });
      }
    };

    fetchUserTokens();
  }, [address, config, handleAddItem, tokens, setUserTokens]);

  return {
    userTokens,
    isLoading,
  };
};
