const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist')
};

module.exports = {
	externals: {
		paths
	},

	entry: {
		app: paths.src
	},

	output: {
		filename: '[name].js',
		path: path.dist,
	},

	resolve: {
		extensions: [ '.ts', '.tsx', '.js', '.json' ]
	},

	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: paths.src + '/index.html'
		})
	]
};
