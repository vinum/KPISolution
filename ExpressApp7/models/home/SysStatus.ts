var db = require('../../db');
//db.connect();
var SysStatus = {


    getProdTime: function (callback) {
        return db.query("SELECT TimeInProd, StatusLibId FROM stationstatus ORDER BY RAND() LIMIT 1", callback);
    },

    getMode: function (SLibId, callback) {
        return db.query("SELECT Status FROM statuslib WHERE StatusLibId=? LIMIT 1", [SLibId], callback)
    },

    
    /*addUser: function (user, callback) {
        return db.query("INSERT INTO user VALUES(?,?,?,?)", [user.email, user.username, user.password, user.accesslevel], callback);
    }*/
};
module.exports = SysStatus;
