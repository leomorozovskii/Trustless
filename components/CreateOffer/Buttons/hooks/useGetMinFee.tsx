import { useCallback, useEffect, useState } from 'react';
import { EstimateContractGasParameters } from 'viem';
import { useAccount, usePublicClient } from 'wagmi';

import { environment } from '@lib/environment';
import { useDebounce } from '@lib/hooks/useDebounce';

interface IEtherscanResponse {
  result: {
    ethbtc: string;
    ethbtc_timestamp: string;
    ethusd?: string;
    ethusd_timestamp: string;
  };
}

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
      const response = await fetch(environment.etherscanKey);
      const result: IEtherscanResponse = await response.json();
      if (result.result.ethusd) {
        setMinFee((Number(result.result.ethusd) * txPriceinEth).toFixed(2));
      } else {
        setMinFee(null);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }, [publicClient, data]);

  const debouncedCalculateMinGasFee = useDebounce(calculateMinGasFee, 300);

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
