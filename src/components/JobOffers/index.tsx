import JobOffer from '@/components/JobOffer';

import s from './styles.module.scss';

export default async function JobOffers({ data }: { data: any }) {
  return (
    <div className={s.offersGrid}>
      {data.map((offer: any) => (
        <JobOffer offer={offer} key={offer.id} />
      ))}
    </div>
  );
}
