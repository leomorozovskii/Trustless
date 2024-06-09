import { OfferFilter, OfferTrade } from '../types';
import { useOffersDetailsQuery } from './useOffersDetailsQuery';

type UseOffersStatsQueryParams = {
  searchFilter: string;
  filters: OfferFilter[];
};

const useOffersStatsQuery = ({ searchFilter, filters }: UseOffersStatsQueryParams) => {
  const offers = useOffersDetailsQuery({
    searchFilter,
    filters,
  });
  return {
    ...offers,
    data: offers.data
      ?.reduce((acc, group) => [...acc, ...group.data], [] as OfferTrade[])
      .reduce(
        (acc, offer) => {
          switch (offer.status) {
            case 'open':
              acc.open += 1;
              break;
            case 'accepted':
              acc.accepted += 1;
              if (offer.recentlyAccepted) {
                acc['recently-accepted'] += 1;
              }
              break;
            case 'cancelled':
              acc.cancelled += 1;
              break;
            case 'pending':
              acc.pending += 1;
              break;
            default:
              break;
          }
          acc.total += 1;
          return acc;
        },
        {
          open: 0,
          accepted: 0,
          cancelled: 0,
          pending: 0,
          'recently-accepted': 0,
          total: 0,
        },
      ),
  };
};

export { useOffersStatsQuery };
