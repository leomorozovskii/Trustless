import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  ledgerWallet,
  metaMaskWallet,
  trustWallet,
  walletConnectWallet,
  rainbowWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';
import React from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import type { Chain } from 'wagmi/chains';
import { mainnet, sepolia, arbitrum } from 'wagmi/chains';

import { environment } from '@berezka-dao/core/environment';

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

const wagmiConfig = createConfig({
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

const WagmiConfigProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
};

export { network, wagmiConfig, WagmiConfigProvider };
