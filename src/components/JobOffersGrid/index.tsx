'use client';

import { useJobOffers } from '@/providers/JobOffersContext';

import s from './styles.module.scss';

export default function JobOffersGrid({ children }: { children: React.ReactNode }) {
  const { viewType } = useJobOffers();

  return <div className={viewType === 'grid' ? s.offersGrid : s.offersList}>{children}</div>;
}
