import React from 'react';

import { Sidebar } from './components/Sidebar';

type TabsLayoutProps = React.PropsWithChildren<React.ComponentProps<typeof Sidebar>>;

const TabsLayout: React.FC<TabsLayoutProps> = ({ children, contentBg }) => {
  return <Sidebar contentBg={contentBg}>{children}</Sidebar>;
};

export { TabsLayout };
