const express = require('express')
const { renderToString } = require('react-dom/server')
const app = express()

import { SheetsRegistry } from '@tutu/order/provider';
import * as csso from 'csso';

const FragmentComponent = require('../../client/hat').Fragment;

const getServiceMeta = require('../../common/services-mapping');

const staticServiceMeta = getServiceMeta('static');
const hatServiceMeta = getServiceMeta('hat');

app.get('/meta', (req, res) => {
	res.header('Content-Type', 'application/json');
	res.send(JSON.stringify({
		name: "hat",
		peerDependencies: ["react"],
		resources: [
			{ type: 'manifest', src: `${staticServiceMeta.url}/hat/vendor-manifest.json` },
			{ type: 'vendors', src: `${staticServiceMeta.url}/hat/vendor.chunkhash.js` },
		],
	}))
})

app.get('/', (req, res) => {
	res.header('Content-Type', 'application/json');

	const assets = require('../../../dist/hat/assets.json');

	const { metadata } = assets;
	const { entries } = metadata;

	const resources = Object.keys(assets).reduce(
		(acc, assetKey) => {
			if (assetKey === 'metadata') {
				return acc;
			}
			const isSharedChunk = entries.indexOf(assetKey) === -1;

			const asset = assets[assetKey];

			const result = [...acc];

			if (asset.js) {
				result.push({
					type: 'js',
					name: assetKey,
					chunkType: isSharedChunk ? 'shared' : 'main',
					src: `${staticServiceMeta.url}/hat/${asset.js}`,
					attributes: { async: true }
				});
			}

			if (asset.css) {
				result.push({
					type: 'css',
					src: `${staticServiceMeta.url}/hat/${asset.css}`,
					attributes: {}
				});
			}

			return result;
		},
		[]
	)
	const sheetsRegistry = new SheetsRegistry();
	const fragmentHtml = renderToString(FragmentComponent(sheetsRegistry));

	const css = csso.minify(sheetsRegistry.toString()).css;

	resources.push({
		type: 'css',
		attributes: {},
		inlineCode: css,
	});

	res.send(JSON.stringify({
		"name": "hat",
		resources,
		html: `
    <div id="hat_root">
      ${fragmentHtml}
    </div>
    `
	}))
})

app.listen(hatServiceMeta.port, () => {
	console.log(`Hat server listening at ${hatServiceMeta.url}`)
})
