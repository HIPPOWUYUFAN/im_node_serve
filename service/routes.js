module.exports = function (app) {
    /**
     * 路由分发 搭建服务
     */
    let user = require('./im_service/user');
    app.use('/im_service/user', user);

    let ws = require('./im_service/ws');
    app.use('/im_service/ws', ws);
}