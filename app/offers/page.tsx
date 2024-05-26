'use client';
import React from 'react';
import { Tabs } from '@components/Tabs';
import s from '@styles/pages/Offers.module.scss';
import { Table } from '@components/Table';
import { OfferStatus } from '@lib/constants';

// TODO Change to react-i18next
const tabs = [
  { label: OfferStatus.All, query: OfferStatus.All },
  { label: OfferStatus.Open, query: OfferStatus.Open },
  { label: OfferStatus.Pending, query: OfferStatus.Pending },
  { label: OfferStatus.Accepted, query: OfferStatus.Accepted },
  { label: OfferStatus.Cancelled, query: OfferStatus.Cancelled },
];

const OffersPage: React.FC = () => {
  return (
    <div className={s.container}>
      {/* TODO make component for text */}
      <h1 className={s.title}>My offers</h1>
      <Tabs tabs={tabs} />
      <div className={s.tableContainer}>
        <Table />
      </div>
    </div>
  );
};

export default OffersPage;
