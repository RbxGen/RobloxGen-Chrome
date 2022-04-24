const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: false,
	entry: {
		popup: path.resolve(__dirname, 'src', 'popup.ts'),
		background: path.resolve(__dirname, 'src', 'background.ts'),
		options: path.resolve(__dirname, 'src', 'options.ts')
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader'
			}
		]
	},
	resolve: {
		modules: [path.resolve(__dirname, 'src')],
		extensions: ['.js', '.ts']
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'public'
				}
			]
		})
	]
};
