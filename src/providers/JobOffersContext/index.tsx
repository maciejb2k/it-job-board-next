'use client';

import { useContext, createContext, useReducer, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';

interface JobOffersProps {
  page: number;
  sort: string;
  filters: {
    technologies: string[];
    categories: string[];
  };
  employmentType: 'b2b' | 'uop';
  viewType: 'list' | 'grid';
}

interface JobOffersContextType extends JobOffersProps {
  updateUrl: () => void;
  setPage: (page: number) => void;
  setSort: (sort: string) => void;
  setTechnologies: (technologies: string[]) => void;
  setEmploymentType: (type: string) => void;
  setViewType: (type: string) => void;
  hasFilters: () => boolean;
  clearFilters: () => void;
}

// Context & Provider

const JobOffersContext = createContext<JobOffersContextType | undefined>(undefined);

const JobOffersProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Reducer and initial state

  const initialState: JobOffersProps = {
    page: Number(searchParams.get('page')) || 1,
    sort: searchParams.get('sort') || '',
    filters: {
      technologies: searchParams.get('technologies')?.split(',') || [],
      categories: searchParams.get('categories')?.split(',') || [],
    },
    employmentType: 'b2b',
    viewType: 'grid',
  };

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
      case 'SET_VIEW_TYPE':
        return { ...state, viewType: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(jobOffersReducer, initialState);

  // Update URL query params on state change

  const updateUrl = () => {
    const queryParameters = {
      ...(searchParams.has('page') && { page: state.page }),
      sort: state.sort,
      technologies: state.filters.technologies,
      categories: state.filters.categories,
    };

    const query = queryString.stringify(queryParameters, {
      arrayFormat: 'comma',
      skipEmptyString: true,
      skipNull: true,
    });

    const newPath = query ? `${pathname}?${query}` : pathname;

    router.push(newPath, { scroll: false });
  };

  useEffect(() => {
    updateUrl();
  }, [state.page, state.sort, state.filters.technologies, state.filters.categories]);

  // Dispatch actions

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

  const setViewType = (type: string) => {
    dispatch({ type: 'SET_VIEW_TYPE', payload: type });
  };

  // Helpers

  const hasFilters = () => {
    return state.filters.technologies.length > 0 || state.filters.categories.length > 0;
  };

  const clearFilters = () => {
    dispatch({ type: 'SET_TECHNOLOGIES', payload: [] });
    dispatch({ type: 'SET_CATEGORIES', payload: [] });
  };

  // Context value

  const value: JobOffersContextType = {
    ...state,
    updateUrl,
    setPage,
    setSort,
    setTechnologies,
    setEmploymentType,
    setViewType,
    hasFilters,
    clearFilters,
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
