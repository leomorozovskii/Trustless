// top to the file
'use client';
import { Sidebar } from '@components/Sidebar';
import i18n from '@src/i18n';
import { Inter } from 'next/font/google';
import { OfferProvider } from '@src/context/offer/offer-context';
import { I18nextProvider } from 'react-i18next';
import { wagmiConfig } from '../wagmiConfig';
import '../styles/globals.scss';
import '@radix-ui/themes/styles.css';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { WalletOptions } from '@components/WalletOptions';
import { WalletAccount } from '@components/WalletAccount';

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  variable: '--font-family-base',
  subsets: ['latin'],
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <OfferProvider>
              <I18nextProvider i18n={i18n}>
                {/* TODO: Change to Real Account */}
                <WalletOptions />
                <WalletAccount />
                <Sidebar>{children}</Sidebar>
              </I18nextProvider>
            </OfferProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
