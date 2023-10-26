type GetJobOffers = (searchParams: URLSearchParams) => Promise<{
  data: any;
  pages: number;
  count: number;
  currentPage: number;
}>;

export const allowedGetJobOffersParams = [
  'page',
  'items',
  'sort',
  'order',
  'is_active',
  'is_interview_online',
  'is_ua_supported',
  'by_title',
  'by_category',
  'by_technology',
  'by_remote',
  'by_travelling',
  'by_city',
  'by_seniority',
  'by_currency',
  'by_employment',
  'by_language',
  'by_skill',
  'by_salary',
];

export const getJobOffers: GetJobOffers = async (queryParams) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/job/offers?${queryParams.toString()}`;

  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  const pages = Number(res.headers.get('total-pages'));
  const count = Number(res.headers.get('total-count'));
  const currentPage = Number(res.headers.get('current-page'));

  return { data, pages, count, currentPage };
};

export const getTechnologies = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/technologies`;

  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch technologies list.');
  }

  const data = await res.json();

  return data;
};

export const getCategories = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch categories list.');
  }

  const data = await res.json();

  return data;
};
