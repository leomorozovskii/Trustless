import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { subgraphClient } from '@berezka-dao/core/configs';

import { OFFERS_QUERY } from './query';
import type { OffersQuery, OffersQueryVariables } from './types';

const useOffersQueryKey = 'offersDetails';

const useOffersQuery = <TData = OffersQuery>({
  select,
  variables,
}: {
  select?: (data: OffersQuery) => TData;
  variables: OffersQueryVariables;
}) => {
  return useQuery({
    placeholderData: keepPreviousData,
    queryKey: [useOffersQueryKey, variables],
    refetchInterval: 1000 * 30,
    queryFn: async () => {
      const { filters, first, skip } = variables;
      const offers = await subgraphClient.request<OffersQuery>(OFFERS_QUERY, {
        filters: {
          filters,
          first,
          skip,
        },
      });
      return offers;
    },
    select,
  });
};

export type { OffersQuery };
export { useOffersQuery, useOffersQueryKey };
