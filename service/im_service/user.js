'use strict'
let router = require('express').Router();
let mysql = require('mysql')
let response = require('../../public/response');

let fs = require("fs");     // 访问系统文件
//  读取config mysql数据库配置
let configFilePath = fs.readFileSync('./.configFilePath', 'utf8');
console.log(configFilePath)

// var dbConfig = require('../../config/DBConfig');

// var querySql = require('querysql');

//使用DBConfig中配置信息创建一个MySQL连接池

// var pool = mysql.createPool( dbConfig.mysql );
let json = (e) => (JSON.stringify(e))



/**
 * 注册
 */
router.post('/register', (rep, res) => {
    
})








module.exports = router;