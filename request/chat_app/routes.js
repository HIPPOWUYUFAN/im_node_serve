let router = require('express').Router();
// let request = require('request');
// let https = require('https');
let Parse = require('../../public/parse');
let response = require('../../public/response');

let json = (e) => {
    return JSON.stringify(e)
}


/**
 * Parse数据表变量  / MONGODB
 */
let user = new Parse.Query("User")
let new_user = new (Parse.Object.extend('User'))
let userInfo = new Parse.Query('chat_userInfo')
let new_userInfo = new (Parse.Object.extend('chat_userInfo'))





/**
 * 注册
 */
router.post('/register', (rep, res) => {
    let body = rep.body
    user.equalTo('username', body.username)
    user.first().then(data => {
        if (data) {
            res.send(response.fail(null, '该手机号码已被注册'))
            return
        } else {
            new_user.save({
                username: body.username,
                password: body.password,
                mobile: body.mobile
            }).then(data => {
                if (data) {
                    new_user.id = data.id
                    body.User = new_user
                    new_userInfo.save(body).then(data => {
                        if (data) {
                            res.send(response.success(null, '注册成功'))
                        }
                    })
                }
            })
        }
    })
})

/**
 * 登陆
 */
router.post('/login', (rep, res) => {
    userInfo.equalTo('username', rep.body.username)
    userInfo.first().then(data => {
        if (!data) {
            res.send(response.fail(null, '用户名不存在'))
        } else {
            login(rep.body,res)
        }
    })
})

let login = (param,res) => {
    Parse.User.logIn(param.username, param.password).then(data => {
        if (data) {
            res.send(response.success(data, '登陆成功'))
        }
    })
}



module.exports = router;