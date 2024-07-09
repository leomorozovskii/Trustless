import { useEffect, useState } from 'react';

import type { TokenData } from '@berezka-dao/core/types';

import type { Token } from '../../../types';

type Props = {
  query: string;
  tokens: Token[] | TokenData[] | undefined;
};

export const useSearchToken = ({ query, tokens }: Props) => {
  const [searchedData, setSearchedData] = useState<TokenData[] | Token[] | null>(null);

  const isTokenData = (item: Token | TokenData): item is TokenData => {
    return 'logo' in item;
  };

  useEffect(() => {
    if (!tokens) return;
    if (!query) {
      setSearchedData(tokens);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    if (tokens.every(isTokenData)) {
      const result: TokenData[] = tokens.filter((token) => {
        const matchesAddress = token.address.toLowerCase() === lowerCaseQuery;
        const matchesSymbol = token.symbol.toLowerCase().includes(lowerCaseQuery);
        return matchesAddress || matchesSymbol;
      });
      setSearchedData(result);
    } else {
      const result: Token[] = tokens.filter((token) => {
        const matchesName = token.name.toLowerCase().includes(lowerCaseQuery);
        const matchesAddress = token.address.toLowerCase() === lowerCaseQuery;
        const matchesSymbol = token.symbol.toLowerCase().includes(lowerCaseQuery);
        return matchesAddress || matchesSymbol || matchesName;
      });
      setSearchedData(result);
    }
  }, [query, tokens]);

  return { searchedData };
};
