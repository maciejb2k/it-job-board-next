import { SearchParams } from '@/types';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Filters from '@/components/Filters';
import JobOffers from '@/components/JobOffers';

import s from './styles.module.scss';

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <div className={`container-lg ${s.pageContent}`}>
        <Hero></Hero>
        <main className={`${s.main}`}>
          <Filters></Filters>
          <JobOffers searchParams={searchParams}></JobOffers>
        </main>
      </div>
    </>
  );
}
