'use client';

import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { darkTheme, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

import { Sidebar } from '@components/Sidebar';
import { Header } from '@components/Header';
import { useTheme } from '@context/theme/ThemeProvider';
import { ToastifyProvider } from '@context/toastify/ToastifyProvider';
import { OfferAcceptProvider } from '@context/offer/accept/OfferAcceptContext';
import { OfferCreateProvider } from '@context/offer/create/OfferCreateContext';
import i18n from '@/i18n';
import { wagmiConfig } from '@/wagmiConfig';

const queryClient = new QueryClient();

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { theme } = useTheme();

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" theme={theme === 'light' ? lightTheme() : darkTheme()}>
          <ToastifyProvider>
            <OfferCreateProvider>
              <OfferAcceptProvider>
                <I18nextProvider i18n={i18n}>
                  <Sidebar>
                    <Header />
                    {children}
                  </Sidebar>
                </I18nextProvider>
              </OfferAcceptProvider>
            </OfferCreateProvider>
          </ToastifyProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
