'use client';

// eslint-disable-next-line import/no-unassigned-import
import '../styles/globals.scss';

import { Inter } from 'next/font/google';
import * as React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import '@radix-ui/themes/styles.css';

import Providers from './providers';
import { ThemeProvider } from '../src/shared/components/ThemeSwitcher';

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  variable: '--font-family-base',
  subsets: ['latin'],
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <ThemeProvider>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
