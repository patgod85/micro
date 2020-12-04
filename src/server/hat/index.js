const express = require('express')
const app = express()

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
			const asset = assets[assetKey];

			const isSharedChunk = entries.indexOf(assetKey) === -1;

			return [
				...acc,
				{
					type: 'js',
					name: assetKey,
					chunkType: isSharedChunk ? 'shared' : 'main',
					src: `${staticServiceMeta.url}/hat/${asset.js}`, attributes: { async: true }
				}
			];
		},
		[]
	)

	res.send(JSON.stringify({
		"name": "hat",
		resources,
		html: `
    <div id="hat_root">
      ...Loading...
    </div>
    `
	}))
})

app.listen(hatServiceMeta.port, () => {
	console.log(`Hat server listening at ${hatServiceMeta.url}`)
})
