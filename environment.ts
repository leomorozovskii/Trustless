export const environment = {
  appName: process.env.NEXT_PUBLIC_APP_NAME as unknown as string,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as unknown as string,
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as unknown as string,
} as const;
