import * as RadixTabs from '@radix-ui/react-tabs';
import { TabItem } from './components/TabItem';

import s from './Tabs.module.scss';

interface Option<T extends string> {
  value: T;
  label: string;
  badge?: string;
}

interface TabsProps<T extends string> {
  options: Option<T>[];
  value: T;
  onValueChange: (tab: T) => void;
}

const Tabs = <T extends string>({ options, value, onValueChange }: TabsProps<T>) => {
  const handleValueChange = (nextValue: string) => {
    onValueChange(nextValue as T);
  };
  return (
    <RadixTabs.Root className={s.container} value={value} onValueChange={handleValueChange}>
      <RadixTabs.List className={s.tabList}>
        {options.map((tab) => (
          <TabItem key={tab.value} value={tab.value} badge={tab.badge}>
            {tab.label}
          </TabItem>
        ))}
      </RadixTabs.List>
    </RadixTabs.Root>
  );
};

export { Tabs };
