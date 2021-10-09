import {merge} from 'webpack-merge'
import common from './webpack.common.config'

module.exports = merge(common, {
  mode: 'production'
})
