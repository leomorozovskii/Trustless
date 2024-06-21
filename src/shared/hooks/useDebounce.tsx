import { useRef } from 'react';

export const useDebounce = <TCallback extends { (...args: TArgs): void }, TArgs extends unknown[]>(
  callback: TCallback,
  delay: number,
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: TArgs) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
