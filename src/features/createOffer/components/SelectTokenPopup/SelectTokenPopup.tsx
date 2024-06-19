import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TOKEN_MAP } from '@berezka-dao/core/constants';
import type { TokenData } from '@berezka-dao/core/types';
import { useOfferCreateContext } from '@berezka-dao/features/createOffer/store';
import { useClickOutside } from '@berezka-dao/shared/hooks/useClickOutside';
import { InputCross } from '@berezka-dao/shared/icons';
import { UnknownIcon } from '@berezka-dao/shared/icons/tokens';
import { Search } from '@berezka-dao/shared/ui-kit/Search';
import { Skeleton } from '@berezka-dao/shared/ui-kit/Skeleton';

import { TokenItem } from './components/TokenItem';
import { useSearchToken } from './hooks/useSearchToken';
import s from './SelectTokenPopup.module.scss';
import type { IToken } from './types';

interface ISelectTokenPopup {
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  type?: 'from' | 'to' | 'default';
  handleSelectToken(tokenAddress: string): void;
}

const SelectTokenPopup: React.FC<ISelectTokenPopup> = ({ setOpened, handleSelectToken, type = 'default' }) => {
  const { t } = useTranslation();
  const { userTokens } = useOfferCreateContext();

  const ref = useRef<HTMLDivElement | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const { searchedData } = useSearchToken({ query: searchQuery, type });

  const pinnedTokens = useMemo(() => {
    if (type !== 'from') return Object.values(TOKEN_MAP).slice(0, 7);
    if (!userTokens.tokens && type === 'from') return;
    return userTokens.tokens?.slice(0, 7);
  }, [userTokens.tokens, type]);

  const pinnedTokenAddresses = useMemo(() => {
    return new Set(pinnedTokens?.map((token) => token.address));
  }, [pinnedTokens]);

  const filteredSearchedData = useMemo(() => {
    return searchedData.filter((token) => !pinnedTokenAddresses.has(token.address));
  }, [searchedData, pinnedTokenAddresses]);

  useClickOutside(ref, (ev) => {
    if (!ref.current?.contains(ev.currentTarget as Node)) {
      setOpened(false);
    }
  });

  const getTokenIcon = (token: IToken | TokenData) => {
    const item = TOKEN_MAP[token.address];
    if (!item) return UnknownIcon;
    return item.logo;
  };

  const withTokensList = useMemo(() => {
    if (type === 'from' && userTokens.tokens && userTokens.tokens.length > 7) return true;
    return type !== 'from' && Object.entries(TOKEN_MAP).length > 7;
  }, [userTokens.tokens, type]);

  return (
    <div className={s.wrapper}>
      <div className={s.container} ref={ref}>
        <div className={s.header}>
          <div className={s.titleContainer}>
            <h2 className={s.title}>{t('token.select')}</h2>
            <InputCross onClick={() => setOpened(false)} className={s.cross} />
          </div>
          <Search
            type="text"
            value={searchQuery}
            placeholder={t('Search asset or paste address')}
            onChange={({ currentTarget }) => setSearchQuery(currentTarget.value)}
            id="token search"
          />
          {userTokens.tokens?.length === 0 && type === 'from' && (
            <Skeleton loading={userTokens.isLoading}>
              <p>{`You don't have tokens`}</p>
            </Skeleton>
          )}
          <Skeleton loading={userTokens.isLoading}>
            <div className={s.pinnedTokens}>
              {type === 'from'
                ? userTokens.tokens
                    ?.slice(0, 7)
                    .map((token, idx) => (
                      <TokenItem
                        onClick={() => handleSelectToken(token.address)}
                        key={idx}
                        title={token.symbol}
                        IconComponent={getTokenIcon(token)}
                      />
                    ))
                : Object.entries(TOKEN_MAP)
                    .slice(0, 7)
                    .map(([address, token], idx) => (
                      <TokenItem
                        onClick={() => handleSelectToken(address)}
                        key={idx}
                        title={token.name}
                        IconComponent={getTokenIcon(token)}
                      />
                    ))}
            </div>
          </Skeleton>
        </div>
        {withTokensList && (
          <Skeleton loading={userTokens.isLoading}>
            <div className={s.body}>
              {filteredSearchedData?.map((el) => (
                <button key={el.address} onClick={() => handleSelectToken(el.address)}>
                  <div className={s.item}>
                    {'logo' in el ? <el.logo width={20} height={20} /> : <UnknownIcon />}
                    <p className={s.label}>{el.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </Skeleton>
        )}
      </div>
    </div>
  );
};

export { SelectTokenPopup };
