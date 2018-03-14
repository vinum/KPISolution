var db = require('../../db');
//db.connect();
var SysStatus = {
    getProdTime: function (callback) {
        return db.query("SELECT TimeInProd, StatusLibId FROM stationstatus ORDER BY RAND() LIMIT 1", callback);
    },
    getMode: function (SLibId, callback) {
        return db.query("SELECT Status FROM statuslib WHERE StatusLibId=? LIMIT 1", [SLibId], callback);
    },
};
module.exports = SysStatus;
//# sourceMappingURL=SysStatus.js.map