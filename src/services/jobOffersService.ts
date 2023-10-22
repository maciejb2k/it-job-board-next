export async function getJobOffers({ page = 1, items = 10 }: { page: number; items: number }): Promise<{
  data: any;
  pages: number;
  count: number;
  currentPage: number;
}> {
  const queryParams = new URLSearchParams({ page: page.toString(), items: items.toString() });
  const url = `${process.env.NEXT_PUBLIC_API_URL}/job/offers?${queryParams.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  const pages = Number(res.headers.get('total-pages'));
  const count = Number(res.headers.get('total-count'));
  const currentPage = Number(res.headers.get('current-page'));

  return { data, pages, count, currentPage };
}
