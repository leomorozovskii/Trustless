import { useOffersDetailsQuery } from './useOffersDetailsQuery';
import { OfferFilter } from '../types';

const useFilteredWithBadges = (filters: OfferFilter[]) => {
  const offersDetails = useOffersDetailsQuery({
    filter: 'all',
    searchFilter: '',
    filters,
    offset: 0,
    limit: Infinity,
    sorting: null,
  });

  const badgesMap: undefined | Partial<Record<OfferFilter, number>> = offersDetails.data && {
    open: offersDetails.data.offers.filter((offer) => offer.status === 'open').length,
    accepted: offersDetails.data.offers.filter((offer) => offer.status === 'accepted').length,
    cancelled: offersDetails.data.offers.filter((offer) => offer.status === 'cancelled').length,
  };

  return {
    ...offersDetails,
    data: filters.map((filter) => ({
      badge: badgesMap?.[filter]?.toString(),
      value: filter,
    })),
  };
};

export { useFilteredWithBadges };
