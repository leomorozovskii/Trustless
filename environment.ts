import { Address } from 'viem';

export const environment = {
  appName: process.env.NEXT_PUBLIC_APP_NAME as unknown as string,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as unknown as string,
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as unknown as Address,
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as unknown as string,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL as unknown as string,
} as const;
