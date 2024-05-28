import { IOffer } from '@src/context/offers/types';
import { useCallback, useState } from 'react';

export const useOfferSelect = () => {
  const [selectedOffer, setSelectedOffer] = useState<IOffer | null>(null);

  const toggleOfferSelection = useCallback((offer: IOffer) => {
    console.log('toggleOfferSelection', offer);
    setSelectedOffer((prevSelectedOffer) =>
      prevSelectedOffer === offer ? null : offer,
    );
  }, []);

  return {
    selectedOffer,
    toggleOfferSelection,
  };
};
