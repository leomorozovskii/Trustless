import { createConfig, http } from 'wagmi';
import { mainnet, sepolia, Chain } from 'wagmi/chains';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  ledgerWallet,
  metaMaskWallet,
  trustWallet,
  walletConnectWallet,
  rainbowWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';

import { environment } from '@/environment';

const network: Chain = environment.isTestnet ? sepolia : mainnet;

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
    [network.id]: http(environment.apiKey),
  },
  ssr: true,
});
