var dataStore = require('./datastore');

//var socket = io.connect('http://localhost:5000', {reconnect: true});
const io = require("socket.io-client");
const socket = io('http://localhost:5000');
// Add a connect listener
socket.connect()

/*socket.on('connect', function (socket) {
    console.log('Connected!');
    //this.emit('CH01', 'me', 'test msg');
});

socket.on('disconnect', function (socket) {
    console.log('disconnected!');
    //this.emit('CH01', 'me', 'test msg');
});

socket.io.on("hello", (arg) => {
   console.log(arg);
   this.emit('CH01', 'me', 'test msg');
});*/

module.exports = socket
