module.exports = function (app) {
    let chat = require('./chat_app/routes');
    app.use('/chat_app/routes', chat);
}