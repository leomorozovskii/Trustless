import { createConfig, http } from 'wagmi';
import { mainnet, sepolia, Chain, arbitrum } from 'wagmi/chains';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  ledgerWallet,
  metaMaskWallet,
  trustWallet,
  walletConnectWallet,
  rainbowWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';

import { environment } from '@lib/environment';

const getNetwork = (): Chain => {
  switch (environment.network) {
    case 'mainnet':
      return mainnet;
    case 'arbitrum':
      return arbitrum;
    case 'sepolia':
      return sepolia;
    default: {
      const exhCheck: never = environment.network;
      return exhCheck;
    }
  }
};

const network: Chain = getNetwork();

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Popular',
      wallets: [rainbowWallet, metaMaskWallet, coinbaseWallet, walletConnectWallet],
    },
    {
      groupName: 'Recommended',
      wallets: [ledgerWallet, trustWallet],
    },
  ],
  {
    appName: environment.appName,
    projectId: environment.projectId,
  },
);

export const wagmiConfig = createConfig({
  chains: [network],
  connectors,
  batch: {
    multicall: true,
  },
  transports: {
    [network.id]: http(environment.apiUrl),
  },
  ssr: true,
});

export { network };
