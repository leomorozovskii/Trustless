'use client';

import { HeaderLayout } from '@berezka-dao/layouts/HeaderLayout';
import { TabsLayout } from '@berezka-dao/layouts/TabsLayout';
import { NotFoundMessage } from '@berezka-dao/shared/components/NotFoundMessage';

const Page404 = () => {
  return (
    <TabsLayout>
      <HeaderLayout>
        <NotFoundMessage />
      </HeaderLayout>
    </TabsLayout>
  );
};

export default Page404;
