// eslint-disable-next-line import/no-unassigned-import
import '../styles/globals.scss';
import '@rainbow-me/rainbowkit/styles.css';
import '@radix-ui/themes/styles.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

import { ConnectionGuardLayout } from '@berezka-dao/layouts/ConnectionGuardLayout';

import Providers from './providers';

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  variable: '--font-family-base',
  subsets: ['latin'],
});

const metadata: Metadata = {
  title: 'Trustless OTC - exchanging any ERC20 token for token',
  description: 'Trustless OTC exchange for ERC20 tokens',
  keywords: 'exchange,OTC,ERC20,Ethereum,Arbitrum,DAO,',
  robots: 'index,follow',
  manifest: '/manifest.webmanifest',
  icons: [
    {
      url: '/icons/favicon.ico',
      type: 'image/x-icon',
    },
    {
      url: '/icons/favicon-16x16.png',
      type: 'image/png',
      sizes: '16x16',
    },
    {
      url: '/icons/favicon-32x32.png',
      type: 'image/png',
      sizes: '32x32',
    },
    {
      url: '/icons/apple-touch-icon.png',
      type: 'image/png',
      rel: 'apple-touch-icon',
      sizes: '180x180',
    },
    {
      url: '/icons/safari-pinned-tab.svg',
      rel: 'mask-icon',
      color: '#5bbad5',
    },
  ],
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Providers>
          <ConnectionGuardLayout>{children}</ConnectionGuardLayout>
        </Providers>
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
