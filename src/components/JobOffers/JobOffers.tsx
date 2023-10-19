import { Suspense } from 'react';

import JobOffer from '@/components/JobOffer';
import { getJobOffers } from '@/services/jobOffersService';

import s from './JobOffers.module.scss';

export default async function JobOffers() {
  const data = await getJobOffers();

  return (
    <div className={s.offers}>
      {data.map((offer: any) => (
        <JobOffer offer={offer} key={offer.id} />
      ))}
    </div>
  );
}
