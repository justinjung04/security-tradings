const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	entry: [
		'babel-polyfill',
		'./src/index',
		'webpack-hot-middleware/client'
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ 'env', 'react', 'stage-2' ]
					}
				}
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
          'css-loader',
          'sass-loader'
				]
			}
		]
	}
}