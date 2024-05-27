import { useEffect, useState } from 'react';

interface SearchFilterProps {
  data: any[];
  query: string;
}

interface UseOffersSearchFilterResult {
  filteredData: any[];
}

export const useOffersSearchFilter = ({
  data,
  query,
}: SearchFilterProps): UseOffersSearchFilterResult => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const lowercasedQuery = query.toLowerCase();
    if (!query) {
      setFilteredData(data);
    } else {
      const result = data.filter((item) => {
        const idMatch = String(item.id).toLowerCase().includes(lowercasedQuery);
        const toAssetMatch = String(item.toAsset)
          .toLowerCase()
          .includes(lowercasedQuery);
        const fromAssetMatch = String(item.fromAsset)
          .toLowerCase()
          .includes(lowercasedQuery);
        const addressMatch = String(item.address)
          .toLowerCase()
          .includes(lowercasedQuery);
        const toAssetNameMatch = String(item.toAssetName)
          .toLowerCase()
          .includes(lowercasedQuery);
        const fromAssetNameMatch = String(item.fromAssetName)
          .toLowerCase()
          .includes(lowercasedQuery);

        return (
          idMatch ||
          toAssetMatch ||
          fromAssetMatch ||
          addressMatch ||
          toAssetNameMatch ||
          fromAssetNameMatch
        );
      });
      setFilteredData(result);
    }
  }, [data, query]);

  return { filteredData };
};
