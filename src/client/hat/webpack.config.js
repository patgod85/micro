const AssetsPlugin = require('assets-webpack-plugin')
const webpack = require('webpack');
const path = require('path');

const {
	SharedLibraryWebpackPlugin,
} = require('@tinkoff/shared-library-webpack-plugin');

var entries = {
	index: path.join(__dirname, './index.jsx'),
};

const modules = {
	rules: [
		{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader",
				options: {
					presets: ['@babel/preset-env', '@babel/preset-react'],
				}
			}
		}
	]
}
const resolve = { extensions: ['.js', '.jsx', '.css', '.json'] };

const clientConfig = {
	entry: entries,
	devtool: 'source-map',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../../../dist/hat'),
		library: '[name]_lib',
		chunkFilename: 'chunks/[name].js'
	},

	resolve,
	module: modules,
	plugins: [
		new SharedLibraryWebpackPlugin({
			namespace: '__shared__',
			libs: [
				{ name: 'react' },
				{ name: 'react-dom' },
				{
					name: '@tutu/order',
					deps: ['react', 'react-dom']
				},
			],
		}),
		new AssetsPlugin({
			filename: 'dist/hat/assets.json',
			prettyPrint: true,
			metadata: {
				entries: Object.keys(entries)
			}
		 })
	],
}

const serverConfig = {
	target: 'node',
	entry: entries,
	mode: 'development',
	resolve,
	output: {
		path: path.resolve(__dirname, '../../../dist/hat'),
		filename: 'lib.node.js',
		library: '',
		libraryTarget: 'commonjs'
	},
	module: modules,
	externals: /react/i
};

module.exports = [serverConfig, clientConfig];
