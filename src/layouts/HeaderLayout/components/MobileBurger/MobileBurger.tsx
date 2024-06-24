'use client';

import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Drawer } from 'vaul';

import { ClearCloseIcon, HamburgerIcon } from '@berezka-dao/shared/icons';

import s from './MobileBurger.module.scss';
import { MobileMenu } from '../MobileMenu';

const MobileBurger: FC = () => {
  const { t } = useTranslation();
  return (
    <Drawer.Root direction="left">
      <Drawer.Trigger className={s.trigger}>
        <HamburgerIcon />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className={s.backdrop} />
        <Drawer.Content className={s.content}>
          <Drawer.Title className={s.title}>{t('mobileMenu.title')}</Drawer.Title>
          <div className={s.contentHeader}>
            <Drawer.Trigger className={s.trigger}>
              <ClearCloseIcon />
            </Drawer.Trigger>
          </div>
          <MobileMenu />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export { MobileBurger };
