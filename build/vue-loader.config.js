// const docsLoader = require.resolve('./doc-loader')

module.exports=(isDev)=>{
    return{
        preserveWhitepace:true, //代码空格处理
        extractCss: !isDev,//是否将VUE文件中的CSS 集中打包到一起，VUE方面是异步加载打包
        // cssModules:{
        //     localIdentName:'[path]-[name]-[hash:base64:5]',
        //     camelCase:true
        // },
        // posstcss:{}
        // hotReload:false,//根据环境变量生成
        // loaders:{
        //     'docs':docsLoader,
        //     // js  html 
        // },
        // preLoader:{
        //     // js:
        // },
        // postLoader
    }
}