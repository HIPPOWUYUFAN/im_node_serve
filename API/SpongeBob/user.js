let router = require('express').Router();
// let request = require('request');
// let https = require('https');
let Parse = require('../../public/parse');
let response = require('../../public/response');

let json = (e) => (JSON.stringify(e))




/**
 * 注册
 */
router.post('/register', (rep, res) => {
    let user = new Parse.Query("User")
    let new_user = new (Parse.Object.extend('User'))
    let new_userInfo = new (Parse.Object.extend('chat_userInfo'))

    let body = rep.body
    user.equalTo('username', body.username)
        .count()
        .then(data => {
            console.log(data)
            if (data) {
                res.send(response.fail(null, '该手机号码已被注册'))
                return
            } else {
                new_user.set(
                    {
                        username: body.username,
                        password: body.password,
                        mobile: body.mobile
                    }
                )
                    .save()
                    .then(data => {
                        if (data) {
                            new_user.id = data.id
                            body.user = new_user
                            new_userInfo.set(body)
                                .save()
                                .then(data => {
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
    let userInfo = new Parse.Query('chat_userInfo')
    let body = rep.body
    userInfo.equalTo('username', body.username)
        .first()
        .then(data => {
            if (!data) {
                res.send(response.fail(null, '用户名不存在'))
            } else {
                if (data.get('password') == body.password) {
                    login(body, res)
                } else {
                    res.send(response.fail(null, '密码错误'))
                }
            }
        })
})

let login = (param, res) => {
    console.log(param)
    Parse.User.logIn(param.username, param.password)
        .then(data => {
            console.log(data)
            if (data) {
                res.send(response.success(data, '登陆成功'))
            } else {
                res.send(response.fail(null, '用户名或密码错误'))
            }
        })
}



module.exports = router;