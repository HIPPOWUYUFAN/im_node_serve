'use strict'

let router = require('express').Router();
let Parse = require('../../public/parse');
let response = require('../../public/response');
const ws = require("nodejs-websocket")

/**
 * 储存数据到数据库
 */
let layMessages = (body) => {
    let new_messages = new (Parse.Object.extend('chat_messages'))
    let param = {
        send_user: {
            "__type": "Pointer",
            "className": "chat_userInfo",
            "objectId": body.send_user
        },
        receive_user: {
            "__type": "Pointer",
            "className": "chat_userInfo",
            "objectId": body.receive_user
        },
        content: body.content
    }

    return new_messages.set(param)
        .save()
        .then(data => {
            if (data) {
                return data
            } else {
                return false
            }
        })

}




var user = {};
var content = {}
var server = ws.createServer((conn) => {
    let id = conn.path.substr(1, conn.path.length - 1)
    user[id] = conn
    // if (!content[id]) {
    //     content[id] = []
    // } else {
    //     if (content[id].length) {
    //         user[id].sendText(content[id])
    //     }
    // }
    console.log(user);
    conn.on('text', (req) => {
        let param = JSON.parse(req)
        layMessages(param).then(data => {
            if (data) {
                console.log(data)
                console.log(param.send_user)
                console.log(user[param.send_user])
                if (user[param.receive_user]) {
                    user[param.receive_user].sendText(data)
                } else {
                    content[param.receive_user].push(data)
                }
            } else {
                user[param.send_user] ? user[param.send_user].sendText(response.fail('数据库储存失败')) : null
            }
        })
    })

    conn.on("close", function (code, reason) {
        user[id] = null
        console.log("关闭连接",user);
    })
    conn.on("error", function (code, reason) {
        user[id] = null
        console.log("异常关闭",user);
    });
});
server.listen(8082, () => { console.log("websocket连接完毕") })

module.exports = router