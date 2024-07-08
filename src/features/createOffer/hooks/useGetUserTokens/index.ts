import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { formatUnits, fromHex, getAddress } from 'viem';
import { useAccount, useConfig } from 'wagmi';
import { readContracts } from 'wagmi/actions';

import { customErc20Abi } from '@berezka-dao/core/abis/customErc20Abi';
import { environment } from '@berezka-dao/core/environment';
import { useToastifyContext } from '@berezka-dao/shared/components/PopupToast';
import { notUndefined } from '@berezka-dao/shared/utils/notUndefined';

import type { ContractTokens, ResponseAlchemy, ResponseToken } from './types';
import { useOfferCreateContext } from '../../store';
import type { Token } from '../../types';

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

const RAW_TOKENS_KEY = 'RAW_TOKENS_KEY';

export const useGetUserTokens = () => {
  const { address } = useAccount();
  const { handleAddItem } = useToastifyContext();
  const { setUserTokens, setUserTokensLoading } = useOfferCreateContext();
  const config = useConfig();

  const [pageKey, setPageKey] = useState<string | null | undefined>(null);

  const fetchRawTokens = async () => {
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

    return data;
  };

  const { data: rawTokens } = useQuery({
    queryKey: [RAW_TOKENS_KEY, address, pageKey],
    queryFn: fetchRawTokens,
  });

  useEffect(() => {
    setPageKey(null);
    setUserTokens(null);
  }, [address, setUserTokens]);

  useEffect(() => {
    if (!address || typeof pageKey === 'undefined') return;

    const fetchUserTokens = async () => {
      if (!rawTokens) return;

      setUserTokensLoading(true);

      try {
        const filteredTokens = rawTokens.result.tokenBalances.filter(
          (token) => fromHex(token.tokenBalance, 'number') > 0,
        );

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

        setUserTokens((prevState) => {
          if (!prevState) {
            return newTokens;
          }
          return [...prevState, ...newTokens];
        });
        setPageKey(rawTokens.result.pageKey);
      } catch {
        handleAddItem({ title: 'Tokens Error', text: 'Something went wrong', type: 'error' });
      } finally {
        setUserTokensLoading(false);
      }
    };

    fetchUserTokens();
  }, [address, config, handleAddItem, pageKey, rawTokens, setUserTokens, setUserTokensLoading]);
};
