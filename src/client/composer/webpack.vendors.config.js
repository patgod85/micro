const AssetsPlugin = require('assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { default: Axios } = require('axios')

const getServiceMeta = require('../../common/services-mapping');

var entries = {
	vendors: path.join(__dirname, './vendors.js'),
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

const vendorConfig = {
	entry: entries,
	mode: 'production',
	devtool: 'source-map',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../../../dist/composer'),
		library: '[name]_lib',
		chunkFilename: 'chunks/[name].js'
	},
	resolve,
	module: {
		rules: [
			jsxRule,
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[folder]__[local]__[hash:base64:5]',
							},
							sourceMap: true,
							importLoaders: 1,
							// onlyLocals: true, // Несовместимо с текущим MiniCssExtractPlugin
							url: true,
						},
					},
				],
			},
		],
	},
	plugins: [
	],
};


module.exports = [
	vendorConfig,
]
