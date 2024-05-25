import React from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import s from './Tabs.module.scss';
import { Tab } from '@components/Tabs/components/Tab';
import { useTabs } from '@lib/hooks/useTabs';

interface TabItem {
  label: string;
  query: string;
}

interface TabsProps {
  tabs: TabItem[];
}

const Tabs: React.FC<TabsProps> = ({ tabs = [] }) => {
  const { activeTab, handleTabClick } = useTabs(tabs);

  return (
    <RadixTabs.Root className={s.container} value={activeTab}>
      <RadixTabs.List className={s.tabList}>
        {tabs.map((tab) => (
          <RadixTabs.Trigger key={tab.query} value={tab.query} asChild>
            <Tab
              active={activeTab === tab.query}
              onClick={() => handleTabClick(tab.query)}
            >
              {tab.label}
            </Tab>
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
    </RadixTabs.Root>
  );
};

export default Tabs;
