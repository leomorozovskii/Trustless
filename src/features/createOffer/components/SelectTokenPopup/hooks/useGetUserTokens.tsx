import { useEffect } from 'react';
import { formatUnits, fromHex, getAddress } from 'viem';
import { useAccount, useConfig } from 'wagmi';
import { readContracts } from 'wagmi/actions';

import { customErc20Abi } from '@berezka-dao/core/abis/customErc20Abi';
import { environment } from '@berezka-dao/core/environment';
import type {
  ContractTokens,
  ResponseToken,
  ResponseAlchemy,
} from '@berezka-dao/features/createOffer/components/SelectTokenPopup/types';
import { useOfferCreateContext } from '@berezka-dao/features/createOffer/store';
import type { Token } from '@berezka-dao/features/createOffer/types';
import { useToastifyContext } from '@berezka-dao/shared/components/PopupToast';
import { notUndefined } from '@berezka-dao/shared/utils/notUndefined';

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

export const useGetUserTokens = () => {
  const { address } = useAccount();
  const { handleAddItem } = useToastifyContext();
  const { setUserTokens } = useOfferCreateContext();
  const config = useConfig();

  useEffect(() => {
    if (!address) return;

    const fetchUserTokens = async () => {
      setUserTokens({ isLoading: true });

      const requestBody = JSON.stringify({
        jsonrpc: '2.0',
        method: 'alchemy_getTokenBalances',
        headers: {
          'Content-Type': 'application/json',
        },
        params: [address, 'erc20'],
        id: 1,
      });

      const requestOptions: RequestInit = {
        method: 'POST',
        body: requestBody,
        redirect: 'follow',
      };

      try {
        const response = await fetch(environment.apiUrl, requestOptions);
        const data: ResponseAlchemy = await response.json();

        const filteredTokens = data.result.tokenBalances.filter((token) => fromHex(token.tokenBalance, 'number') > 0);

        const result = await readContracts(config, {
          contracts: getRawTokens(filteredTokens),
        });

        const userTokens: Token[] = result
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

        setUserTokens({ tokens: userTokens });
      } catch {
        handleAddItem({ title: 'Tokens Error', text: 'Something went wrong', type: 'error' });
      } finally {
        setUserTokens({ isLoading: false });
      }
    };

    fetchUserTokens();
  }, [address, config, handleAddItem, setUserTokens]);
};
