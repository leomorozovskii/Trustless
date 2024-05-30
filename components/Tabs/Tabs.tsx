import React, { memo } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';

import { Tab } from '@components/Tabs/components/Tab';

import s from './Tabs.module.scss';

interface TabItem {
  label: string;
  query: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  tabBages: Record<string, number>;
  handleTabClick: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs = [], activeTab, tabBages, handleTabClick }) => {
  return (
    <RadixTabs.Root className={s.container} value={activeTab}>
      <RadixTabs.List className={s.tabList}>
        {tabs.map((tab) => (
          <RadixTabs.Trigger key={tab.query} value={tab.query} asChild>
            <Tab
              active={activeTab === tab.query}
              onClick={() => handleTabClick(tab.query)}
              tabBage={tabBages[tab.query]}
            >
              {tab.label}
            </Tab>
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
    </RadixTabs.Root>
  );
};

export default memo(Tabs);
