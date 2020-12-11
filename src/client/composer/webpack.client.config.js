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

const clientConfig = {
	entry: entries,
	mode: 'production',
	devtool: 'source-map',
	output: {
		filename: '[name]-[chunkhash].js',
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
	optimization: {
		splitChunks: {
		  chunks: 'all',
		},
	  },
	plugins: [
		new SharedLibraryWebpackPlugin({
			namespace: '__shared__',
			libs: [
				{ name: 'react' },
				{ name: 'react-dom'},
				{ name: 'axios' },
				{
					name: '@tutu/order',
					deps: ['react', 'react-dom']
				},
			],
		}),
		new AssetsPlugin({
			filename: 'dist/composer/assets.json',
			prettyPrint: true,
			metadata: {
				entries: Object.keys(entries)
			}
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[chunkhash].css',
			chunkFilename: '[id].[hash].css',
		}),
	],
};


module.exports = [
	clientConfig,
]
