var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var io = require('socket.io-client');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dataStore = require('./datastore');
var iotGateway = require('./iotgateway');
var cors = require('cors');
var app = express();
var httpServer = require("http").createServer(app);
var socket = require("socket.io")(httpServer);
const fileUpload = require('express-fileupload');



const port = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



socket.on("connection", socket => { 
    console.log("connected");
    socket.on("hello",(data,res) =>{
    console.log(res);
    socket.emit("test","100");
    });
    
    socket.on("start-video",(data,res) => {
        socket.emit("new-client", socket.id, () => {
            console.log("New Consumer has joined " + data + " stream");
        });
    });
    
    socket.on("iiot-video-feed",(data) => {
        socket.broadcast.emit("video-feed",data);
    });    
});


//module.exports = app;
httpServer.listen(port)
