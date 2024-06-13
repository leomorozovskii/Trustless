import { useCallback, useEffect, useState } from 'react';
import { EstimateContractGasParameters } from 'viem';
import { useAccount, usePublicClient } from 'wagmi';

import { environment } from '@lib/environment';
import { useDebounce } from '@lib/hooks/useDebounce';

interface IEtherscanResponse {
  result: {
    ethbtc?: string;
    ethbtc_timestamp?: string;
    ethusd?: string;
    ethusd_timestamp?: string;
  };
}

export const useGetMinFee = ({ data }: { data: EstimateContractGasParameters | undefined }) => {
  const { address } = useAccount();
  const publicClient = usePublicClient();

  const [minFee, setMinFee] = useState<string | null>(null);
  const [initialCallMade, setInitialCallMade] = useState<boolean>(false);

  const calculateMinGasFee = useCallback(async () => {
    if (!publicClient || !data) return;
    try {
      const gasPrice = await publicClient.getGasPrice();
      const contractGas = await publicClient.estimateContractGas(data);
      const txPriceInWei = (gasPrice * contractGas) / BigInt(10 ** 9);
      const txPriceinEth = Number(txPriceInWei) / 1_000_000_000;
      const response = await fetch(`${environment.etherscanUrl}&module=stats&action=ethprice`);
      const result: IEtherscanResponse = await response.json();
      if (result.result.ethusd) {
        setMinFee((Number(result.result.ethusd) * txPriceinEth).toFixed(2));
      } else {
        throw new Error('Etherscan api error');
      }
    } catch (e) {
      if (e instanceof Error) {
        setMinFee(null);
      }
    }
  }, [publicClient, data]);

  const debouncedCalculateMinGasFee = useDebounce(calculateMinGasFee, 60000);

  useEffect(() => {
    if (!data) return;
    const initialCall = async () => {
      await calculateMinGasFee();
      setInitialCallMade(true);
    };

    if (!initialCallMade) {
      initialCall();
    }
  }, [initialCallMade, calculateMinGasFee, data, address]);

  useEffect(() => {
    if (!address || !initialCallMade) return;

    debouncedCalculateMinGasFee();
    const interval = setInterval(debouncedCalculateMinGasFee, 30000);
    return () => clearInterval(interval);
  }, [publicClient, address, data, debouncedCalculateMinGasFee, initialCallMade]);

  return {
    minFee,
  };
};
