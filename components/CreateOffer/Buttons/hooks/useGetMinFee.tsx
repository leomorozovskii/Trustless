import { useQuery } from '@tanstack/react-query';
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

const fetchEthUsdPrice = async () => {
  const response = await fetch(`${environment.etherscanUrl}&module=stats&action=ethprice`);
  const result: IEtherscanResponse = await response.json();

  return result;
};

const ETH_USD_PRICE_KEY = 'ETH_USD_PRICE';

export const useGetMinFee = ({
  data,
  active,
}: {
  data: EstimateContractGasParameters | undefined;
  active: boolean;
}) => {
  const { data: ethUsdPrice, isError } = useQuery({
    queryKey: [ETH_USD_PRICE_KEY],
    queryFn: fetchEthUsdPrice,
    refetchInterval: 60000,
  });
  const { address } = useAccount();
  const publicClient = usePublicClient();

  const [minFee, setMinFee] = useState<string | null>(null);
  const calculateMinGasFee = useCallback(async () => {
    if (!publicClient || !data || !ethUsdPrice) return;
    try {
      if (isError) throw new Error('Etherscan api error');

      const gasPrice = await publicClient.getGasPrice();
      const contractGas = await publicClient.estimateContractGas(data);
      const txPriceInWei = (gasPrice * contractGas) / BigInt(10 ** 9);
      const txPriceinEth = Number(txPriceInWei) / 1_000_000_000;
      if (ethUsdPrice.result.ethusd) {
        setMinFee((Number(ethUsdPrice.result.ethusd) * txPriceinEth).toFixed(2));
      } else {
        throw new Error('Etherscan api error');
      }
    } catch (e) {
      setMinFee(null);
    }
  }, [publicClient, data, ethUsdPrice, isError]);

  const debouncedCalculateMinGasFee = useDebounce(calculateMinGasFee, 1000);

  useEffect(() => {
    if (!address || !active) return;

    debouncedCalculateMinGasFee();
    const interval = setInterval(debouncedCalculateMinGasFee, 30000);
    return () => clearInterval(interval);
  }, [address, active, debouncedCalculateMinGasFee]);

  return {
    minFee,
  };
};
