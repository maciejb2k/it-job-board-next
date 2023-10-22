import JobOffer from '@/components/JobOffer';
import { getJobOffers } from '@/services/jobOffersService';
import { SearchParams } from '@/types';

import Pagy from './Pagy/Pagy';
import Header from './Header';

import s from './JobOffers.module.scss';

export default async function JobOffers({ searchParams }: { searchParams: SearchParams }) {
  const page = Number(searchParams.page) || 1;
  const items = Number(searchParams.items) || 10;

  const { data, pages, currentPage } = await getJobOffers({ page, items });

  return (
    <div className={s.offers}>
      <Header />
      <div className={s.offersGrid}>
        {data.map((offer: any) => (
          <JobOffer offer={offer} key={offer.id} />
        ))}
      </div>
      <Pagy pages={pages} currentPage={currentPage} />
    </div>
  );
}
