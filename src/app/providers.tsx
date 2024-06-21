import type { FC, PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from '@berezka-dao/../i18n';

import { QueryClientProvider, WagmiConfigProvider } from '@berezka-dao/core/configs';
import { ConnectWalletProvider } from '@berezka-dao/shared/components/ConnectWallet';
import { ToastifyProvider } from '@berezka-dao/shared/components/PopupToast';
import { IsMountedProvider } from '@berezka-dao/shared/hooks/useIsMounted';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <WagmiConfigProvider>
      <QueryClientProvider>
        <ConnectWalletProvider>
          <ToastifyProvider>
            <I18nextProvider i18n={i18n}>
              <IsMountedProvider>{children}</IsMountedProvider>
            </I18nextProvider>
          </ToastifyProvider>
        </ConnectWalletProvider>
      </QueryClientProvider>
    </WagmiConfigProvider>
  );
};

export default Providers;
