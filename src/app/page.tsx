import React, { Suspense } from 'react';
import { headers } from 'next/headers';
import { Loader } from '@mantine/core';

import Hero from '@/components/Hero';
import Filters from '@/components/Filters';
import JobOffersPagination from '@/components/JobOffersPagination';
import JobOffersHeader from '@/components/JobOffersHeader';
import JobOffers from '@/components/JobOffers';

import { getJobOffers } from '@/services/jobOffersService';

import s from './styles.module.scss';
import { JobOffersProvider } from '@/providers/JobOffersContext';
import { getQueryParams } from '@/utils/queryParams';

export default async function Page({ searchParams }: { searchParams: any }) {
  const params = new URLSearchParams(searchParams);

  return (
    <JobOffersProvider>
      <div className={`container-lg ${s.pageContent}`}>
        <Hero></Hero>
        <main className={`${s.main}`}>
          <Suspense>
            <Filters />
          </Suspense>
          <div className={s.offers}>
            <JobOffersHeader />
            <Suspense key={params.toString()} fallback={<LoadingSkeleton />}>
              <JobOffersContent />
            </Suspense>
          </div>
        </main>
      </div>
    </JobOffersProvider>
  );
}

const JobOffersContent = async () => {
  const headersList = headers();
  const url = headersList.get('x-url');

  if (!url) throw new Error('The x-url header is not present in the request.');

  const queryParams = getQueryParams(url);
  const { data, pages, currentPage } = await getJobOffers(queryParams);

  return (
    <>
      <JobOffers data={data} />
      <JobOffersPagination pages={pages} currentPage={currentPage} />
    </>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className={s.offersLoader}>
      <Loader />
    </div>
  );
};
