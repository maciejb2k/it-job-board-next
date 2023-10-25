'use client';

import { useContext, createContext, useReducer } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface JobOffersProps {
  page: number;
  sort: string;
  filters: {
    technologies: string[];
    categories: string[];
  };
  employmentType: string;
}

interface JobOffersContextType extends JobOffersProps {
  updateUrl: () => void;
  setPage: (page: number) => void;
  setSort: (sort: string) => void;
  setTechnologies: (technologies: string[]) => void;
  setEmploymentType: (type: string) => void;
}

const initialState: JobOffersProps = {
  page: 1,
  sort: '',
  filters: {
    technologies: [],
    categories: [],
  },
  employmentType: 'b2b',
};

const JobOffersContext = createContext<JobOffersContextType | undefined>(undefined);

const jobOffersReducer = (state: JobOffersProps, action: any) => {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_SORT':
      return { ...state, sort: action.payload };
    case 'SET_TECHNOLOGIES':
      return { ...state, filters: { ...state.filters, technologies: action.payload } };
    case 'SET_EMPLOYMENT_TYPE':
      return { ...state, employmentType: action.payload };
    default:
      return state;
  }
};

const JobOffersProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [state, dispatch] = useReducer(jobOffersReducer, initialState);

  const updateUrl = () => {
    const { page, sort, filters, employmentType } = state;

    const params = new URLSearchParams({});

    router.push(`${pathname}?${params.toString()}`);
  };

  const setPage = (page: number) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  };

  const setSort = (sort: string) => {
    dispatch({ type: 'SET_SORT', payload: sort });
  };

  const setTechnologies = (technologies: string[]) => {
    dispatch({ type: 'SET_TECHNOLOGIES', payload: technologies });
  };

  const setEmploymentType = (type: string) => {
    dispatch({ type: 'SET_EMPLOYMENT_TYPE', payload: type });
  };

  const value: JobOffersContextType = {
    ...state,
    updateUrl,
    setPage,
    setSort,
    setTechnologies,
    setEmploymentType,
  };

  return <JobOffersContext.Provider value={value}>{children}</JobOffersContext.Provider>;
};

const useJobOffers = () => {
  const context = useContext(JobOffersContext);

  if (context === undefined) {
    throw new Error('useJobOffers must be used within a JobOffersProvider');
  }

  return context;
};

export { JobOffersProvider, useJobOffers };
