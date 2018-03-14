var db = require('../db');
//db.connect();
var user = {
    getAllUsers: function (callback) {
        return db.query("SELECT * FROM user", callback);
    },

    getUser: function (name, password, callback) {
        return db.query("SELECT UserId, FName, LName, AccessLevel_AccessId FROM user WHERE Username ='" + name + "' AND Password ='" + password + "'", callback);
    },

    addUser: function (user, callback) {
        return db.query("INSERT INTO user VALUES(?,?,?,?,?,?)", [user.email, user.fname, user.lname, user.username, user.password, user.accesslevel], callback);
    }
};

module.exports = user;