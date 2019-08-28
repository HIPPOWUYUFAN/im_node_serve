const express = require('express')
const ip = require('./public/variable')
const app = express()
// let fs = require("fs");     // 访问系统文件

// 命令行参数处理，加载全局配置
// const argv = require('yargs').argv
// var configFilePath = './config.json' // 配置文件地址
// var isLocal = false     // 是否本地运行
// if(argv.config){    // 加载配置文件 config.json
//     configFilePath = argv.config
// }
// console.log("Local:",argv.local)
// if(argv.local){     // 加载配置文件
//     isLocal = true
// }
// fs.writeFileSync('./.configFilePath', configFilePath)
// var Config = require(configFilePath);
// let port = Config.parse.port
// let appId = Config.parse.appId
// console.log(port,appId)
// console.log(Config.parse.databaseURI)
// // 加载Parse及设置配置文件
// if(!isLocal){ // 当非本地运营时，正常加载Parse服务
//     var ParseServer = require('parse-server').ParseServer;
//     var api = new ParseServer(Config.parse);

//     // Serve the Parse API on the /parse URL prefix
//     app.use('/parse', api);
// }

/**
 * 配置POST BODY
 */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

/**
 * 跨域全局配置
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Content-Type', "application/json; charset=utf-8");
    next();
};
app.use(allowCrossDomain)

// 加载路由分发
let routes = require('./API/routes')
routes(app)

app.listen(8989,ip, () => console.log("server start success"))


