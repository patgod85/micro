#!/usr/bin/env sh

rimraf dist/hat/* && webpack -c src/client/hat/webpack.client.config.js &&
 webpack -c src/client/hat/webpack.server.config.js;

