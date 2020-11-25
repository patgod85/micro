const path = require('path');
const nodeExternals = require('webpack-node-externals');

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
		filename: '[name].js',
		path: path.resolve(__dirname, '../../../dist/composer'),
		library: '[name]_lib',
	},
	module: modules,
	plugins: [
		new SharedLibraryWebpackPlugin({
			namespace: '__shared__',
			libs: [
				{ name: 'react', chunkName: 'react.js', pattern: "react" },
				{ name: 'react-dom', chunkName: 'react-dom.js', pattern: "react-dom" },
			],
		}),
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

module.exports = [serverConfig, clientConfig];
