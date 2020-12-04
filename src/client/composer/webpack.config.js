const AssetsPlugin = require('assets-webpack-plugin')
const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { default: Axios } = require('axios')

const getServiceMeta = require('../../common/services-mapping');

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

const clientConfig = {
	entry: entries,
	devtool: 'source-map',
	output: {
		filename: '[name]-[chunkhash].js',
		path: path.resolve(__dirname, '../../../dist/composer'),
		library: '[name]_lib',
		chunkFilename: 'chunks/[name].js'
	},
	module: modules,
	plugins: [
		new SharedLibraryWebpackPlugin({
			namespace: '__shared__',
			libs: [
				{ name: 'react', chunkName: 'react', chunkFilename: 'react' },
				{ name: 'react-dom' },
				{ name: '@tutu/order', pattern: '@tutu/order' },
			],
		}),
		new AssetsPlugin({
			filename: 'dist/composer/assets.json',
			prettyPrint: true,
			metadata: {
				entries: Object.keys(entries)
			}
		 })

	],
};

const serverConfig = {
	target: 'node',
	entry: entries,
	mode: 'development',
	output: {
		path: path.resolve(__dirname, '../../../dist/composer'),
		filename: 'lib.node.js',
		library: '',
		libraryTarget: 'commonjs'
	},
	module: modules,
	externals: /react/i
};

module.exports = [
	serverConfig,
	clientConfig,
]
