import type { FC } from 'react';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TOKEN_MAP } from '@berezka-dao/core/constants';
import type { TokenData } from '@berezka-dao/core/types';
import type { Token } from '@berezka-dao/features/createOffer/types';
import { useClickOutside } from '@berezka-dao/shared/hooks/useClickOutside';
import { InputCross } from '@berezka-dao/shared/icons';
import { UnknownIcon } from '@berezka-dao/shared/icons/tokens';
import { Search } from '@berezka-dao/shared/ui-kit/Search';
import { Skeleton } from '@berezka-dao/shared/ui-kit/Skeleton';

import { TokenItem } from './components/TokenItem';
import { useSearchToken } from './hooks/useSearchToken';
import s from './SelectTokenPopup.module.scss';

type Props = {
  tokens: Token[] | TokenData[] | null;
  isLoading?: boolean;
  onClose(): void;
  onSelect(tokenAddress: string, decimals: number): void;
};

const SelectTokenPopup: FC<Props> = ({ isLoading = false, tokens, onClose, onSelect }) => {
  const { t } = useTranslation();

  const ref = useRef<HTMLDivElement | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const { searchedData } = useSearchToken({ query: searchQuery, tokens });

  const filteredSearchedData = useMemo(() => {
    if (!tokens || !searchedData) return;
    const pinnedTokenAddresses = new Set(tokens.slice(0, 7).map((token) => token.address));
    return searchedData.filter((token) => !pinnedTokenAddresses.has(token.address));
  }, [searchedData, tokens]);

  useClickOutside(ref, (ev) => {
    if (!ref.current) return;
    if (ev.target instanceof Node && !ref.current.contains(ev.target)) {
      onClose();
    }
  });

  const getTokenIcon = (token: Token | TokenData) => {
    const item = TOKEN_MAP[token.address];
    if (!item) return UnknownIcon;
    return item.logo;
  };

  return (
    <div className={s.wrapper}>
      <div className={s.container} ref={ref}>
        <div className={s.header}>
          <div className={s.titleContainer}>
            <h2 className={s.title}>{t('token.select')}</h2>
            <InputCross onClick={onClose} className={s.cross} />
          </div>
          <Search
            type="text"
            value={searchQuery}
            placeholder={t('Search asset or paste address')}
            onChange={({ currentTarget }) => setSearchQuery(currentTarget.value)}
            id="token search"
          />
          {tokens?.length === 0 && (
            <Skeleton loading={isLoading}>
              <p>{`You don't have tokens`}</p>
            </Skeleton>
          )}
          <Skeleton loading={isLoading}>
            <div className={s.pinnedTokens}>
              {tokens
                ?.slice(0, 7)
                .map((token, idx) => (
                  <TokenItem
                    onClick={() => onSelect(token.address, token.decimals)}
                    key={idx}
                    title={token.symbol}
                    IconComponent={getTokenIcon(token)}
                  />
                ))}
            </div>
          </Skeleton>
        </div>
        {tokens && tokens?.length > 7 && (
          <Skeleton loading={isLoading}>
            <div className={s.body}>
              {filteredSearchedData?.map((el) => (
                <button key={el.address} onClick={() => onSelect(el.address, el.decimals)}>
                  <div className={s.item}>
                    {'logo' in el ? <el.logo width={20} height={20} /> : <UnknownIcon />}
                    <p className={s.label}>{el.symbol}</p>
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
