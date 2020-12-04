const { default: Axios } = require('axios')
const { renderToString } = require('react-dom/server')
const express = require('express')
const getServiceMeta = require('../../common/services-mapping');
const app = express()

const PageComponent = require('../../../dist/composer/lib.node').Page;

const assets = require('../../../dist/composer/assets.json');

const composerServiceMeta = getServiceMeta('composer');
const hatServiceMeta = getServiceMeta('hat');
const staticServiceMeta = getServiceMeta('static');

app.get('/', async (req, res, next) => {
	try {
		const hatResponse = await Axios.get(hatServiceMeta.url);

		if (!hatResponse || !hatResponse.data) {
			throw new Error('Невалидные данные от сервиса фрагментов');
		}

		const hatData = hatResponse.data;

		const { metadata } = assets;
		const { entries } = metadata;

		const chunks = [];

		const hostResources = Object.keys(assets).reduce(
			(acc, assetKey) => {
				if (assetKey === 'metadata') {
					return acc;
				}
				const asset = assets[assetKey];

				const isSharedChunk = entries.indexOf(assetKey) === -1;

				if (isSharedChunk) {
					chunks.push(assetKey);
				}

				return [
					{
						type: 'js',
						src: `${staticServiceMeta.url}/composer/${asset.js}`, attributes: { async: true }
					},
					...acc,
				];
			},
			[]
		)

		const resouces = []
			.concat(hostResources)
			.concat(hatData.resources.filter(resource => {
				const { chunkType, name } = resource;

				return chunkType === 'main' || chunks.indexOf(name) === -1;
			}));

		const pageHtml = renderToString(PageComponent({ hatHtml: hatData.html }));

		res.send(`<!DOCTYPE html><html>
 <body>
    <div id="root">
      ${pageHtml}
    </div>

    ${resouces.map(function (resource) {
		return `<script type="text/javascript" src="${resource.src}" charset="utf-8"></script>`;
	}).join('')}
 </body>
  `);
	} catch (e) {
		console.log(' Exception >>>>>>>>>>>>>> ', hatServiceMeta.url, e.message);
		return next(e);
	}
})

app.use((err, req, res, next) => {
	res.status(500).send('Внутренняя ошибка сервера');
});

app.listen(composerServiceMeta.port, () => {
	console.log(`Composer server listening at ${composerServiceMeta.url}`)
})
