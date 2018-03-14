"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET home page.
 */
var express = require("express");
var bodyParser = require("body-parser");
var app = require('./../app');
//var server = app.listen(80);
//var app = express();
//var io = require('socket.io').listen(80);
var sleep = require('sleep');
var user = require('../models/user');
var chart = require('../models/home/chart');
var sync = require('../control/sync');
var cache = require('../control/cache');
var router = express.Router();
var message = '';
var OEE = 0;
var id;
var Quality = 0;
var Availability = 0;
var CycleId = 0;
var name = '';
var fName = '';
var lName = '';
var password = '';
var Cycling = 0;
var Blocked = 0;
var Starved = 0;
var GoodUnits = 0;
var BadUnits = 0;
var WaitingForAux = 0;
var ByPass = 0;
var Downtime = 0;
var clients = {};
//var test;
/*var connection = mysql.createConnection({
    host: 'localhost', //'localhost',
    user: 'root',
    password: 'Zmowafy@IBM',
    port: 3306, //port mysql
    database: 'kpidb'
});

connection.connect();*/
//var path = require("path");
//app.use(express.static(__dirname + '/views'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
var users = [
    { name: "Zeinab", password: "123456" },
    { name: "Mohammed", password: "204050" },
    { name: "balah", password: "102030" }
];
//app.listen(80);
router.get('/', function (req, res) {
    var message = 'Hello';
    res.render('index', { message: message });
});
router.get('/register', function (req, res) {
    var message = '';
    res.render('register', { message: message });
});
router.get('/home2', function (req, res) {
    var message = '';
    res.render('home2');
});
router.get('/login', function (req, res) {
    console.log("Entered GET!!!");
    res.render('login', { message: message });
});
router.post('/login', function (req, res) {
    console.log("Entered Post!!!");
    //message = '';
    name = req.body.name;
    password = req.body.password;
    user.getUser(name, password, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            if (rows.length) {
                res.redirect('/home');
                // res.render('home');
            }
            else {
                message = 'Wrong Credentials';
                res.render('login', { message: message });
            }
        }
    });
});
router.get("/home", function (req, res) {
    // console.log("Hello");
    //var OEE = 45;
    // res.render('home', {OEE: OEE});
    //req.app.use(io);
    console.log("HOME!!!!");
    //var fId;
    id = 0;
    var orig_data = {};
    sync(orig_data, id);
    //await sleep(1000);
    // sleep.sleep(5);
    //console.log(cache.diff);
    //var test = sync(orig_data, id); 
    // console.log("true");
    //  }
    //});
    /*   chart.getQuality(function (err, rows) {
           console.log("Api is called!!!!");
           if (err) {
               console.log(err);
           }
           else {
               console.log("Hii  " + rows.length);
               //orig_data = JSON.stringify(rows[0]);
               let orig_data: myObj = JSON.parse(JSON.stringify(rows[0]));
               id = orig_data.SysDataId;
               CycleId = orig_data.CycleId;
               
               //var test = sync(orig_data, id);
               //fId = orig_data.SysDataId;
              // sync(orig_data, id)
               //var update = ().needUpdate;
             //  var new_data = (sync(orig_data, id)).data;
              // console.log("Update is ", update, new_data);
   
               return orig_data;
   
   
           }
       });*/
    // console.log("db data is", id, CycleId, orig_data);
    /*  io.on('connect', function (socket) {
          clients[socket.id] = socket;
          console.log("Hii      CONNECTION is made!!!!!!!");
          if (id != null) {
              console.log(orig_data);
              socket.emit('completeData', orig_data);
          }
          /* if (update) {
               CycleId = new_data.CycleId;
               socket.emit('completeData', new_data);
           }*/
    //     console.log(id);
    //console.log(orig_data.SysDataId);
    // console.log("test VAR IS" + new_data);
    //    socket.on("disconnect", function () {
    //        delete clients[socket.id];
    //    });
    //  });*/
    // var x = (sync(orig_data, id)).needUpdate;
    // var data = (sync(orig_data, id)).data;
    // CycleId = data.CycleId;
    //this.PageRefresh();
    //location.reload();
    //console.log("Test data is" + x);
    // console.log("Orig Data is" + orig_data);
    // if (x) {
    // if (orig_data == {} || orig_data == null)
    //  {
    /*  io.on('connect', function (socket) {
          clients[socket.id] = socket;
          console.log("Hii      CONNECTION is made!!!!!!!");
          // if (id == orig_data.SysDataId) {
          
          socket.emit('completeData', data);
          //  }
          if (x) {
              socket.emit('dataUpdate', data);
          }
          console.log(id);
          // console.log(orig_data.SysDataId);

          socket.on("disconnect", function () {
              delete clients[socket.id];
          });
      });*/
    //  }
    // }
    ///////////////////////////////////////////////////////The COMMENTED SECTION IS WORKING////////////////////////////////////
    /* chart.getQuality(function (err, rows) {
         console.log("Api is called!!!!");
         if (err) {
             console.log(err);
         }
         else {
             console.log("Hii  "+rows.length);
             //orig_data = JSON.stringify(rows[0]);
             let orig_data: myObj = JSON.parse(JSON.stringify(rows[0]));
             id = orig_data.SysDataId;
             CycleId = orig_data.CycleId;
             var test = sync(orig_data, id);
             //fId = orig_data.SysDataId;
             io.on('connect', function (socket) {
                 clients[socket.id] = socket;
                 console.log("Hii      CONNECTION is made!!!!!!!");
                 if (id == orig_data.SysDataId) {
                     console.log(orig_data);
                     socket.emit('completeData', orig_data);
                 }

                 console.log(id);
                 console.log(orig_data.SysDataId);
                 
                 socket.on("disconnect", function () {
                     delete clients[socket.id];
                 });
             });

             
         }
     });*/
    /////////////////////////////////////////////////////////////////////////////
    console.log(sync);
    //console.log(test);
    //console.log(orig_data);
    console.log("Data is rendering!!");
    res.render('home', { fname: fName, lname: lName });
    console.log("RENDERED!!");
    /*chart.getQuality(function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            if (rows.length) {
                // io.socket.emit('completeData', JSON.stringify(rows[0]));
               // req.socket.emit('completeData', JSON.stringify(rows[0]));
                let obj: myObj = JSON.parse(JSON.stringify(rows[0]));
                OEE = obj.OEE;
                Quality = obj.Quality;
                CycleId = obj.CycleId;
                Availability = obj.Availability;
                id = obj.id;
                //console.log(obj.myst);
                //res.send();
                //fOEE = 1;
                // res.render('home', {OEE: OEE});
                //res.render('home', {OEE1: OEE});
                res.render('home', { fname: fName, lname: lName, Quality: Quality, Availability: Availability });
            }
            else {
                // message = 'Wrong Credentials';
                res.json(rows);
            }
        }
    });*/
    /*chart.getQuality(function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            if (rows.length) {
 
                let obj:myObj = JSON.parse(JSON.stringify(rows[0]));
                Quality = obj.Quality;
                CycleId = obj.CycleId;
              //console.log(obj.myst);
               //res.send();
                fQuality = 1;
              // res.render('home', {OEE: OEE});
               //res.render('home', {OEE1: OEE});
               //res.render('home', {name: name, OEE: OEE, Quality: Quality});
            }
            else {
                // message = 'Wrong Credentials';
                res.json(rows);
            }
        }
    });
 
    chart.getAvailability(function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            if (rows.length) {
 
                let obj:myObj = JSON.parse(JSON.stringify(rows[0]));
                Availability = obj.Availability;
                CycleId = obj.CycleId;
              //console.log(obj.myst);
               //res.send();
                //fQuality = 1;
              // res.render('home', {OEE: OEE});
               //res.render('home', {OEE1: OEE});
               res.render('home', {name: name, OEE: OEE, Quality: Quality, Availability: Availability});
            }
            else {
                // message = 'Wrong Credentials';
                res.json(rows);
            }
        }
    });*/
    // if(fQuality && fOEE){
    //    res.render('home', {OEE: OEE, Quality: Quality});
    //}
});
router.get('/availability', function (req, res) {
    //var message = '';
    chart.getAvailabilityDetails(CycleId, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            if (rows.length) {
                var obj = JSON.parse(JSON.stringify(rows[0]));
                Cycling = obj.Cycling;
                Blocked = obj.Blocked;
                Starved = obj.Starved;
                WaitingForAux = obj.WaitingForAux;
                ByPass = obj.ByPass;
                Downtime = obj.Downtime;
                //res.json(rows);
                //res.send([Cycling, Blocked, Starved, WaitingForAux, ByPass, Downtime]);
                res.render('availability', { name: name, Cycling: Cycling, Blocked: Blocked, Starved: Starved, WaitingForAux: WaitingForAux, ByPass: ByPass, Downtime: Downtime });
            }
            else {
                // message = 'Wrong Credentials';
                res.json(rows);
            }
        }
    });
    //res.render('availability');
});
router.get('/quality', function (req, res) {
    //var message = '';
    chart.getQualityDetails(CycleId, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            if (rows.length) {
                var obj = JSON.parse(JSON.stringify(rows[0]));
                GoodUnits = obj.GoodUnits;
                BadUnits = obj.BadUnits;
                console.log("Zeft is", GoodUnits, BadUnits);
                res.json(rows);
                //res.send([Cycling, Blocked, Starved, WaitingForAux, ByPass, Downtime]);
                //res.render('quality', { name: name, goodUnits: GoodUnits, badUnits: BadUnits });
            }
            else {
                // message = 'Wrong Credentials';
                res.json(rows);
            }
        }
    });
    //res.render('availability');
});
router.get('/speak/:name', function (req, res) {
    var animal = req.params.name;
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!"
    };
    var sound = sounds[animal];
    res.send("The " + animal + " says " + sound);
    //res.render('bye', { title: 'Bye' });
});
router.get('/repeat/:message/:id', function (req, res) {
    var message = req.params.message;
    var count = Number(req.params.id);
    var result = "";
    for (var i = 0; i < count; i++) {
        result += " " + message;
    }
    res.send(result);
    //res.send("MEOW!");
});
router.get('*', function (req, res) {
    res.send("<h1>WHAT ARE YOU DOING WITH YOUR LIFE!!!</h1>");
});
exports.default = router;
//# sourceMappingURL=index.js.map