const { default: Axios } = require('axios')
const { renderToString } = require('react-dom/server')
const express = require('express')
const getServiceMeta = require('../services-mapping');
const app = express()

const PageComponent = require('../../../dist/composer/lib.node').Page;


const composerServiceMeta = getServiceMeta('composer');
const hatServiceMeta = getServiceMeta('hat');
const staticServiceMeta = getServiceMeta('static');

const commonResources = [
	{ type: 'js', src: `${staticServiceMeta.url}/hat/vendor.chunkhash.js`, attributes: { async: true } },
	{ type: 'js', src: `${staticServiceMeta.url}/composer/index.js`, attributes: { async: true } },
];

app.get('/', async (req, res, next) => {
	try {
		const hatResponse = await Axios.get(hatServiceMeta.url);

		if (!hatResponse || !hatResponse.data) {
			throw new Error('Невалидные данные от сервиса фрагментов');
		}

		const hatData = hatResponse.data;

		const resouces = []
			.concat(commonResources)
			.concat(hatData.resources);

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
