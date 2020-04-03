'use strict'
var router = require('express').Router();
var mysql = require('mysql')
var resp = require('../../public/response');
var connection = require('../../public/connection')




router.get('/select', (req, res) => {
    connection.exec({
        sql: `SELECT * FROM im_user`,
        params: null,
    }).then((data) => {
        res.json(resp.success(data))
    })
})









module.exports = router;