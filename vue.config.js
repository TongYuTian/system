module.exports = {
    devServer : {
        port : 8888,
        host : "localhost",
        https : false ,
        open : true,
        proxy:{
            //匹配/dev-api开头的请求
            [process.env.VUE_APP_BASE_API]:{
                //目标服务器，代理访问到https://localhost:8080
                target:process.env.VUE_APP_SERVICE_URL,
                // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，
                // 并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                changOrigin:true,//开启代理
                pathRewrite:{
                    // 会将 /dev-api 替换为 '',也就是 /dev-api 会移除，
                    // 如 /dev-api/db.json 代理到 https://localhost:8080/db.json
                    // '^/dev-api':"",
                    ["^" + process.env.VUE_APP_BASE_API]:""
                }
            }
        }
    },
    lintOnSave : false ,
    productionSourceMap : true
}