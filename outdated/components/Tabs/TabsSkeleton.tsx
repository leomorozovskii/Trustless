import { Skeleton } from '@radix-ui/themes';
import { FC } from 'react';

import s from './TabsSkeleton.module.scss';

type TabsSkeletonProps = {
  count: number;
};

const TabsSkeleton: FC<TabsSkeletonProps> = ({ count }) => {
  return (
    <div className={s.container}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} height="32px" width="40px" />
      ))}
    </div>
  );
};

export { TabsSkeleton };
