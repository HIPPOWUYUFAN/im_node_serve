let router = require('express').Router();
let request = require('request');
let https = require('https');
let Parse = require('../../public/parse');


// router.all('*', (rep, res) => {
//     res.send('111')
// })
router.get('/test', (rep, res) => {
    new Parse.Query("chat_userInfo").find().then(data => {
        res.send(data)
    })
})



module.exports = router;