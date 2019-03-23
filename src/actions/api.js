import queryString from 'query-string';

const { API_ENDPOINT } = process.env;

export const generateUrl = (url, params) => {
	const paramsString = queryString.stringify(params, { arrayFormat: 'bracket' });

	const URL =
		paramsString !== '' ? `${API_ENDPOINT}/${url}?${paramsString}` : `${API_ENDPOINT}/${url}`;

	return URL;
};

export const wrapFetch = async (url, options = { headers: {} }, params = {}) => {
	const URL = generateUrl(url, params);

	const headers = new Headers({
		'Content-Type': 'application/json',
		Accept: 'application/json',
		...options.headers,
	});

	const result = await fetch(URL, { ...options, headers });

	return result.json();
};
