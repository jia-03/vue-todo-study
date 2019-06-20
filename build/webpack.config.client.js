const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
// const  {VueLoaderPlugin}  = require('vue-loader') //
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack')

const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const devServer = {
    port: 8080,
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
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin()
]
let config

if (isDev) {
    config = merge(baseConfig, {
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
        plugins: defaultPluins.concat([
            new webpack.HotModuleReplacementPlugin(), //热加载相关
            new webpack.NoEmitOnErrorsPlugin() //热加载相关
        ])
    })
} else {
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../client/index.js'),
            vendor: ['vue']
        },
        output: {
            filename: '[name].[chunkhash:8].js'
        },
        module: {
            rules: [  {
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
            },]
        },
        plugins:defaultPluins.concat([
        new ExtractPlugin('styles.[chunkhash:8].css'),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor'
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: 'runtime'
        // })

        ])
    })
}
module.exports = config