const express = require('express')
const app = express()


// 命令行参数处理，加载全局配置
const argv = require('yargs').argv
if (argv.config) {    // 加载配置文件 config.json
    configFilePath = argv.config
}
console.log(configFilePath)

var Config = require(configFilePath);

let fs = require("fs");     // 访问系统文件
fs.writeFileSync('./.configFilePath',JSON.stringify(Config))


//设置cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// 配置post body
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())


//跨域全局配置
const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Content-Type', "application/json; charset=utf-8");
    next();
};
app.use(allowCrossDomain)

// 加载路由分发（公用接口）
let routes = require('./service/routes')
routes(app)

app.listen(8989, () => console.log("---------------------服务启动成功---------------------"))


