'use strict'
var router = require('express').Router();
var mysql = require('mysql')
var msg = require('../../public/response');
var connection = require('../../public/connection')
var dayjs = require('dayjs')



// 注册
console.log(dayjs().format())
const register = (res) => {
    return connection.exec({
        sql: `SELECT count(*) FROM im_user WHERE user_name=${res.username}`,
    }).then(r => {
        console.log(r)
        if (r&&r['count(*)']) {
            return msg.fail(null, '用户名已被注册')
        } else {
            return connection.exec({
                sql: `INSERT INTO im_user(user_name,pass_word,phone_number) VALUES ('${res.username}','${res.password}',${res.phone})`,
            }).then(e => {
                if(e&&e.affectedRows){
                    return msg.success({user_id:e.insertId}, '注册成功')
                }else{
                    return msg.success(e, '注册失败')
                }
            })
        }
    })
}
// 登录
const login = (res) => {
    console.log(res)
    return connection.exec({
        sql: `SELECT user_id,user_name,pass_word FROM im_user WHERE user_name='${res.username}'`,
    }).then(r => {
        console.log(r)
        if (r && r.length) {
            if (r[0].pass_word == res.password) {
                return login_time(r[0].user_id).then(e => {
                    console.log(e)
                    return e.status ? msg.success({ user_id:r[0].user_id,logined: e.data }, '登录成功') : msg.fail(null, e.data)
                })
            } else {
                return msg.fail(null, '密码错误')
            }
        } else {
            return msg.fail(null, '用户名不存在')
        }
    })
}

// 修改登录时间
const login_time = (id) => {
    console.log(id)
    let logined = dayjs().format()
    return connection.exec({
        sql: `UPDATE im_user SET logined_time='${logined}' WHERE user_id=${id}`,
    }).then(r => {
        if (r && r.changedRows) {
            return {
                data: logined,
                status: true
            }
        } else {
            return {
                data: r,
                status: true
            }
        }
    }).catch(r => {
        return {
            data: r,
            status: false
        }
    })
}


// (function () {
//     register({ username: '123', password: '321',phone:'2131231' })
// })()
router.post('/login', (req, res) => {
    console.log(req.body)
    if (req.body) {
        login(req.body).then(r => {
            console.log(r)
            res.json(r)
        })
    }
})



router.post('/register', (req, res) => {
    if (req.body!={}) {
        console.log(req.body)
        register(req.body).then(r => {
            console.log(r)
            res.json(r)
        })
    }
})










module.exports = router;