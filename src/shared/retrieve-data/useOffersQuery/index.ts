import { keepPreviousData } from '@tanstack/react-query';
import { createQuery } from 'react-query-kit';

import { subgraphClient } from '@berezka-dao/core/configs';

import { OFFERS_QUERY } from './query';
import type { OffersQuery, OffersQueryVariables } from './types';

const useOffersQueryKey = 'offersDetails';

const useOffersQuery = createQuery({
  placeholderData: keepPreviousData,
  queryKey: [useOffersQueryKey],
  fetcher: async (variables: OffersQueryVariables = {}) => {
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
});

export type { OffersQuery };
export { useOffersQuery, useOffersQueryKey };
