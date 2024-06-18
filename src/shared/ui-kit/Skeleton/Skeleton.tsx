import type { SkeletonProps } from '@radix-ui/themes';
import { Skeleton as RadixSkeleton } from '@radix-ui/themes';
import React from 'react';

export const Skeleton: React.FC<SkeletonProps> = (props) => {
  return <RadixSkeleton {...props} />;
};
