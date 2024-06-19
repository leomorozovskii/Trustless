import { useEffect, useState } from 'react';

import { TOKEN_MAP } from '@berezka-dao/core/constants';
import type { TokenData } from '@berezka-dao/core/types';
import type { IToken } from '@berezka-dao/features/createOffer/components/SelectTokenPopup/types';
import { useOfferCreateContext } from '@berezka-dao/features/createOffer/store';

interface ISearchProps {
  query: string;
  type: 'from' | 'to' | 'default';
}

export const useSearchToken = ({ query, type }: ISearchProps) => {
  const [searchedData, setSearchedData] = useState<TokenData[] | IToken[]>([]);
  const { userTokens } = useOfferCreateContext();

  useEffect(() => {
    const handleSearchFrom = () => {
      if (!userTokens.tokens) return;
      if (!query) setSearchedData(userTokens.tokens);
      const lowerCaseQuery = query.toLowerCase();
      const result = userTokens.tokens.filter(
        (token) =>
          token.address.toLowerCase() === lowerCaseQuery ||
          token.name.toLowerCase().includes(lowerCaseQuery) ||
          token.symbol.toLowerCase().includes(lowerCaseQuery),
      );
      setSearchedData(result);
    };

    const handleSearchTo = () => {
      if (!query) setSearchedData(Object.values(TOKEN_MAP));
      const lowerCaseQuery = query.toLowerCase();
      const result = Object.entries(TOKEN_MAP)
        .filter(
          ([address, tokenData]) =>
            address.toLowerCase() === lowerCaseQuery || tokenData.name.toLowerCase().includes(lowerCaseQuery),
        )
        .map(([, tokenData]) => tokenData);
      setSearchedData(result);
    };

    if (type !== 'from') {
      handleSearchTo();
    } else {
      handleSearchFrom();
    }
  }, [query, type, userTokens.tokens]);

  return { searchedData };
};
