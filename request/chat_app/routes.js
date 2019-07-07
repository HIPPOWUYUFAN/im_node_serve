let router = require('express').Router();
let request = require('request');
let https = require('https');
let Parse = require('../../public/parse');



router.post('/login', (rep, res) => {
    res.send('11')
    // new Parse.Query("chat_userInfo").equalTo('username','17707003673').first().then(data => {
    //     console.log(data)
    //     res.send(data)
    // })
})



module.exports = router;