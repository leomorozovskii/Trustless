export const environment = {
  appName: process.env.NEXT_PUBLIC_APP_NAME!,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
  apiUrl: process.env.NEXT_PUBLIC_ALCHEMY_API_URL!,
  subgraphEndpoint: process.env.NEXT_PUBLIC_SUBGRAPH_ENDPOINT!,
  network: process.env.NEXT_PUBLIC_NETWORK!,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL!,
  etherscanUrl: process.env.NEXT_PUBLIC_ETHERSCAN_API_URL!,
} as const;
