import { useEffect } from 'react';
import { erc20Abi, formatUnits, fromHex, getAddress } from 'viem';
import { useAccount, useConfig } from 'wagmi';
import { readContracts } from '@wagmi/core';

import {
  IContractTokens,
  IToken,
  IResponseToken,
  IResponseAlchemy,
} from '@components/SelectTokenPopup/types/useGetUserTokens.types';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { environment } from '@lib/environment';

const getRawTokens = (responseTokens: IResponseToken[]) => {
  const contractTokens: IContractTokens[] = [];
  responseTokens.forEach((el: IResponseToken) => {
    contractTokens.push({
      address: el.contractAddress,
      abi: erc20Abi,
      functionName: 'decimals',
    });
    contractTokens.push({
      address: el.contractAddress,
      abi: erc20Abi,
      functionName: 'name',
    });
    contractTokens.push({
      address: el.contractAddress,
      abi: erc20Abi,
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
        const response = await fetch(environment.apiKey, requestOptions);
        const data: IResponseAlchemy = await response.json();

        const filteredTokens = data.result.tokenBalances.filter((token) => fromHex(token.tokenBalance, 'number') > 0);

        const result = await readContracts(config, {
          contracts: getRawTokens(filteredTokens),
        });

        const validTokens: Omit<IToken, 'address' | 'balance'>[] = [];
        for (let i = 0; i < result.length; i += 3) {
          if (result[i].status === 'failure') {
            filteredTokens.splice(i / 3, 1);
          }

          if (
            result[i].status === 'success' &&
            result[i + 1]?.status === 'success' &&
            result[i + 2]?.status === 'success'
          ) {
            validTokens.push({
              decimals: Number(result[i].result),
              name: String(result[i + 1].result),
              symbol: String(result[i + 2].result),
            });
          }
        }

        const finalData = filteredTokens.map((token, idx) => {
          const balance = fromHex(token.tokenBalance, 'bigint');
          return {
            address: getAddress(token.contractAddress),
            balance: formatUnits(balance, validTokens[idx].decimals),
            decimals: validTokens[idx].decimals,
            name: validTokens[idx].name,
            symbol: validTokens[idx].symbol,
          };
        });

        const filteredData = finalData.sort((a, b) => {
          return Number(b.balance) - Number(a.balance);
        });

        setUserTokens({ tokens: filteredData });
      } catch (err: any) {
        handleAddItem({ title: 'Tokens Error', text: 'Something went wrong', type: 'error' });
      } finally {
        setUserTokens({ isLoading: false });
      }
    };

    fetchUserTokens();
  }, [address, config, handleAddItem, setUserTokens]);
};
