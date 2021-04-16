const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { merge } = require('webpack-merge');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const path = require('path');
const webpackCommon = require('./webpack.common');
var packageJson = require('../package.json');
var bannerText = packageJson.name + ' - ' + packageJson.version;

module.exports = merge(webpackCommon, {
	mode: 'production',

	output: {
		filename: 'bundle.min.[hash].js',
		chunkFilename: 'vendor.min.[hash].js',
		path: path.resolve('dist')
	},

	optimization: {
		minimizer: [ new TerserJSPlugin(), new OptimizeCSSAssetsPlugin() ]
	},

	plugins: [
		new webpack.BannerPlugin({
			banner: bannerText + '\n'
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'bundle.min.[hash].css'
		}),
		new ImageminPlugin({
			gifsicle: {
				optimizationLevel: 5
			}
		})
	]
});
