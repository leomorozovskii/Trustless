import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface TabItem {
  query: string;
  label: string;
}

export const useTabs = (tabs: TabItem[]) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleTabClick = (query: string) => {
    setActiveTab(query);

    if (!query) {
      router.push(pathname);
      return;
    }

    router.push(`${pathname}?query=${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    if (tabs.length > 0) {
      setActiveTab(tabs[0].query);
    }
  }, [tabs]);

  return {
    activeTab,
    handleTabClick,
  };
};
