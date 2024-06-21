import type { FC, PropsWithChildren } from 'react';

import { Header } from './components/Header';

const HeaderLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export { HeaderLayout };
