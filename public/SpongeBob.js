let Parse = require('./parse')

class QY {
    constructor(dataTable) {
        return new Parse.Query(dataTable)
    }
}
class OT {
    constructor(dataTable) {
        return new (Parse.Object.extend(dataTable))
    }
}

// new Parse.Query("User")
module.exports = {
    user: new QY('User'),
    new_user: new OT('User'),

    userInfo: new QY('chat_userInfo'),
    new_userInfo: new OT('chat_userInfo'),
}