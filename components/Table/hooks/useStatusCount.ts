import { useMemo } from 'react';

interface StatusCountProps {
  data: any[];
}

interface UseStatusCountsResult {
  statusCounts: Record<string, number>;
}

export const useStatusCount = ({
  data,
}: StatusCountProps): UseStatusCountsResult => {
  const statusCounts = useMemo(() => {
    return data.reduce((acc: Record<string, number>, item) => {
      const { status } = item;
      const toLowerCaseStatus = status.toLowerCase();
      if (acc[toLowerCaseStatus]) {
        acc[toLowerCaseStatus] += 1;
      } else {
        acc[toLowerCaseStatus] = 1;
      }
      return acc;
    }, {});
  }, [data]);

  return { statusCounts };
};
