import {merge} from 'webpack-merge';
import common from './webpack.common.config'
import ESLintPlugin from 'eslint-webpack-plugin'

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
