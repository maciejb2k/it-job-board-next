import JobOffer from '@/components/JobOffer';
import JobOffersGrid from '@/components/JobOffersGrid';

export default async function JobOffers({ data }: { data: any }) {
  return (
    <JobOffersGrid>
      {data.map((offer: any) => (
        <JobOffer offer={offer} key={offer.id} />
      ))}
    </JobOffersGrid>
  );
}
