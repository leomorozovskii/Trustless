import { useEffect, useState } from 'react';

import { IToken } from '@components/SelectTokenPopup/types/useGetUserTokens.types';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { TOKEN_MAP, TokenData } from '@lib/constants';

interface ISearchProps {
  query: string;
  type: 'from' | 'to' | 'default';
}

export const useSearchToken = ({ query, type }: ISearchProps) => {
  const [searchedData, setSearchedData] = useState<TokenData[] | IToken[]>([]);
  const { userTokens: tokens } = useOfferCreateContext();

  const handleSearchFrom = () => {
    if (!query) setSearchedData(tokens);
    const lowerCaseQuery = query.toLowerCase();
    const result = tokens.filter(
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

  useEffect(() => {
    if (type !== 'from') {
      handleSearchTo();
    } else {
      handleSearchFrom();
    }
  }, [query, tokens, type]);

  return { searchedData };
};
