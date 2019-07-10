'use strict'

let router = require('express').Router();
let Parse = require('../../public/parse');
let response = require('../../public/response');


router.get('/s',(rep,res)=>{
    res.send('111')
})


module.exports = router