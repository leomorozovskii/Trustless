import { useEffect, useState } from 'react';

import { TOKEN_MAP, TokenData } from '@lib/constants';

interface ISearchProps {
  query: string;
}

export const useSearchToken = ({ query }: ISearchProps) => {
  const [searchedData, setSearchedData] = useState<TokenData[]>(
    Object.values(TOKEN_MAP),
  );

  useEffect(() => {
    if (!query) setSearchedData(Object.values(TOKEN_MAP));
    const lowerCaseQuery = query.toLowerCase();
    const result = Object.entries(TOKEN_MAP)
      .filter(
        ([address, tokenData]) =>
          address.toLowerCase() === lowerCaseQuery ||
          tokenData.name.toLowerCase().includes(lowerCaseQuery),
      )
      .map(([, tokenData]) => tokenData);
    setSearchedData(result);
  }, [query]);

  return { searchedData };
};
