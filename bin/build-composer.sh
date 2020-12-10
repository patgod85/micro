#!/usr/bin/env sh

rimraf dist/composer/* &&
 webpack -c src/client/composer/webpack.client.config.js &&
 webpack -c src/client/composer/webpack.server.config.js &&
 webpack -c src/client/composer/webpack.vendors.config.js;

