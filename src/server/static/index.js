const express = require('express')
const app = express()
const getServiceMeta = require('../services-mapping');

const staticServiceMeta = getServiceMeta('static');

app.use(express.static('dist'));

app.listen(staticServiceMeta.port, () => {
	console.log(`Static server listening at ${staticServiceMeta.url}`)
})
