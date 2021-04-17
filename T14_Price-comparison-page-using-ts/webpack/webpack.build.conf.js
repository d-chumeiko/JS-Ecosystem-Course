const { merge } = require('webpack-merge');

const webpackConfig = require('./webpack.config');

const buildWebpackConfig = merge(webpackConfig, {
	mode: 'production'
});

module.exports = new Promise((resolve, reject) => {
	resolve(buildWebpackConfig);
});
