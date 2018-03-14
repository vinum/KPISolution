"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cache = require('./cache');
var chart_1 = require("./models/home/chart");
module.exports = function dataSync(orig_data, id) {
    // interface new_data;
    var diff;
    console.log("THIS IS SYNC FUNC!!");
    console.log(cache);
    chart_1.default.getSyncId(id, function (err, rows) {
        console.log("Inside getsyncid");
        if (err) {
            console.log('Query failed', err);
        }
        else {
            console.log("getsyncid not failed");
            console.log(rows);
            if (rows.length > 0) {
                // chart.getQuality(function (err, rows) {
                console.log("INSIDE API OF SYNC!");
                //   if (err) {
                //     console.log(err);
                //}
                //else {
                console.log(JSON.stringify(rows[0]));
                // var new_data = JSON.stringify(rows[0]);
                var new_data = JSON.parse(JSON.stringify(rows[0]));
                console.log("NEW DATA IS" + new_data);
                //}
                //});
                diff = cache(orig_data, new_data);
                console.log(diff);
                /* if (diff.needUpdate) {
                     pushUpdate(diff.data);
                 }*/
            }
        }
    });
    /*var queryString = mysql.format("select `time`,value,updateTime from `KPI` where network='vzwca' and " +
        "`kpi`='xxx' and updateTime > ? order by `time` desc limit 50", lastUpdate);
    conn.query(queryString, function (err, rows, fields) {
        if (err) {
            console.log('Query [' + queryString + '] failed: ', err);
        } else {
            debug('query success. rows: ', rows.length);
            if (rows && rows.length >= 0) {
                var new_data = {};
                for (var i = 0; i < rows.length; i++) {
                    var row = {};
                    var row_key = 'time';
                    for (var field in rows[i]) {
                        var value = rows[i][field];
                        if (value instanceof Date) {
                            value = value.getTime();
                        }
                        if (field === 'updateTime') {
                            if (rows[i][field] > lastUpdate) {
                                lastUpdate = rows[i][field];
                            }
                        } else if (field === row_key) {
                            row_key = value;
                        } else {
                            row[field] = value;
                        }
                    }
                    new_data[row_key] = row;
                }
                var diff = mergediff(orig_data, new_data);
                if (diff.needUpdate) {
                    pushUpdate(diff.data);
                }
            }
        }
        setTimeout(function () { dataSync(conn, orig_data, lastUpdate); }, 1000);
    });*/
    return diff;
};
/*function pushUpdate(new_data) {
    io.sockets.emit('dataUpdate', new_data);
}*/
//# sourceMappingURL=sync.js.map