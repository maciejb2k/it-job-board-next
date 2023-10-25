import { createContext } from 'react';
import { createStore } from 'zustand';

interface JobOffersProps {
  page: number;
  sort: string;
  filters: string[];
  employmentType: string;
}

interface JobOffersState extends JobOffersProps {
  setPage: (page: number) => void;
  setSort: (sort: string) => void;
  setFilters: (filters: string[]) => void;
  setEmploymentType: (type: string) => void;
}

type JobOffersStore = ReturnType<typeof createJobOffersStore>;

export const createJobOffersStore = (initProps?: Partial<JobOffersProps>) => {
  const DEFAULT_PROPS: JobOffersProps = {
    page: 1,
    sort: '',
    filters: [],
    employmentType: 'b2b',
  };

  return createStore<JobOffersState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setPage: (page: number) => set({ page }),
    setSort: (sort: string) => set({ sort }),
    setFilters: (filters: string[]) => set({ filters }),
    setEmploymentType: (employmentType: string) => set({ employmentType }),
  }));
};

export const JobOffersContext = createContext<JobOffersStore | null>(null);
