const Router = require('koa-router')
const axios = require('axios')
const MemoryFs = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFs()
serverCompiler.outputFileSystem=mfs

let bundle

serverCompiler.watch({},(err,stats)=>{
  if(err) throw err
  stats = stats.toJson()
  stats.erros.forEach(err=>{console.log(err)})
  stats.hasErrors.forEach(warn=>{console.warn(err)})
})