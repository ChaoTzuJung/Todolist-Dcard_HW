require('@babel/register');

const path = require('path');
const config = require('../webpack.config').default;

const modifyRelativePath = fixPath => path.join(__dirname, '..', path.basename(fixPath));

module.exports = {
	module: {
		rules: config.module.rules.map(rule => {
			const newRule = Object.assign({}, rule, {
				include: Array.isArray(rule.include)
					? rule.include.map(includePath => modifyRelativePath(includePath))
					: modifyRelativePath(rule.include),
			});

			if (newRule.loader === 'babel-loader') {
				newRule.options.plugins[1][1].root = ['../src'];
			}

			return newRule;
		}),
	},
	externals: {
		jsdom: 'window',
		cheerio: 'window',
		'react/lib/ExecutionEnvironment': true,
		'react/lib/ReactContext': 'window',
		'react/addons': true,
	},
};
