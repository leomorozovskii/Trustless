import * as RadixTabs from '@radix-ui/react-tabs';
import type { FC, PropsWithChildren } from 'react';

import s from './TabItem.module.scss';

interface TabItemProps extends PropsWithChildren {
  value: string;
  badge?: string;
}

const TabItem: FC<TabItemProps> = ({ value, children, badge }) => {
  return (
    <RadixTabs.Trigger value={value} asChild>
      <button type="button" className={s.container}>
        <span className={s.label}>{children}</span>
        {badge && <span className={s.badge}>{badge}</span>}
      </button>
    </RadixTabs.Trigger>
  );
};

export { TabItem };
