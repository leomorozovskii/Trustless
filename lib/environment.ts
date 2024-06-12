import { Address } from 'viem';

type SupportedNetworks = 'mainnet' | 'arbitrum' | 'sepolia';

export const environment = {
  appName: process.env.NEXT_PUBLIC_APP_NAME as unknown as string,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as unknown as string,
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as unknown as Address,
  apiUrl: process.env.NEXT_PUBLIC_ALCHEMY_API_URL as unknown as string,
  subgraphEndpoint: process.env.NEXT_PUBLIC_SUBGRAPH_ENDPOINT as unknown as string,
  network: process.env.NEXT_PUBLIC_NETWORK as unknown as SupportedNetworks,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL as unknown as string,
  etherscanKey: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY as unknown as string,
} as const;
