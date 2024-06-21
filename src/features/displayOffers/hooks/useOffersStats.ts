import { useOffersDetails } from './useOffersDetails';
import type { OfferFilter } from '../types';

type UseOffersStatsParams = {
  searchFilter: string;
  filters: OfferFilter[];
};

const useOffersStats = ({ searchFilter, filters }: UseOffersStatsParams) => {
  const offers = useOffersDetails({
    searchFilter,
    filters,
  });
  return {
    ...offers,
    data: offers.data?.reduce(
      (acc, offer) => {
        switch (offer.status) {
          case 'accepted':
            acc.accepted += 1;
            break;
          case 'cancelled':
            acc.cancelled += 1;
            break;
          case 'pending':
            acc.pending += 1;
            break;
          case 'acceptedByMe':
            acc.acceptedByMe += 1;
            break;
          case 'forMe':
            acc.forMe += 1;
            break;
          default:
            break;
        }
        acc.total += 1;
        return acc;
      },
      {
        accepted: 0,
        cancelled: 0,
        pending: 0,
        total: 0,
        acceptedByMe: 0,
        forMe: 0,
      },
    ),
  };
};

export { useOffersStats };
