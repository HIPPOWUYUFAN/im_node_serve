var router = require('express').Router();
const http = require("http").createServer(router)
var io = require('socket.io')(http);
// var _ = require('underscore');
//跨域全局配置
const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Content-Type', "application/json; charset=utf-8");
    next();
};
io.use(allowCrossDomain)
const userList = {};  // 已上线人列表
let userCount = 0;      // 已上线人数
const id = {}
io.on("connection", socket => {

    socket.on("login", data => {
        console.log(`${JSON.stringify(data)} 登录`);
        if (!userList[data.user_id]) {
            socket.uid = data.user_id
            userList[data.user_id] = data.user_name
            id[data.user_id] = socket.id
            userCount++
            // 返回给除了自己之外的所有人通知我已上线
            console.log(userList)
            socket.broadcast.emit('getUsers', {
                userCount,
                userList,
                add: { name: data.user_name, uid: data.user_id }
            })

            // 返回给自己 所有在线的用户
            socket.emit("getUserList", {
                userCount,
                userList,
            })
        }

        // 发给自己
        // socket.emit("receive_message", messageList)
    })

    socket.on("disconnect", function () {
        if (!socket.uid) return
        // const user = {
        //     uid: socket.uid,
        //     username: userList[socket.uid]
        // }
        // console.log(user)
        // userCount--
        // // 发送给所有用户 使用 io.emit  
        // // 发送给自己 使用 socket.emit
        // io.emit('getUsers', {
        //     userCount,
        //     userList
        // })

        const name = userList[socket.uid]
        delete userList[socket.uid]
        delete id[socket.uid]
        userCount--
        // 返回给所有人聊天列表
        io.emit('getUsers', {
            userCount,
            userList,
            del: { name: name, uid: socket.uid }
        })
        console.log(`${name} 已下线`);
    })


    socket.on("sendMessage", data => {
        if (!data) return
        // console.log(`发送信息 -- ${data}`);
        console.log(data)
        // 发送给除了自己以外的其他所有用户
        // socket.broadcast.emit("receive_message", messageList)

        // 向指定的人发送
        socket.to(id[data.receiverId]).emit('getMessage',data)
    })
})

http.listen(8900, (e) => {
    console.log(e, '----------ws start--------------------');
})

module.exports = router;
