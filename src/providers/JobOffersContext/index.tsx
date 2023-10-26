'use client';

import { useContext, createContext, useReducer, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';

interface SearchProps {
  page: number;
  sort: string;
  filters: {
    by_technology: string[];
    by_category: string[];
  };
}

interface LayoutProps {
  employmentType: 'b2b' | 'uop';
  viewType: 'list' | 'grid';
}

interface JobOffersContextType extends SearchProps, LayoutProps {
  setPage: (page: number) => void;
  setSort: (sort: string) => void;
  setTechnologies: (technologies: string[]) => void;
  setCategories: (categories: string[]) => void;
  setEmploymentType: (type: string) => void;
  setViewType: (type: string) => void;
  updateUrl: () => void;
  hasFilters: () => boolean;
  clearFilters: () => void;
}

// Context & Provider

const JobOffersContext = createContext<JobOffersContextType | undefined>(undefined);

const JobOffersProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const parsedParams = queryString.parse(searchParams.toString(), { arrayFormat: 'bracket' });

  // Search reducer

  const initialSearchState: SearchProps = {
    page: Number(parsedParams['page']) || 1,
    sort: (parsedParams['sort'] as string) || '',
    filters: {
      by_technology: (parsedParams['by_technology'] as string[]) || [],
      by_category: (parsedParams['by_category'] as string[]) || [],
    },
  };

  const searchReducer = (state: SearchProps, action: any) => {
    switch (action.type) {
      case 'SET_PAGE':
        return { ...state, page: action.payload };
      case 'SET_SORT':
        return { ...state, sort: action.payload };
      case 'SET_TECHNOLOGIES':
        return { ...state, filters: { ...state.filters, by_technology: action.payload } };
      case 'SET_CATEGORIES':
        return { ...state, filters: { ...state.filters, by_category: action.payload } };
      case 'SET_EMPLOYMENT_TYPE':
        return { ...state, employmentType: action.payload };
      case 'SET_VIEW_TYPE':
        return { ...state, viewType: action.payload };
      default:
        return state;
    }
  };

  const [searchState, searchDispatch] = useReducer(searchReducer, initialSearchState);

  // Update URL query params on state change

  const updateUrl = () => {
    const queryParameters = {
      ...(searchParams.has('page') && { page: searchState.page }),
      sort: searchState.sort,
      by_technology: searchState.filters.by_technology,
      by_category: searchState.filters.by_category,
    };

    const query = queryString.stringify(queryParameters, {
      arrayFormat: 'bracket',
      skipEmptyString: true,
      skipNull: true,
    });

    const newPath = query ? `${pathname}?${query}` : pathname;

    router.push(newPath, { scroll: false });
  };

  useEffect(() => {
    updateUrl();
  }, [searchState]);

  // Layout reducer

  const layoutInitalState: LayoutProps = {
    employmentType: 'b2b',
    viewType: 'grid',
  };

  const layoutReducer = (state: LayoutProps, action: any) => {
    switch (action.type) {
      case 'SET_EMPLOYMENT_TYPE':
        return { ...state, employmentType: action.payload };
      case 'SET_VIEW_TYPE':
        return { ...state, viewType: action.payload };
      default:
        return state;
    }
  };

  const [layoutState, layoutDispatch] = useReducer(layoutReducer, layoutInitalState);

  // Search Dispatch actions

  const setPage = (page: number) => {
    searchDispatch({ type: 'SET_PAGE', payload: page });
  };

  const setSort = (sort: string) => {
    searchDispatch({ type: 'SET_SORT', payload: sort });
  };

  const setTechnologies = (technologies: string[]) => {
    searchDispatch({ type: 'SET_TECHNOLOGIES', payload: technologies });
  };

  const setCategories = (categories: string[]) => {
    searchDispatch({ type: 'SET_CATEGORIES', payload: categories });
  };

  // Layout Dispatch

  const setEmploymentType = (type: string) => {
    layoutDispatch({ type: 'SET_EMPLOYMENT_TYPE', payload: type });
  };

  const setViewType = (type: string) => {
    layoutDispatch({ type: 'SET_VIEW_TYPE', payload: type });
  };

  // Helpers

  const hasFilters = () => {
    return searchState.filters.by_technology.length > 0 || searchState.filters.by_category.length > 0;
  };

  const clearFilters = () => {
    searchDispatch({ type: 'SET_TECHNOLOGIES', payload: [] });
    searchDispatch({ type: 'SET_CATEGORIES', payload: [] });
  };

  // Context value

  const value: JobOffersContextType = {
    ...searchState,
    ...layoutState,
    updateUrl,
    setPage,
    setSort,
    setTechnologies,
    setCategories,
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
