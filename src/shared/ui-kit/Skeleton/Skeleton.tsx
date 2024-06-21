import type { SkeletonProps } from '@radix-ui/themes';
import { Skeleton as RadixSkeleton } from '@radix-ui/themes';
import type { FC } from 'react';

export const Skeleton: FC<SkeletonProps> = (props) => {
  return <RadixSkeleton {...props} />;
};
