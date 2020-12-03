const webpack = require('webpack');
const path = require('path');


const vendorConfig = {
	mode: process.env.NODE_ENV,
	entry: {
		vendor: [
			'react',
			'react-dom',
		],
		order: [
			'@tutu/order'
		],
	},

	output: {
		filename: '[name].chunkhash.js',
		path: path.resolve(__dirname, '../../../dist/composer'),
		library: '[name]_lib',
	},

	plugins: [
		new webpack.DllPlugin({
			path: path.resolve(__dirname, '../../../dist/composer/[name]-manifest.json'),
			name: '[name]_lib',
		}),

		// new AssetsPlugin({
		// 	filename: 'assets-vendors.json',
		// 	path: path.join(__dirname, '../../'),
		// }),
	],
}


module.exports = [vendorConfig];
