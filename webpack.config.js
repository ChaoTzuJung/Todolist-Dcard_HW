import path from 'path';
import webpack from 'webpack';
import atImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import palette from './config/palette';
import media from './config/media';
import env from './config/env';
import endpoint from './config/endpoint';

export default {
	devtool: 'cheap-module-eval-source-map',
	mode: 'development',
	entry: {
		app: ['webpack-hot-middleware/client', 'react-hot-loader/patch', './src/index.js'],
	},
	output: {
		path: path.join(__dirname, '_public'),
		filename: '[name].bundle.js',
		publicPath: '/',
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': { ...env, ...endpoint },
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			chunksSortMode: 'dependency',
		}),
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
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
			}),
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
				include: path.join(__dirname, 'src'),
				exclude: path.join(__dirname, 'node_modules'),
				loader: 'babel-loader',
				options: {
					presets: [
						['@babel/preset-env', { loose: true, modules: false, useBuiltIns: 'entry' }],
						'@babel/preset-react',
					],
					plugins: [
						'react-hot-loader/babel',
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
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							camelCase: true,
							modules: true,
							importLoaders: 1,
							localIdentName: '[name]__[local]___[hash:base64:5]',
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: 'inline',
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
					{ loader: 'style-loader', options: { sourceMap: true } },
					{ loader: 'css-loader', options: { sourceMap: true } },
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
