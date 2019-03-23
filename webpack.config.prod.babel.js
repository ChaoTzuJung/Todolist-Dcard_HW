import path from 'path';
import webpack from 'webpack';
import atImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import palette from './config/palette';
import media from './config/media';
import env from './config/env';
import endpoint from './config/endpoint';

const uglifyDevOptions = {
	uglifyOptions: {
		compress: {
			warnings: false,
			comparisons: false,
		},
		output: {
			comments: false,
			ascii_only: false,
		},
	},
};

const uglifyProductionOptions = {
	uglifyOptions: {
		parse: {},
		compress: {
			warnings: false,
			// Disabled because of an issue with Uglify breaking seemingly valid code:
			// https://github.com/facebook/create-react-app/issues/2376
			// Pending further investigation:
			// https://github.com/mishoo/UglifyJS2/issues/2011
			comparisons: false,
		},
		mangle: true,
		output: {
			comments: false,
			// Turned on because emoji and regex is not minified properly using default
			// https://github.com/facebook/create-react-app/issues/2488
			ascii_only: true,
		},
	},
	// Use multi-process parallel running to improve the build speed
	// Default number of concurrent runs: os.cpus().length - 1
	parallel: true,
	// Enable file caching
	cache: true,
	sourceMap: false,
};

const webpackProdConfig = {
	devtool: 'source-map',
	mode: process.env.NODE_ENV,
	entry: {
		app: './src/index.js',
	},
	output: {
		path: path.join(__dirname, '_public'),
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].chunk.js',
		publicPath: '/',
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': { ...env, ...endpoint },
		}),

		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				removeScriptTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
			inject: true,
			showErrors: false,
			filename: 'index.html',
			chunksSortMode: 'dependency',
		}),

		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: '[name].[hash].css',
			chunkFilename: '[id].[hash].css',
		}),
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin(
				process.env.NODE_ENV === 'production' ? uglifyProductionOptions : uglifyDevOptions,
			),
		],
		// Automatically split vendor and commons
		// https://twitter.com/wSokra/status/969633336732905474
		// https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
		splitChunks: {
			chunks: 'all',
			name: 'vendors',
		},
		// Keep the runtime chunk seperated to enable long term caching
		// https://twitter.com/wSokra/status/969679223278505985
		runtimeChunk: true,
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				include: [path.join(__dirname, 'src')],
				exclude: path.join(__dirname, 'node_modules'),
				loader: 'babel-loader',
				options: {
					presets: [
						['@babel/preset-env', { loose: true, modules: false, useBuiltIns: 'entry' }],
						'@babel/preset-react',
					],
					plugins: [
						['module-resolver', { root: ['./src'] }],
						'@babel/plugin-syntax-dynamic-import',
						'@babel/plugin-syntax-import-meta',
						'@babel/plugin-proposal-class-properties',
						'@babel/plugin-proposal-json-strings',
						'@babel/plugin-transform-react-constant-elements',
					],
					babelrc: false,
				},
			},
			{
				test: /\.css$/,
				include: path.join(__dirname, 'src'),
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: process.env.NODE_ENV !== 'production',
							camelCase: true,
							modules: true,
							importLoaders: 1,
							localIdentName: '[name]__[local]___[hash:base64:5]',
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: process.env.NODE_ENV !== 'production' ? 'inline' : false,
							plugins: () => [
								atImport(),
								postcssPresetEnv({
									stage: 0,
									importFrom: [
										{
											customMedia: media,
											customProperties: palette,
										},
									],
									preserve: false,
								}),
							],
						},
					},
				],
			},
			{
				test: /\.css$/,
				include: path.join(__dirname, 'node_modules'),
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: process.env.NODE_ENV !== 'production',
						},
					},
				],
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				include: path.join(__dirname, 'src'),
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: './assets/[name]__[hash].[ext]',
				},
			},
			{
				test: /^(?!.*\.inline\.svg$).*\.svg$/,
				include: path.join(__dirname, 'src'),
				use: [
					'@svgr/webpack',
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: './assets/[name]__[hash].[ext]',
						},
					},
				],
			},
			{
				test: /\.inline.svg$/,
				include: path.join(__dirname, 'src'),
				loader: '@svgr/webpack',
				options: {
					svgoConfig: {
						plugins: [{ cleanupIDs: false }],
					},
				},
			},
		],
	},
	node: {
		fs: 'empty',
	},
	resolve: {
		modules: ['node_modules'],
	},
};

// Minify and optimize the CSS
if (process.env.NODE_ENV === 'production') {
	webpackProdConfig.plugins.push(new OptimizeCSSAssetsPlugin({}));
}

export default webpackProdConfig;
