'use client';
import React from 'react';
import Tabs from '@components/Tabs/Tabs';
import s from '@styles/pages/Offers.module.scss';

const tabs = [
  { label: 'All', query: '' },
  { label: 'Open', query: 'open' },
  { label: 'Pending', query: 'pending' },
  { label: 'Accepted', query: 'accepted' },
  { label: 'Cancelled', query: 'cancelled' },
];

const OffersPage: React.FC = () => {
  return (
    <div className={s.container}>
      {/* TODO make component for text */}
      <h1 className={s.title}>My offers</h1>
      <Tabs tabs={tabs} />
      <div className={s.tableContainer}></div>
    </div>
  );
};

export default OffersPage;
