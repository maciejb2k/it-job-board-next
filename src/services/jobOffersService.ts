export async function getJobOffers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/offers`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
