import { http, createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { injected, metaMask, safe } from 'wagmi/connectors';

// TODO: change address based on env
export const contractAddress = '0xE13aC924bB0B0260b7d7f2710c0224161b9f10Ed'; // Вставьте сюда адрес контракта

export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
    metaMask({
      dappMetadata: {
        name: 'Berezka DAO',
      },
    }),
    safe(),
  ],
  transports: {
    [sepolia.id]: http(),
  },
  ssr: true,
});
