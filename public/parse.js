// Parse
let Parse = require('parse/node');
Parse.initialize('hippo'); // 数据库名字 (括号中是数据库名)
Parse.serverURL = 'http://localhost:1337/parse'


module.exports = Parse;
