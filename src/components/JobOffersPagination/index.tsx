'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Pagination } from '@mantine/core';

import s from './styles.module.scss';

export default function JobOffersPagination({ pages, currentPage }: { pages: number; currentPage: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setPage = (page: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    current.set('page', page.toString());

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  };

  return (
    <div className={s.pagination}>
      <Pagination total={pages} value={currentPage} onChange={setPage} withEdges />
    </div>
  );
}
