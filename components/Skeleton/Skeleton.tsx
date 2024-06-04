import { Skeleton as RadixSkeleton, SkeletonProps } from '@radix-ui/themes';
import React from 'react';

export const Skeleton: React.FC<SkeletonProps> = (props) => {
  return <RadixSkeleton {...props} />;
};
