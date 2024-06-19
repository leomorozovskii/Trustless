'use client';

import React from 'react';

import { ButtonLink } from '@components/Button';
import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';

import s from './not-found.module.scss';

const Page404 = () => {
  return (
    <Sidebar>
      <Header />
      <div className={s.container}>
        <h1 className={s.title}>404</h1>
        <p className={s.text}>Seems like nothing found here. Check the link’s address of start from the beginning</p>
        <ButtonLink href="/" className={s.btn}>
          Go to Offers
        </ButtonLink>
      </div>
    </Sidebar>
  );
};

export default Page404;
