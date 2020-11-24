const path = require('path');

const {
  SharedLibraryWebpackPlugin,
} = require('@tinkoff/shared-library-webpack-plugin');

var entries = { 
	index: path.join(__dirname, './index.jsx'),
 };

module.exports = {
    entry: entries,
    devtool: 'source-map',
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, '../../../dist/hat'),
      library: '[name]_lib',
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            }
          }
        }
      ]
    },
    plugins: [
      new SharedLibraryWebpackPlugin({
        namespace: '__shared__',
        libs: [
          { name: 'react', chunkName: 'react.js', pattern: "react" },
          { name: 'react-dom', chunkName: 'react-dom.js', pattern: "react-dom" },
        ],
      }),
    ],
  }