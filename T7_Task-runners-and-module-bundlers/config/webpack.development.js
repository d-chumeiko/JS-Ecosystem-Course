const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const { merge } = require('webpack-merge');
const webpackCommon = require('./webpack.common');

module.exports = merge(webpackCommon, {
	devtool: 'source-map',
	mode: 'development',

	output: {
		path: path.resolve('dist'),
		filename: 'bundle.min.js',
		chunkFilename: 'vendor.min.js'
	},

	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new MiniCssExtractPlugin({
			filename: 'bundle.min.css'
		})
	],

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		open: 'chrome',
		compress: true,
		port: 9000
	}
});
