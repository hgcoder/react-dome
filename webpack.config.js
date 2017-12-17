/**
 * 
 * @authors hgcoder (you@example.org)
 * @version $Id$
 */

const webpack = require('webpack')
const resolve = require('path').resolve;

const CompressionWebpackPlugin = require('compression-webpack-plugin')
process.env.NODE_ENV = 'production'
module.exports = {
  entry: {
    app: './index.js'
  },
  output: {
    filename: '[name].[min].js',
    path: resolve(__dirname, 'build/')
  },
  module: {
    rules: [
      // {
      //    test: /\.js$/,
      //    loader: 'eslint-loader',
      //    enforce: 'pre',
      //    include: [resolve('src')],
      //    options: {
      //      formatter: require('eslint-friendly-formatter')
      //    }
      //  },
      {
        test: /\.js$/,
        // exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            plugins: [
              'transform-remove-strict-mode'
            ],
            presets: [
              [
                'es2015', {
                  loose: true,
                  modules: false
                }
              ],
              'stage-0'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            resolve(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false,
      parallel: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: '"production"'
        }
    }),
    new webpack.ProvidePlugin({
      d3: "d3"
    })
  ],
  devtool: false
}