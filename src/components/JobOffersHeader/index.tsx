'use client';

import { IconLayoutList, IconLayoutGrid } from '@tabler/icons-react';
import { VisuallyHidden, SegmentedControl, Select } from '@mantine/core';

import { EmploymentTypes, SortTypes, useJobOffers } from '@/providers/JobOffersContext';

import s from './styles.module.scss';

type SortingOptions = Array<{
  label: string;
  value: SortTypes;
}>;

type EmploymentOptions = Array<{
  label: string;
  value: EmploymentTypes;
}>;

const sortingOptions: SortingOptions = [
  {
    label: 'Newest',
    value: 'created_at',
  },
  {
    label: 'Oldest',
    value: '-created_at',
  },
];

const employmentOptions: EmploymentOptions = [
  {
    label: 'B2B',
    value: 'b2b',
  },
  {
    label: 'UoP',
    value: 'uop',
  },
];

const viewOptions = [
  {
    value: 'grid',
    label: (
      <>
        <IconLayoutGrid size="12" />
        <VisuallyHidden>Preview</VisuallyHidden>
      </>
    ),
  },
  {
    value: 'list',
    label: (
      <>
        <IconLayoutList size="12" />
        <VisuallyHidden>Code</VisuallyHidden>
      </>
    ),
  },
];

export default function JobOffersHeader() {
  const { employmentType, viewType, sort, setViewType, setEmploymentType, setSort } = useJobOffers();

  return (
    <header className={s.header}>
      <div className={s.headerLeft}>
        <Select data={sortingOptions} placeholder="Sort by" clearable value={sort} onChange={setSort} />
      </div>
      <div className={s.headerRight}>
        <SegmentedControl value={employmentType} onChange={setEmploymentType} data={employmentOptions} />
        <SegmentedControl value={viewType} onChange={setViewType} data={viewOptions} />
      </div>
    </header>
  );
}
