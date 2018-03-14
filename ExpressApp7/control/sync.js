"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cache = require('./cache');
var chart = require('../models/home/chart');
var io = require('socket.io').listen(80);
var diff;
var sStatus;
var clients = {};
var new_data;
var time_data;
var ProdTime;
//var new_data = {};
module.exports = function dataSync(orig_data, id) {
    // var diff = function (orig_data, id) { 
    var socket = false;
    console.log("THIS IS SYNC FUNC!!");
    console.log(cache);
    chart.getSyncId(id, function (err, rows) {
        console.log("Inside getsyncid");
        if (err) {
            console.log('Query failed', err);
        }
        else {
            console.log("getsyncid not failed");
            console.log(rows);
            if (rows.length > 0) {
                console.log("INSIDE API OF SYNC!");
                console.log(JSON.stringify(rows[0]));
                new_data = JSON.parse(JSON.stringify(rows[0]));
                console.log("NEW DATA IS" + new_data);
                diff = cache(orig_data, new_data);
                if (diff.needUpdate && !socket) {
                    console.log("Inside Update!");
                    io.sockets.emit('dataUpdate', diff.data);
                }
                console.log(diff);
            }
        }
        //setTimeout(function () { dataSync(orig_data, id); }, 1000);
    });
    chart.getProdTime(function (err, rows) {
        if (err) {
            console.log('Query failed', err);
        }
        else {
            if (rows.length > 0) {
                time_data = JSON.parse(JSON.stringify(rows[0]));
                console.log("TIMESSS", ProdTime);
                // if (ProdTime == null)
                //  {
                // }
                if ((ProdTime != null && ProdTime != time_data.TimeInProd) || (sStatus != null && sStatus != time_data.Status)) {
                    ProdTime = time_data.TimeInProd;
                    sStatus = time_data.Status;
                    console.log("Inside Time & Mode Update!");
                    io.sockets.emit('timeUpdate', time_data);
                }
                else {
                    ProdTime = time_data.TimeInProd;
                    sStatus = time_data.Status;
                }
                console.log("Prod TIME IS " + time_data.TimeInProd, time_data.Status);
            }
        }
    });
    io.on('connect', function (socket) {
        clients[socket.id] = socket;
        console.log("Hii     CONNECTION is made!!!!!!!" + clients[socket.id]);
        if (new_data.SysDataId != null) {
            console.log(orig_data);
            socket.emit('completeData', new_data, time_data);
            socket = true;
        }
        console.log(id);
    });
    socket = false;
    io.on('disconnect', function (socket) {
        console.log("DISCONNET!!!!!" + clients[socket.id]);
        delete clients[socket.id];
    });
    setTimeout(function () { dataSync(orig_data, id); }, 1000);
};
//# sourceMappingURL=sync.js.map