// top to the file

'use client';

import { Sidebar } from '@components/Sidebar';
import i18n from '@/i18n';
import { Inter } from 'next/font/google';
import { OfferProvider } from '@/context/offer/offer-context';
import { ThemeProvider } from '@/context/theme/ThemeProvider';
import { I18nextProvider } from 'react-i18next';
import '../styles/globals.scss';
import '@radix-ui/themes/styles.css';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { WalletOptions } from '@components/WalletOptions';
import { WalletAccount } from '@components/WalletAccount';
import { Header } from '@components/Header';
import { wagmiConfig } from '@/wagmiConfig';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

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
                    {/* TODO: Change to Real Account */}
                    <Sidebar>
                      <WalletOptions />
                      <WalletAccount />
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
