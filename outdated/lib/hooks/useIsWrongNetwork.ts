import { useAccount, useChains } from 'wagmi';

const useIsWrongNetwork = () => {
  const { chainId, isConnected } = useAccount();
  const chains = useChains();
  return isConnected && !chains.some((chain) => chain.id === chainId);
};

export { useIsWrongNetwork };
