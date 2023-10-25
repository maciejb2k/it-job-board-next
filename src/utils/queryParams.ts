export const filtereParams = (params: URLSearchParams, allowedParams: string[]) => {
  const filteredParams = new URLSearchParams();

  for (const [key, value] of params) {
    if (allowedParams.includes(key)) {
      filteredParams.append(key, value);
    }
  }

  return filteredParams;
};

export const getQueryParams = (url: string) => {
  const urlParams = new URL(url);
  const params = new URLSearchParams(urlParams.search);
  return params;
};
