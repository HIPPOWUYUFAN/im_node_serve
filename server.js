const express = require('express')
const app = express()


var cluster = require('cluster');
var http = require('http');
var os = require('os');

var numCPUs = os.cpus().length;

// 加载路由分发
let routes = require('./request/routes')
routes(app)


app.listen(513, () => console.log("server start"))


