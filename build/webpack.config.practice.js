const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
// const  {VueLoaderPlugin}  = require('vue-loader') //
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack')

const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const devServer = {
    port: 8088,
    host: '0.0.0.0',
    overlay: {
        errors: true //错误显示在网页中
    },
    hot: true //仅仅改变修改代码
    // historyFallback:{

    // }
    // open:true //是否自动打开浏览器
}

const defaultPluins=[
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"development"'
        }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin({
      template:path.join(__dirname,'template.html')
    })
]
let config
config = merge(baseConfig, {
  entry:path.join(__dirname,'../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',
  module: {
      rules: [{
          test: /\.styl/,
          use: [
              'style-loader',
              'css-loader',
              {
                  loader: 'postcss-loader',
                  options: {
                      sourceMap: true
                  }
              },
              'stylus-loader'
          ]

      }]
  },
  devServer,
  //improt Vue from 'vue'
  resolve:{
    alias:{
      'vue':path.join(__dirname,'../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPluins.concat([
      new webpack.HotModuleReplacementPlugin(), //热加载相关
      // new webpack.NoEmitOnErrorsPlugin() //热加载相关
  ])
})

module.exports = config