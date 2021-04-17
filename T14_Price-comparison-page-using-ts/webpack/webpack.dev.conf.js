const webpack = require('webpack');
const { merge } = require('webpack-merge');

const webpackConfig = require('./webpack.config');

const devWebpackConfig = merge(webpackConfig, {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
    contentBase: webpackConfig.externals.paths.dist,
		port: 8081,
		overlay: {
			warnings: true,
			errors: true
		}
	},
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			filename: '[name].map'
		})
	]
});

module.exports = new Promise((resolve, reject) => {
	resolve(devWebpackConfig);
});
