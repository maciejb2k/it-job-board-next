'use client';

import { useRef } from 'react';
import { createJobOffersStore, JobOffersContext } from '@/store/jobOffersStore';

export default function JobOffersProvider({ children }: { children: React.ReactNode }) {
  const store = useRef(createJobOffersStore()).current;

  return <JobOffersContext.Provider value={store}>{children}</JobOffersContext.Provider>;
}
