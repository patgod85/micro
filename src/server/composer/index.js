require('regenerator-runtime/runtime');

const { default: Axios } = require('axios')
const { renderToString } = require('react-dom/server')
const express = require('express')
const getServiceMeta = require('../../common/services-mapping');
const app = express()

const PageComponent = require('../../client/composer').Page;

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

				const js = [...acc.js];
				const css = [...acc.css];

				if (asset.js) {
					js.push({
						type: 'js',
						src: `${staticServiceMeta.url}/composer/${asset.js}`,
						attributes: { async: true },
					})
				}

				if (asset.css) {
					css.push({
						type: 'css',
						src: `${staticServiceMeta.url}/composer/${asset.css}`,
					});
				}

				return { js, css };
			},
			{
				js: [
				],
				css: [],
			}
		)

		const jsResouces = []
			.concat(hostResources.js)
			.concat(hatData.resources.filter(resource => {
				const { chunkType, name, type } = resource;

				return type === 'js' && (chunkType === 'main' || chunks.indexOf(name) === -1);
			}));

		const cssResouces = []
			.concat(hostResources.css)
			.concat(hatData.resources.filter(resource => {
				const { type } = resource;

				return type === 'css';
			}));

		const pageHtml = renderToString(PageComponent({ hatHtml: hatData.html }));

		res.send(`<!DOCTYPE html><html>
<head>
	<!-- Order.Styles -->
    ${cssResouces.map(function (resource) {
		const href = resource.src ? ` href="${resource.src}"` : '';
		return `<link rel="stylesheet" ${href}>${resource.inlineCode ? resource.inlineCode : ''}</link>`;
	}).join('')}
</head>
 <body>
    <div id="root">
      ${pageHtml}
	</div>

	<script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
	<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
    ${jsResouces.map(function (resource) {
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
