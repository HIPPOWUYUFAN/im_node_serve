'use strict'
var router = require('express').Router();
var mysql = require('mysql')
var resp = require('../../public/response');
var connection = require('../../public/connection')


// connection.exec({
//     sql: `SELECT * FROM im_user`,
//     params: null,
// }).then((data) => {
//     console.log(data)
//     console.log(1)
//     // res.json(resp.success(data))
// })
router.get('/select', (req, res) => {
    connection.exec({
        sql: `SELECT * FROM im_user`,
        params: null,
    }).then((data) => {
        if(data){
            res.json(data)
        }
    })
})










module.exports = router;