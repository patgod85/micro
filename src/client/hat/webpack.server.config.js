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

const serverConfig = {
	target: 'node',
	entry: {
		index: path.join(__dirname, '../../server/hat/index.js'),
	},
	mode: 'production',
	resolve,
	output: {
		path: path.resolve(__dirname, '../../../dist/hat'),
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
			}
		]
	},
};

module.exports = [serverConfig];
