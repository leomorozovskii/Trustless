import cn from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import { Header } from './components/Header';
import s from './HeaderLayout.module.scss';

type HeaderLayoutProps = {
  bg?: 'default' | 'gray';
};

const HeaderLayout: FC<PropsWithChildren<HeaderLayoutProps>> = ({ bg = 'default', children }) => {
  return (
    <div
      className={cn(s.container, {
        [s.container_bg_default]: bg === 'default',
        [s.container_bg_gray]: bg === 'gray',
      })}
    >
      <Header />
      {children}
    </div>
  );
};

export { HeaderLayout };
