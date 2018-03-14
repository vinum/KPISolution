import debug = require('debug');
import express = require('express');
import path = require('path');
import mysql = require('mysql');
import bodyParser = require("body-parser");
import session = require('express-session');
//import connect = require('connect');
//var app = require('http').server();
//var socket_io = require('socket.io');
var app = express();


//var io = socket_io();
//app.io = io;


import routes from './routes/index';
//var routes = require('./routes/index')(app, io);
//var routes = require('./routes/index');
//import routes from './routes/bye';
import users from './routes/user';
//const io = socketio(app);
//var app = express();
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var chart = require('./models/home/chart');
//var connection = require('express-myconnection'); 

//app.use(bodyParser.urlencoded({ extended: true }));


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
//-----------------------------Instantiate Session Module using session-express-------------------------------------//
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

/*-----------------------SQL Connection-------------------------------------*/
/*var connection = mysql.createConnection({
        host: 'localhost', //'localhost',
        user: 'root',
        password: 'Zmowafy@IBM',
        port: 3306, //port mysql
        database: 'kpidb'
});

connection.connect();*/


app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.urlencoded());



app.use('/', routes);
//app.use(routes);
//app.use('/bye', routes);
app.use('/users', users);



//app.get('/', route.index);//call for main index page
//app.get('/login', routes.index);//call for login page
//app.get('/signup', user.signup)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});

/*function pushUpdate(new_data) {
    io.sockets.emit('dataUpdate', new_data);
}*/


// error handlers





//require('./routes/index')(app, io); 
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err: any, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/*app.use(

    connection(mysql, {

        host: 'localhost', //'localhost',
        user: 'root',
        password: 'Zmowafy@IBM',
        port: 3306, //port mysql
        database: 'kpidb'
    }, 'pool') //or single

);*/

// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

//var io = require('socket.io').listen(80);
//app.listen(80);

