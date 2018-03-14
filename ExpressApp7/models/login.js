var db = require('../db');
var user = {
    getUser: function (username, password, callback) {
        return db.query("SELECT UserId, Name, AcceccId FROM user WHERE Name=? AND Password=?", [username], [password], callback);
    },
    addUser: function (user, callback) {
        return db.query("INSERT INTO user VALUES(?,?,?,?)", [user.email, user.username, user.password, user.accesslevel], callback);
    }
};
module.exports = user;
//# sourceMappingURL=login.js.map