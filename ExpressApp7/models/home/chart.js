var db = require('../../db');
//db.connect();
var chart = {
    getQuality: function (callback) {
        return db.query("SELECT OEE, Quality, Availability, Performance, ProdRate, ProdCount, ActCycleTime, CycleId, SysDataId FROM systemdata ORDER BY RAND() LIMIT 1", callback);
    },
    getSysData: function (callback) {
        return db.query("SELECT OEE, Quality, Availability, Performance, ProdRate, ProdCount, ActCycleTime, CycleId, SysDataId FROM systemdata ORDER BY SysDataId DESC LIMIT 1", callback);
    },
    /* getAvailability: function (callback) {
         return db.query("SELECT Availability, CycleId FROM dashboard ORDER BY RAND() LIMIT 1", callback);
     },*/
    getAvailabilityDetails: function (CycleId, callback) {
        return db.query("SELECT CycleId, Cycling, Blocked, Starved, WaitingForAux, ByPass, Downtime FROM systemdata WHERE CycleId=? LIMIT 1", [CycleId], callback);
    },
    getQualityDetails: function (CycleId, callback) {
        return db.query("SELECT CycleId, GoodUnits, BadUnits FROM systemdata WHERE CycleId=? LIMIT 1", [CycleId], callback);
    },
    getSyncId: function (id, callback) {
        return db.query("SELECT OEE, Quality, Availability, Performance, ProdRate, ProdCount, ActCycleTime, CycleId, SysDataId FROM systemdata WHERE SysDataId > ?  ORDER BY SysDataId DESC LIMIT 1", [id], callback);
    },
    /*addUser: function (user, callback) {
        return db.query("INSERT INTO user VALUES(?,?,?,?)", [user.email, user.username, user.password, user.accesslevel], callback);
    }*/
    getProdTime: function (callback) {
        return db.query("SELECT TimeInProd, stationstatus.StatusLibId, Status FROM stationstatus, statuslib WHERE statuslib.StatusLibId = stationstatus.StatusLibId ORDER BY RAND() LIMIT 1", callback);
    },
    getMode: function (SLibId, callback) {
        return db.query("SELECT Status FROM statuslib WHERE StatusLibId=? LIMIT 1", [SLibId], callback);
    },
};
module.exports = chart;
//# sourceMappingURL=chart.js.map