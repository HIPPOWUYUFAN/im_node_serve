'use strict';
var mysql = require('mysql');  // node mysql库

var fs = require("fs");     // 访问系统文件
//  读取config 
var configFilePath = fs.readFileSync('./.configFilePath', 'utf8');
var config = JSON.parse(configFilePath).mysql
console.log(config)
module.exports = {
    pool: null,

    /**
     * 创建连接池
     */
    createConn: function () {
        if (!this.pool) {
            this.pool = mysql.createPool(config);
        }
    },

    /**
     * 执行连接
     */
    execute: function (config) {
        this.createConn();
        this.pool.getConnection((err, conn) => {
            if (err) {
                console.log('mysql pool getConnections err:' + err);
                throw err;
            } else {
                conn.query(config.sql, config.params, (err, result) => {
                    if (config.success) {
                        config.success(result);
                    }
                    if (config.error) {
                        config.error(err)
                    }
                    // 释放连接到连接池
                    conn.release();
                });
            }

        })
    },


    

    exec: function (config) {
        return new Promise((resolve, reject) => {
            this.execute({
                sql: config.sql,
                params: config.params || null,
                success: (res) => {
                    resolve(res)
                },
                error: (err) => {
                    reject(err)
                }
            })
        })
    }

}