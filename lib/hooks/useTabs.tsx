import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { OfferState } from '@lib/constants';

interface TabItem {
  query: OfferState;
  label: OfferState;
}

export const useOffersTabs = (tabs: TabItem[]) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<OfferState>(OfferState.All);
  const [status, setStatus] = useState<OfferState>(OfferState.All);

  const handleTabClick = (query: OfferState) => {
    setActiveTab(query);
    setStatus(query);

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
