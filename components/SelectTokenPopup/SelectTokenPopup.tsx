import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { InputCross } from '@assets/icons';
import { UnknownIcon } from '@assets/icons/tokens';
import { Search } from '@components/Search';
import { useSearchToken } from '@components/SelectTokenPopup/hooks/useSearchToken';
import TokenItem from '@components/SelectTokenPopup/components/TokenItem/TokenItem';
import { IToken } from '@components/SelectTokenPopup/types/useGetUserTokens.types';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { TOKEN_MAP, TokenData } from '@lib/constants';
import { useClickOutside } from '@lib/hooks/useClickOutside';

import { Skeleton } from '@components/Skeleton';
import s from './SelectTokenPopup.module.scss';

interface ISelectTokenPopup {
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelectToken(tokenAddress: string): void;
  type?: 'from' | 'to' | 'default';
}

const SelectTokenPopup: React.FC<ISelectTokenPopup> = ({ setOpened, handleSelectToken, type = 'default' }) => {
  const { t } = useTranslation();
  const { userTokens: tokens } = useOfferCreateContext();

  const ref = useRef<HTMLDivElement | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const { searchedData } = useSearchToken({ query: searchQuery, type });

  const pinnedTokens = useMemo(() => {
    if (type !== 'from') return Object.values(TOKEN_MAP).slice(0, 7);
    if (!tokens && type === 'from') return;
    return tokens.slice(0, 7);
  }, [tokens, type]);

  const pinnedTokenAddresses = new Set(pinnedTokens?.map((token) => token.address));

  const filteredSearchedData = useMemo(() => {
    return searchedData.filter((token) => !pinnedTokenAddresses.has(token.address));
  }, [searchedData, pinnedTokens, tokens]);

  useClickOutside(ref, (ev) => {
    if (!ref.current?.contains(ev.target as Node)) {
      setOpened(false);
    }
  });

  const getTokenIcon = (token: IToken | TokenData) => {
    const item = TOKEN_MAP[token.address];
    if (!item) return UnknownIcon;
    return item.logo;
  };

  const withTokensList = useMemo(() => {
    if (type === 'from' && tokens.length > 7) return true;
    return type !== 'from' && Object.entries(TOKEN_MAP).length > 7;
  }, [tokens, type]);

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
            onChange={({ target }) => setSearchQuery(target.value)}
            id="token search"
          />
          {tokens.length === 0 && (
            <Skeleton loading={!tokens}>
              <p>{`You don't have tokens`}</p>
            </Skeleton>
          )}
          <Skeleton loading={!tokens}>
            <div className={s.popularTokens}>
              {type === 'from'
                ? tokens
                    .slice(0, 7)
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
          <Skeleton loading={!tokens}>
            <div className={s.body}>
              {filteredSearchedData?.map((el) => (
                <button key={el.address} onClick={() => handleSelectToken(el.address)}>
                  <div className={s.item}>
                    {'logo' in el ? <el.logo /> : <UnknownIcon />}
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

export default SelectTokenPopup;
