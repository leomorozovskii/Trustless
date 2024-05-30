import { useState, useEffect } from 'react';

import { OfferState } from '@lib/constants';

interface OffersTableDataProps {
  data: any[];
  filterStatus: OfferState;
}

export const useOffersTableData = ({ data, filterStatus = OfferState.All }: OffersTableDataProps) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (filterStatus === OfferState.All) {
      setFilteredData(data);
    } else {
      const newData = data.filter((item) => item.status.toLowerCase() === filterStatus.toLowerCase());
      setFilteredData(newData);
    }
  }, [data, filterStatus]);

  return filteredData;
};
