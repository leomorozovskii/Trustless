'use client';

import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';
import '@radix-ui/themes/styles.css';
import { Inter } from 'next/font/google';
import { WagmiProvider } from 'wagmi';

import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';
import { ThemeProvider } from '@/context/theme/ThemeProvider';
import { OfferProvider } from '@/context/offer/offer-context';
import { wagmiConfig } from '@/wagmiConfig';
import i18n from '@/i18n';

import '@/styles/globals.scss';

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  variable: '--font-family-base',
  subsets: ['latin'],
});

const queryClient = new QueryClient();

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.variable}>
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
      </body>
    </html>
  );
};

export default RootLayout;
