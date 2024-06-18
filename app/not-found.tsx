'use client';

import { HeaderLayout } from '../src/layouts/HeaderLayout';
import { TabsLayout } from '../src/layouts/TabsLayout';
import { NotFoundMessage } from '../src/shared/components/NotFoundMessage/NotFoundMessage';

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
