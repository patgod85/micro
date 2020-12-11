const AssetsPlugin = require('assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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

const vendorNodeModules = /node_modules\/(?!(@tutu))/;

const jsxRule = {
	test: /\.jsx?$/,
	exclude: vendorNodeModules,

	use: {
		loader: "babel-loader",
		options: {
			presets: ['@babel/preset-env', '@babel/preset-react'],
		}
	}
}

const resolve = {
	extensions: ['.js', '.jsx', '.css', '.json'],
 };


const serverConfig = {
	target: 'node',
	entry: {
		index: path.join(__dirname, '../../server/composer/index.js'),
	},
	mode: 'production',
	output: {
		path: path.resolve(__dirname, '../../../dist/composer'),
		filename: 'server.js',
	},
	module: {
		rules: [
			jsxRule,
			{
				test: /\.css$/,
				use: [
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[folder]__[local]__[hash:base64:5]',
								exportOnlyLocals: true,
							},
						},
					}
				],
			},
		],
	},
	resolve,
	plugins: [
		new webpack.IgnorePlugin({
			resourceRegExp: /hat\/Hat/,
		})
	]
};

module.exports = [
	serverConfig,
]
