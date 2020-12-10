const AssetsPlugin = require('assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');
// const { ModuleFederationPlugin } = require("webpack").container;

const getServiceMeta = require('../../common/services-mapping');


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
	plugins: [
		// new ModuleFederationPlugin({
		// 	name: "composer",
		// 	remotes: {
		// 		hat: "hat@http://localhost:3010/remoteEntry.js",
		// 	},
		// 	shared: { react: { singleton: true }, "react-dom": { singleton: true } },
		// }),
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
