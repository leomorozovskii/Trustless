import { useMemo } from 'react';

interface StatusCountProps<T> {
  data: T[];
  keyExtractor: (item: T) => string;
}

interface UseStatusCountsResult<K extends string | number | symbol> {
  statusCounts: Record<K, number>;
}

export const useStatusCount = <T, K extends string | number | symbol>({
  data,
  keyExtractor,
}: StatusCountProps<T>): UseStatusCountsResult<K> => {
  const statusCounts = useMemo(() => {
    return data.reduce(
      (acc: Record<K, number>, item) => {
        const key = keyExtractor(item).toLowerCase() as K;
        if (acc[key]) {
          acc[key] += 1;
        } else {
          acc[key] = 1;
        }
        return acc;
      },
      {} as Record<K, number>,
    );
  }, [data, keyExtractor]);

  return { statusCounts };
};
