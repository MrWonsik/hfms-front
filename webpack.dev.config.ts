const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.ts');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  watchOptions: {
    aggregateTimeout: 500, // delay before reloading
    poll: 1000 // enable polling since fsevents are not supported in docker
  },
  plugins: [new ESLintPlugin({
    extensions: ['js', 'jsx', 'tsx', 'ts']
  })]
})
