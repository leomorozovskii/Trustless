import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient();

const QueryProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export { queryClient, QueryProvider as QueryClientProvider };
