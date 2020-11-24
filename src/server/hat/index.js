const express = require('express')
const app = express()

const getServiceMeta = require('../services-mapping');

const staticServiceMeta = getServiceMeta('static');
const hatServiceMeta = getServiceMeta('hat');

app.get('/meta', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({
    name: "hat",
    peerDependencies: [ "react" ],
  }))
})

app.get('/', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({
    "name": "hat",
    resources: [
      { type: 'js', src: `${staticServiceMeta.url}/hat.js`, attributes: { async: true } },
    ],
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