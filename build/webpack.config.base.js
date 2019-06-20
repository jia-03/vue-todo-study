const path = require('path')
const createVueLoaderOptions= require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    mode: 'production',   //暂时指定为生产环境
    entry: path.join(__dirname, '../client/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.(vue|js|jsx)$/,
                loader:'eslint-loader',
                exclude:/node_modules/,
                enforce:'pre'  //预处理
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options:createVueLoaderOptions(isDev)
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude:/node_modules/
            },

            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: 'resources/[path][name].[hash:8].[ext]' //ext 原本的后缀名
                        }
                    }
                ]
            }
        ]
    },
}

module.exports = config