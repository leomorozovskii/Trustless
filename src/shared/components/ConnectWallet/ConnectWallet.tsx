import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { AccountIcon } from '@berezka-dao/shared/icons';
import { Button } from '@berezka-dao/shared/ui-kit/Button';

import s from './ConnectWallet.module.scss';

const ConnectWallet = () => {
  const { t } = useTranslation();
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button className={s.button} onClick={openConnectModal} type="button">
                    {t('shared.connectWallet')}
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} type="button">
                    {t('shared.wrongNetwork')}
                  </Button>
                );
              }
              return (
                <div className={s.infoWrapper}>
                  <button className={s.infoContainer} onClick={openChainModal} type="button">
                    {chain.hasIcon && (
                      <div className={s.flex}>
                        {chain.iconUrl && (
                          <Image
                            src={chain.iconUrl}
                            alt={chain.name ?? 'Chain icon'}
                            width={24}
                            height={24}
                            quality={100}
                          />
                        )}
                      </div>
                    )}
                    {account.displayBalance?.toString()}
                  </button>
                  <button className={s.accountContainer} onClick={openAccountModal} type="button">
                    <AccountIcon className={s.accountIcon} />
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export { ConnectWallet };
