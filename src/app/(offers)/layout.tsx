'use client';

import { usePathname } from 'next/navigation';
import type { FC, PropsWithChildren } from 'react';

import { HeaderLayout } from '@berezka-dao/layouts/HeaderLayout';
import { TabsLayout } from '@berezka-dao/layouts/TabsLayout';

const pagesWithGrayBg = ['/offer/cancel', '/offer/create', '/share', '/offers'];

const OffersLayout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const getBg = () => {
    return pagesWithGrayBg.some((page) => pathname.includes(page)) ? 'gray' : 'default';
  };
  return (
    <TabsLayout>
      <HeaderLayout bg={getBg()}>{children}</HeaderLayout>
    </TabsLayout>
  );
};

export default OffersLayout;
