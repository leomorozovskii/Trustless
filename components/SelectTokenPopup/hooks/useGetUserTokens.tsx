import { useEffect, useState, useCallback } from 'react';
import { Address, erc20Abi, formatUnits, fromHex, getAddress } from 'viem';
import { useAccount, useReadContracts } from 'wagmi';

import { IContractTokens, IToken, IUserTokens } from '@components/SelectTokenPopup/types/useGetUserTokens.types';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { environment } from '@lib/environment';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';

export const useGetUserTokens = () => {
  const { address } = useAccount();
  const { handleAddItem } = useToastifyContext();
  const { setUserTokens } = useOfferCreateContext();

  const [responseTokens, setResponseTokens] = useState<IUserTokens | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;

    const fetchUserTokens = async () => {
      setLoading(true);
      setError(null);

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
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error.message);
        }
        setResponseTokens(data.result);
      } catch (err: any) {
        handleAddItem({ title: 'Tokens Error', text: 'Something went wrong', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchUserTokens();
  }, [address]);

  const getRawTokens = useCallback(() => {
    if (!responseTokens) return;
    if (!responseTokens.tokenBalances) return;
    const contractTokens: IContractTokens[] = [];
    responseTokens.tokenBalances.forEach((el: any) => {
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
  }, [responseTokens]);

  const result = useReadContracts({
    contracts: getRawTokens(),
    allowFailure: false,
  });

  useEffect(() => {
    if (!responseTokens || !result.data) return;

    const tokenData: Omit<IToken, 'address' | 'balance'>[] = [];
    for (let i = 0; i < result.data.length; i += 3) {
      tokenData.push({
        decimals: Number(result.data[i]),
        name: String(result.data[i + 1]),
        symbol: String(result.data[i + 2]),
      });
    }

    const data = responseTokens.tokenBalances.map((token, idx) => {
      const balance = fromHex(token.tokenBalance as Address, 'bigint');
      return {
        address: getAddress(token.contractAddress),
        balance: formatUnits(balance, tokenData[idx].decimals),
        decimals: tokenData[idx].decimals,
        name: tokenData[idx].name,
        symbol: tokenData[idx].symbol,
      };
    });

    setUserTokens(data);
  }, [result.data, responseTokens]);

  return { loading, error };
};
