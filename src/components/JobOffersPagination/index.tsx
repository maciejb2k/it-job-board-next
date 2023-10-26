'use client';

import { Pagination } from '@mantine/core';

import { useJobOffers } from '@/providers/JobOffersContext';

import s from './styles.module.scss';

export default function JobOffersPagination({ pages, currentPage }: { pages: number; currentPage: number }) {
  const { setPage } = useJobOffers();

  return (
    <div className={s.pagination}>
      <Pagination total={pages} value={currentPage} onChange={setPage} withEdges />
    </div>
  );
}
