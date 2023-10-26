import Hero from '@/components/Hero';
import Filters from '@/components/Filters';
import JobOffersPagination from '@/components/JobOffersPagination';

import JobOffersHeader from '@/components/JobOffersHeader';

import { allowedGetJobOffersParams, getJobOffers } from '@/services/jobOffersService';

import s from './styles.module.scss';
import { getQueryParams, filtereParams } from '@/utils/queryParams';
import JobOffers from '@/components/JobOffers';
import { JobOffersProvider } from '@/providers/JobOffersContext';
import { headers } from 'next/headers';

export default async function Page() {
  const headersList = headers();
  const url = headersList.get('x-url');

  if (!url) throw new Error('The x-url header is not present in the request.');

  const queryParams = getQueryParams(url);
  const { data, pages, currentPage } = await getJobOffers(queryParams);

  return (
    <JobOffersProvider>
      <div className={`container-lg ${s.pageContent}`}>
        <Hero></Hero>
        <main className={`${s.main}`}>
          <Filters></Filters>
          <div className={s.offers}>
            <JobOffersHeader />
            <JobOffers data={data} />
            <JobOffersPagination pages={pages} currentPage={currentPage} />
          </div>
        </main>
      </div>
    </JobOffersProvider>
  );
}
