import { OfferState } from '@lib/constants';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface TabItem {
  query: string;
  label: string;
}

export const useOffersTabs = (tabs: TabItem[]) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [status, setStatus] = useState<OfferState>(OfferState.All);

  console.log(status, activeTab);

  const handleTabClick = (query: string) => {
    setActiveTab(query);
    setStatus(query as OfferState);

    if (!query) {
      router.push(pathname);
      return;
    }

    router.push(`${pathname}?status=${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    if (tabs.length > 0) {
      setActiveTab(tabs[0].query);
    }
  }, [tabs]);

  return {
    activeTab,
    handleTabClick,
    status,
  };
};
