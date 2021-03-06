const AssetsPlugin = require('assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');

const {
	SharedLibraryWebpackPlugin,
} = require('@tinkoff/shared-library-webpack-plugin');

var entries = {
	index: path.join(__dirname, './index.jsx'),
};

const jsxRule = {
	test: /\.jsx?$/,
	exclude: /node_modules/,
	use: {
		loader: "babel-loader",
		options: {
			presets: ['@babel/preset-env', '@babel/preset-react'],
		}
	}
}

// const modules =
const resolve = { extensions: ['.js', '.jsx', '.css', '.json'] };

const clientConfig = {
	mode: 'production',
	entry: entries,
	devtool: 'source-map',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../../../dist/hat'),
		library: '[name]_lib',
		chunkFilename: 'chunks/[name].js',
		publicPath: 'http://localhost:5151/hat/',
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
		]
	},
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
		 }),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[chunkhash].css',
			chunkFilename: '[id].[hash].css',
		}),
	],
}


module.exports = [clientConfig];
