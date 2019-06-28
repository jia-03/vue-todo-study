const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const VueServerPlugin= require('vue-server-renderer/server-plugin')


let config

config = merge(baseConfig, {
  target:'node',
  entry:path.join(__dirname,'../client/server-entry.js'),
  devtool: 'source-map',
  output:{
    libraryTarget:'commonjs2',
    filename:'server-entry.js',
    path:path.join(__dirname,'../server-build')
  },
  externals:Object.keys(require('../package.json').dependencies),
  module: {
      rules: [ {
        test: /\.styl/,
        use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                    }
                },
                'stylus-loader'
            ]
        })
    }]
  },
  devServer,
  plugins: [
      new ExtractPlugin('styles.[chunkhash:8].css'),
      new webpack.defaultPluins({
        'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV||'development'),
        'process.env.VUE_ENV':"'server'"
      }),
      new VueServerPlugin()
  ]
})

module.exports = config