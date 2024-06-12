import { useCallback, useEffect, useRef, useState } from 'react';
import { EstimateContractGasParameters } from 'viem';
import { useAccount, usePublicClient } from 'wagmi';

import { environment } from '@lib/environment';

interface IEtherscanResponse {
  result: {
    ethbtc: string;
    ethbtc_timestamp: string;
    ethusd: string;
    ethusd_timestamp: string;
  };
}

const useDebounce = (callback: Function, delay: number) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: any) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export const useGetMinFee = ({ data }: { data: EstimateContractGasParameters | undefined }) => {
  const { address } = useAccount();
  const publicClient = usePublicClient();

  const [minFee, setMinFee] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateMinGasFee = useCallback(async () => {
    if (!publicClient || !data) return;
    try {
      const gasPrice = await publicClient.getGasPrice();
      const contractGas = await publicClient.estimateContractGas(data);
      const txPriceInWei = (gasPrice * contractGas) / BigInt(10 ** 9);
      const txPriceinEth = Number(txPriceInWei) / 1_000_000_000;
      const response: IEtherscanResponse = await fetch(environment.etherscanKey).then((res) => res.json());
      if (response.result.ethusd) {
        setMinFee((Number(response.result.ethusd) * txPriceinEth).toFixed(2));
      } else {
        setMinFee(null);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }, [publicClient, data]);

  const debouncedCalculateMinGasFee = useDebounce(calculateMinGasFee, 1000);

  useEffect(() => {
    if (!address) return;

    debouncedCalculateMinGasFee();
    const interval = setInterval(debouncedCalculateMinGasFee, 30000);
    return () => clearInterval(interval);
  }, [publicClient, address, data, debouncedCalculateMinGasFee]);

  return {
    minFee,
    error,
  };
};
