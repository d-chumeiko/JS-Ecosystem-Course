const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
	entry: {
		main: './src/scripts/main.js'
	},

	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},

	resolve: {
		modules: [ 'node_modules' ]
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true
					}
				}
			},
			{
				test: /\.scss/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [ autoprefixer() ]
						}
					},
					'sass-loader'
				]
			},
			
		]
	},

	plugins: [
        new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new CopyWebpackPlugin([ { from: 'src/images' }]),
	]
};
