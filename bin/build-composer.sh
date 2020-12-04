#!/usr/bin/env sh

rimraf dist/composer/* && webpack -c src/client/composer/webpack.config.js;

