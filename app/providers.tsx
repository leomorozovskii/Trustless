'use client';

import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

import { Sidebar } from '@components/Sidebar';
import { Header } from '@components/Header';
import { ThemeProvider } from '@context/theme/ThemeProvider';
import { OfferProvider } from '@context/offer/offer-context';
import i18n from '@/i18n';
import { wagmiConfig } from '@/wagmiConfig';

const queryClient = new QueryClient();

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">
          <ThemeProvider>
            <OfferProvider>
              <I18nextProvider i18n={i18n}>
                <Sidebar>
                  <Header />
                  {children}
                </Sidebar>
              </I18nextProvider>
            </OfferProvider>
          </ThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
