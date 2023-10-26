'use client';

import { useContext, createContext, useReducer, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';

export type SortTypes = 'created_at' | '-created_at' | 'salary' | '-salary';
export type EmploymentTypes = 'b2b' | 'uop';
export type ViewTypes = 'grid' | 'list';
export type SeniorityTypes = 1 | 2 | 3 | 4;

interface SearchProps {
  page: number;
  sort: SortTypes | null;
  filters: {
    technologies: string[];
    categories: string[];
    seniorities: SeniorityTypes[];
    salary: {
      from: number | null;
      to: number | null;
    };
  };
}

interface LayoutProps {
  employmentType: EmploymentTypes;
  viewType: ViewTypes;
}

interface JobOffersContextType extends SearchProps, LayoutProps {
  setPage: (page: number) => void;
  setSort: (sort: string | null) => void;
  setTechnologies: (technologies: string[]) => void;
  setCategories: (categories: string[]) => void;
  setSeniorities: (seniorities: SeniorityTypes[]) => void;
  setSalary: (salary: { from: number; to: number }) => void;
  setEmploymentType: (type: string) => void;
  setViewType: (type: string) => void;
  updateUrl: () => void;
  hasFilters: () => boolean;
  clearFilters: () => void;
  hasFilter: (filter: string) => boolean;
  clearFilter: (filter: string) => void;
}

// Context & Provider

const JobOffersContext = createContext<JobOffersContextType | undefined>(undefined);

const JobOffersProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const parsedParams = queryString.parse(searchParams.toString(), { arrayFormat: 'bracket', parseNumbers: true });

  // Search reducer

  const initialSearchState: SearchProps = {
    page: Number(parsedParams['page']) || 1,
    sort: (parsedParams['sort'] as SortTypes) || null,
    filters: {
      technologies: (parsedParams['by_technology'] as string[]) || [],
      categories: (parsedParams['by_category'] as string[]) || [],
      seniorities: (parsedParams['by_seniority'] as SeniorityTypes[]) || [],
      salary: {
        from: Number(parsedParams['by_salary[from]']) || null,
        to: Number(parsedParams['by_salary[to]']) || null,
      },
    },
  };

  const searchReducer = (state: SearchProps, action: any) => {
    switch (action.type) {
      case 'SET_PAGE':
        return { ...state, page: action.payload };
      case 'SET_SORT':
        return { ...state, sort: action.payload };
      case 'SET_TECHNOLOGIES':
        return { ...state, filters: { ...state.filters, technologies: action.payload } };
      case 'SET_CATEGORIES':
        return { ...state, filters: { ...state.filters, categories: action.payload } };
      case 'SET_SENIORITIES':
        return { ...state, filters: { ...state.filters, seniorities: action.payload } };
      case 'SET_SALARY_FROM':
        return { ...state, filters: { ...state.filters, salary: { ...state.filters.salary, from: action.payload } } };
      case 'SET_SALARY_TO':
        return { ...state, filters: { ...state.filters, salary: { ...state.filters.salary, to: action.payload } } };
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
      ...((searchParams.has('page') || searchState.page != 1) && { page: searchState.page }),
      sort: searchState.sort,
      by_technology: searchState.filters.technologies,
      by_category: searchState.filters.categories,
      by_seniority: searchState.filters.seniorities,
      'by_salary[from]': searchState.filters.salary.from,
      'by_salary[to]': searchState.filters.salary.to,
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

  const setSort = (sort: string | null) => {
    searchDispatch({ type: 'SET_SORT', payload: sort });
  };

  const setTechnologies = (technologies: string[]) => {
    searchDispatch({ type: 'SET_TECHNOLOGIES', payload: technologies });
    searchDispatch({ type: 'SET_PAGE', payload: 1 });
  };

  const setCategories = (categories: string[]) => {
    searchDispatch({ type: 'SET_CATEGORIES', payload: categories });
    searchDispatch({ type: 'SET_PAGE', payload: 1 });
  };

  const setSeniorities = (seniorities: SeniorityTypes[]) => {
    searchDispatch({ type: 'SET_SENIORITIES', payload: seniorities });
    searchDispatch({ type: 'SET_PAGE', payload: 1 });
  };

  const setSalary = (salary: { from: number; to: number }) => {
    searchDispatch({ type: 'SET_SALARY_FROM', payload: salary.from });
    searchDispatch({ type: 'SET_SALARY_TO', payload: salary.to });
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
    return (
      searchState.filters.technologies.length > 0 ||
      searchState.filters.categories.length > 0 ||
      searchState.filters.seniorities.length > 0 ||
      searchState.sort ||
      searchState.filters.salary.from ||
      searchState.filters.salary.to
    );
  };

  const clearFilters = () => {
    searchDispatch({ type: 'SET_TECHNOLOGIES', payload: [] });
    searchDispatch({ type: 'SET_CATEGORIES', payload: [] });
    searchDispatch({ type: 'SET_SENIORITIES', payload: [] });
    searchDispatch({ type: 'SET_SORT', payload: '' });
    searchDispatch({ type: 'SET_SALARY_FROM', payload: null });
    searchDispatch({ type: 'SET_SALARY_TO', payload: null });
  };

  const hasFilter = (filter: string) => {
    switch (filter) {
      case 'technologies':
        return searchState.filters.technologies.length > 0;
      case 'categories':
        return searchState.filters.categories.length > 0;
      case 'seniorities':
        return searchState.filters.seniorities.length > 0;
      case 'sort':
        return searchState.sort;
      case 'salary':
        return searchState.filters.salary.from || searchState.filters.salary.to;
      default:
        return false;
    }
  };

  const clearFilter = (filter: string) => {
    switch (filter) {
      case 'technologies':
        searchDispatch({ type: 'SET_TECHNOLOGIES', payload: [] });
        break;
      case 'categories':
        searchDispatch({ type: 'SET_CATEGORIES', payload: [] });
        break;
      case 'seniorities':
        searchDispatch({ type: 'SET_SENIORITIES', payload: [] });
        break;
      case 'sort':
        searchDispatch({ type: 'SET_SORT', payload: '' });
        break;
      case 'salary':
        searchDispatch({ type: 'SET_SALARY_FROM', payload: null });
        searchDispatch({ type: 'SET_SALARY_TO', payload: null });
        break;
      default:
        break;
    }
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
    setSeniorities,
    setSalary,
    setEmploymentType,
    setViewType,
    hasFilters,
    clearFilters,
    hasFilter,
    clearFilter,
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
