import type { Address } from 'viem';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // APP
      NEXT_PUBLIC_APP_NAME: string;
      NEXT_PUBLIC_PROJECT_ID: string;
      NEXT_PUBLIC_CONTRACT_ADDRESS: Address;
      NEXT_PUBLIC_ALCHEMY_API_URL: string;
      NEXT_PUBLIC_SUBGRAPH_ENDPOINT: string;
      NEXT_PUBLIC_NETWORK: 'mainnet' | 'arbitrum' | 'sepolia';
      NEXT_PUBLIC_SITE_URL: string;
      NEXT_PUBLIC_ETHERSCAN_API_URL: string;
    }
  }
}

export {};
