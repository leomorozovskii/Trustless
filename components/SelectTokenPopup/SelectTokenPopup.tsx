import React, { memo, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { InputCross } from '@assets/icons';
import { Search } from '@components/Search';
import { useSearchToken } from '@components/SelectTokenPopup/hooks/useSearchToken';
import TokenItem from '@components/SelectTokenPopup/components/TokenItem/TokenItem';
import { TOKEN_MAP } from '@lib/constants';
import { useClickOutside } from '@lib/hooks/useClickOutside';

import s from './SelectTokenPopup.module.scss';

interface ISelectTokenPopup {
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  handle(tokenAddress: string): void;
}

const SelectTokenPopup: React.FC<ISelectTokenPopup> = ({ setOpened, handle }) => {
  const { t } = useTranslation();

  const ref = useRef<HTMLDivElement | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const { searchedData } = useSearchToken({ query: searchQuery });

  const pinnedTokens = Object.values(TOKEN_MAP).slice(0, 7);
  const pinnedTokenAddresses = new Set(pinnedTokens.map((token) => token.address));

  const filteredSearchedData = useMemo(() => {
    if (!searchedData) return;
    return searchedData.filter((token) => !pinnedTokenAddresses.has(token.address));
  }, [searchedData]);

  useClickOutside(ref, (ev) => {
    if (!ref.current?.contains(ev.target as Node)) {
      setOpened(false);
    }
  });

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
          <div className={s.popularTokens}>
            {Object.entries(TOKEN_MAP)
              .slice(0, 7)
              .map(([address, token], idx) => (
                <TokenItem onClick={() => handle(address)} key={idx} title={token.name} IconComponent={token.logo} />
              ))}
          </div>
        </div>
        <div className={s.body}>
          {filteredSearchedData?.map((el) => (
            <button key={el.address} onClick={() => handle(el.address)}>
              <div className={s.item}>
                <el.logo />
                <p className={s.label}>{el.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(SelectTokenPopup);
