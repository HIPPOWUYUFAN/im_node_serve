module.exports = function (app) {
    let chat_app = require('./chat_app/routes');
    app.use('/chat_app/routes', chat_app);
}