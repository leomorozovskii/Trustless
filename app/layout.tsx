// top to the file
'use client';
import { Sidebar } from '@components/Sidebar';
import i18n from '@src/i18n';
import { Inter } from 'next/font/google';
import { I18nextProvider } from 'react-i18next';
import '../styles/globals.scss';
import '@radix-ui/themes/styles.css';
import { Header } from '@components/Header';

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  variable: '--font-family-base',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <I18nextProvider i18n={i18n}>
          <Sidebar>
            <Header />
            {children}
          </Sidebar>
        </I18nextProvider>
      </body>
    </html>
  );
}
