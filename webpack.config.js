const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
// const  {VueLoaderPlugin}  = require('vue-loader') //
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack')

const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    mode: 'production',   //暂时指定为生产环境
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },

            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 2048,
                            name: '[name]-aaa.[ext]' //ext 原本的后缀名
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new VueLoaderPlugin(),
        new HTMLPlugin()
    ],
}

if (isDev) {
    config.module.rules.push({
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

    })
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true //错误显示在网页中
        },
        hot: true //仅仅改变修改代码
        // historyFallback:{

        // }
        // open:true //是否自动打开浏览器
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(), //热加载相关
        new webpack.NoEmitOnErrorsPlugin()  //热加载相关
    )
} else {
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue']
    }
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push(
        {
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
        },
    )
    config.plugins.push(
        new ExtractPlugin('styles.[chunkhash:8].css'),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor'
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: 'runtime'
        // })
    )
}
module.exports = config