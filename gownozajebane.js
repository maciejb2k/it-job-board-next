const queryString = import('query-string');

queryString.parse('foo=1,2,3', { arrayFormat: 'comma' });
