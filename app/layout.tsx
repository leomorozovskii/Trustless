'use client';

import { I18nextProvider } from 'react-i18next';
import { Inter } from 'next/font/google';
import '@radix-ui/themes/styles.css';

import { Sidebar } from '@components/Sidebar';
import { OfferProvider } from '@/context/offer/offer-context';
import i18n from '@/i18n';

import '@/styles/globals.scss';

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
        <OfferProvider>
          <I18nextProvider i18n={i18n}>
            <Sidebar>{children}</Sidebar>
          </I18nextProvider>
        </OfferProvider>
      </body>
    </html>
  );
};

export default RootLayout;
