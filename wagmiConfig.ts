import { http, createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  ledgerWallet,
  metaMaskWallet,
  trustWallet,
  walletConnectWallet,
  rainbowWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { env } from '@/env';

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
    appName: env.NEXT_PUBLIC_FRONTEND_NAME,
    projectId: env.NEXT_PUBLIC_PROJECT_ID,
  },
);

export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors,
  transports: {
    [sepolia.id]: http(),
  },
  ssr: true,
});
