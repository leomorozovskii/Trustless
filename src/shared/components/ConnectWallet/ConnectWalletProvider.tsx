'use client';

import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';

import { useTheme } from '../ThemeSwitcher';

const ConnectWalletProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <RainbowKitProvider modalSize="compact" theme={theme === 'light' ? lightTheme() : darkTheme()}>
      {children}
    </RainbowKitProvider>
  );
};

export { ConnectWalletProvider };
