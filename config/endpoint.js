export const HOST_MAP = {
	dev: 'http://localhost:9000',
	demo: 'http://lab.25sprout.com',
	production: '',
};

const SELF_HOST_MAP = {
	dev: 'http://localhost:3000',
	demo: '',
	production: '',
};

export default {
	// Set API endpoint
	API_ENDPOINT: JSON.stringify(HOST_MAP[process.env.API]),
	SELF_HOST_ENDPOINT: JSON.stringify(SELF_HOST_MAP[process.env.API]),
};
