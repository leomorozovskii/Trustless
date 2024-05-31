import { useCallback, useState } from 'react';

import { IOffer } from '@context/offers/offers-context.interfaces';

export const useOfferSelect = () => {
  const [selectedOffer, setSelectedOffer] = useState<IOffer | null>(null);

  const toggleOfferSelection = useCallback((offer: IOffer) => {
    console.log('toggleOfferSelection', offer);
    setSelectedOffer((prevSelectedOffer) => (prevSelectedOffer === offer ? null : offer));
  }, []);

  return {
    selectedOffer,
    toggleOfferSelection,
  };
};
