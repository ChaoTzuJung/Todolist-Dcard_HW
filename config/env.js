export default {
	// Set production mode or development mode
	NODE_ENV: process.env.NODE_ENV && JSON.stringify(process.env.NODE_ENV),

	// Set API endpoint
	API: process.env.API && JSON.stringify(process.env.API),
	PROXY: process.env.PROXY && JSON.stringify(process.env.PROXY),

	DEV: JSON.stringify(process.env.API === 'dev'),
	DEMO: JSON.stringify(process.env.API === 'demo'),
	PRODUCTION: JSON.stringify(process.env.API === 'production'),
};
