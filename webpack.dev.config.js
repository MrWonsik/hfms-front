const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');

module.exports = merge(common, {
    mode: 'development', 
    devServer: {
        watchOptions: {
            aggregateTimeout: 500, // delay before reloading
            poll: 1000 // enable polling since fsevents are not supported in docker
        }
    },
  });