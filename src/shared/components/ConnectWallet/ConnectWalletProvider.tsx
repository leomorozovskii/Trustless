'use client';

import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import type { FC, PropsWithChildren } from 'react';

import { useTheme } from '../ThemeSwitcher';

const ConnectWalletProvider: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <RainbowKitProvider modalSize="compact" theme={theme === 'light' ? lightTheme() : darkTheme()}>
      {children}
    </RainbowKitProvider>
  );
};

export { ConnectWalletProvider };
