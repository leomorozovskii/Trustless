import React, { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { InputCross } from '@assets/icons';
import { Search } from '@components/Search';
import { useSearchToken } from '@components/SelectTokenPopup/hooks/useSearchToken';
import TokenItem from '@components/SelectTokenPopup/components/TokenItem/TokenItem';
import { TOKEN_MAP } from '@lib/constants';

import s from './SelectTokenPopup.module.scss';

interface ISelectTokenPopup {
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  handle(token: string): void;
}

const SelectTokenPopup: React.FC<ISelectTokenPopup> = ({
  setOpened,
  handle,
}) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { searchedData } = useSearchToken({ query: searchQuery });

  const pinnedTokens = Object.values(TOKEN_MAP).slice(0, 7);
  const pinnedTokenNames = new Set(pinnedTokens.map((token) => token.name));

  const filteredSearchedData = useMemo(() => {
    if (!searchedData) return;
    return searchedData.filter((token) => !pinnedTokenNames.has(token.name));
  }, [searchedData]);

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
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
            {Object.values(TOKEN_MAP)
              .slice(0, 7)
              .map((el, idx) => (
                <TokenItem
                  onClick={() => handle(el.name)}
                  key={idx}
                  title={el.name}
                  IconComponent={el.logo}
                />
              ))}
          </div>
        </div>
        <div className={s.body}>
          {filteredSearchedData?.map((el) => (
            <button key={el.name} onClick={() => handle(el.name)}>
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
