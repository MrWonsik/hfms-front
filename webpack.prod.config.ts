const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.ts');

module.exports = merge(common, {
  mode: 'production'
})
