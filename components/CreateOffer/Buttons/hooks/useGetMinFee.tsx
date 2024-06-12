import { useEffect, useState } from 'react';
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

export const useGetMinFee = ({
  data,
  active,
}: {
  data: EstimateContractGasParameters | undefined;
  active: boolean;
}) => {
  const [minFee, setMinFee] = useState<string | null>(null);
  const publicClient = usePublicClient();
  const { address } = useAccount();

  useEffect(() => {
    const calculateMinGasFee = async () => {
      if (!publicClient || !address || !data || !active) return;

      const gasPrice = await publicClient.getGasPrice();
      const contractGas = await publicClient.estimateContractGas(data);
      const txPriceInWei = (gasPrice * contractGas) / BigInt(10 ** 9);
      const txPriceinEth = Number(txPriceInWei) / 1_000_000_000;
      const response: IEtherscanResponse = await fetch(environment.etherscanKey).then((res) => res.json());
      if (response.result.ethusd) {
        setMinFee((Number(response.result.ethusd) * txPriceinEth).toFixed(2));
      }
    };

    calculateMinGasFee();
    const interval = setInterval(calculateMinGasFee, 30000);
    return () => clearInterval(interval);
  }, [publicClient, address, data, active]);

  return {
    minFee,
  };
};
