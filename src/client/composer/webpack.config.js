const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { default: Axios } = require('axios')

const getServiceMeta = require('../../common/services-mapping');

// const {
// 	SharedLibraryWebpackPlugin,
// } = require('@tinkoff/shared-library-webpack-plugin');
const composerManifest = require('../../../dist/composer/vendor-manifest.json');

const hatServiceMeta = getServiceMeta('hat');

const MANIFEST = 'manifest';

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
		// new SharedLibraryWebpackPlugin({
		// 	namespace: '__shared__',
		// 	libs: [
		// 		{ name: 'react', chunkName: 'react.js', pattern: "react" },
		// 		{ name: 'react-dom', chunkName: 'react-dom.js', pattern: "react-dom" },
		// 	],
		// }),
		new webpack.DllReferencePlugin({
			context: '.',
			manifest: require('../../../dist/hat/vendor-manifest.json'),
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

module.exports = [
	serverConfig,
	new Promise(async function (resolve, reject) {
		const hatResponse = await Axios.get(`${hatServiceMeta.url}/meta`);

		if (!hatResponse || !hatResponse.data) {
			throw new Error('Невалидные данные от сервиса фрагментов');
		}

		const externalResources = await Promise.all(
			hatResponse.data.resources.map((resource) =>
				new Promise(
					async function (resolve, reject) {
						const res = await Axios.get(resource.src, { responseType: 'stream' });

						if (!res || !res.data) {
							reject(new Error(`Невалидные данные при получении ресурса [${resource.src}]`));
						}

						let filename = resource.type === MANIFEST ? 'vendor-manifest.json' : 'vendor.js';

						const dirname = path.resolve(__dirname, `../../../dist/composer/fragments/`);
						if (!fs.existsSync(dirname)) {
							await fs.promises.mkdir(
								dirname,
								{ recursive: true }
							)
						}

						const target = `../../../dist/composer/fragments/${filename}`;

						await res.data.pipe(
							fs.createWriteStream(
								path.resolve(__dirname, target)
							)
						);

						resolve({ type: resource.type, target });
					}
				)
			)
		);

		const externalManifest = externalResources.find(x => x.type === MANIFEST)

		if (externalManifest) {
			clientConfig.plugins.push(
				new webpack.DllReferencePlugin({
					context: '.',
					manifest: require(externalManifest.target),
				}),
			);
		} else {
			reject('не удалось найти манифест фрагмента');
		}


		resolve(clientConfig);
	})
]
