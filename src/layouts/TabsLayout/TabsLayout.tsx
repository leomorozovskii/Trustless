import type { ComponentProps, FC, PropsWithChildren } from 'react';

import { Sidebar } from './components/Sidebar';

type TabsLayoutProps = PropsWithChildren<ComponentProps<typeof Sidebar>>;

const TabsLayout: FC<TabsLayoutProps> = ({ children }) => {
  return <Sidebar>{children}</Sidebar>;
};

export { TabsLayout };
