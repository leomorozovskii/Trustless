export const env = {
  NEXT_PUBLIC_FRONTEND_HOST: process.env.NEXT_PUBLIC_FRONTEND_HOST as unknown as string,
  NEXT_PUBLIC_FRONTEND_NAME: process.env.NEXT_PUBLIC_FRONTEND_NAME as unknown as string,
  NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID as unknown as string,
  NEXT_PUBLIC_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as unknown as string,
} as const;
