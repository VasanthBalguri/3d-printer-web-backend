var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var io = require('socket.io-client');
//var passport = require('passport');
var cors = require('cors');
var app = express();
var httpServer = require("http").createServer(app);
var axios = require('axios);
var socket = require("socket.io")(httpServer);
var fileUpload = require('express-fileupload');
var {User, Person, Task, Machine, IdStore} = require('./datastore.js');

const port = 3000;
const auxilaryUrl = 'http://localhost:5000';
var taskQueue = [];
var iiotEndpoints = Map();
var machineRooms = Map();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));*/

// Configure Middleware
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(passport.initialize());
//app.use(passport.session());

// Passport Local Strategy
/*passport.use(new LocalStrategy(
  // function of username, password, done(callback)
  function(username, password, done) {
    // look for the user data
    User.findOne({ username: username }, function (err, user) {
      // if there is an error
      if (err) { return done(err); }
      // if user doesn't exist
      if (!user) { return done(null, false, { message: 'User not found.' }); }
      // if the password isn't correct
      if (!(user.password == password)) { return done(null, false, {   
      message: 'Invalid password.' }); }
      // if the user is properly authenticated
      return done(null, user);
    });
  }
));*/

// To use with sessions
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

//Client -> server
/*app.get('/', connectEnsureLogin.ensureLoggedIn({redirectTo:"/login"}), function(req, res, next) {
    console.log(req.user);
    res.render('index', { title: 'Printer App' });
});*/

/*app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),  function(req, res) {
	console.log(req.user)
    Person.findOne({"username":req.user},"admin", function(err,preson){
    if (err){
        console.log(err);
        res.send({error:err});
    }
    else
    {
        console.log("Login successful for user" + req.user);
       res.send({"login":"true","admin":person.admin});
    }
    });
	
});*/
app.get('/', function(req, res, next) {
    console.log(req.user);
    res.render('index', { title: 'Printer App' });
});

app.post('/login',  function(req, res) {
	console.log(req.user)
    if(req.user == "admin"){
    res.send({login:true,admin:true});
        
    }
    else{
    res.send({login:true,admin:false});
        
    }
	
});

/*
 * req body
 * {
 * name:"",
 * type:"",
 * material:"",
 * infill:0,
 * stlFile:{}
 * }
 * task in db
 * {
 * id:"",
 * name:"",
 * type:"",
 * material:"",
 * infill:0.
 * status:"",
 * stlFileURI:"",
 * }
 * dynamic data
 * {
 * progress:0
 * }
 */
app.post('/addTask',function(req,res,next){
    
    //var task = new Task(req.body)
    var requestBody = req.body;
    var id;
    IdStore.FindOne({
        if(err){
        
            console.log(err);
            
        }
    });
    var task = new Task({ id: 
    }
    requestBody.id = 
    task.save(function(err,data) {
        if(err){
            console.log(err);
            res.send({"error":err});
        }
        
        else{
            console.log("successlully initiated task" + task.id);
            res.send({info:"successlully initiated task" + task.id});
            
        }
        
    });
    
});

/*response body
 * [{
 * id:""
 * name:""
 * status:""
 * }]
 */
app.get('/tasks',function(req,res,next){
    Task.find({},"id name",function(err,tasks){
        if(err){
            console.log(err);
            res.send({error:err});
        }
        else{
            console.log("found tasks");
            res.send(tasks);
        }
        
    });
});

/*
 *{
 * id:"",
 * name:"",
 * type:"",
 * material:"",
 * infill:0.
 * status:"",
 * progress:0
 * }
 */
app.get('/task/:taskId',function(req,res,next){
        Task.findOne({id:taskId},function(err,task){
        if(err){
            console.log(err);
            res.send({error:err});
        }
        else{
            console.log("found task");
            res.send(task);
        }
            
        });
});

/*
 * request body
 * {
 * id:""
 * action:""
 * }
 * 
 */
app.post("/task/:taskId",function(req,res,next){
    Task.findOne({id:taskId},function(err,task){
        if(err){
            console.log(err);
            res.send({error:err});
        }
        else{
            if(req.data.approved)
            {
                taskQueue.append(task.id);
                console.log("added task in taskqueue" + task.id);
                res.send({info:"added task in taskqueue" + task.id);
            }
        }
            
        });
});

app.get('/taskQueue',function(req,res,next){
   //not used for now
    
});

/*
 * req body
 * {
 * name:"",
 * type:"",
 * material:"",
 * url:"",
 * }
 * machine in db
 * {
 * id:"",
 * name:"",
 * type:"",
 * material:"",
 * status:"",
 * }
 * dynamic data
 * {
 * temprature:0
 * }
 */
app.post('/addMachine',function(req,res,next){
    var machine = new Machine(req.body)
    task.save(function(err,data) {
        if(err){
            console.log(err);
            res.send({error:err});
        }
        else{
            console.log("successfully added machine" + machine.id);
            res.send({info:"successfully added machine" + machine.id});
        }
        
    });
});

/*
 * response body
 * [{
 * id:"",
 * name:"",
 * }]
 */
app.get('/machines', function(req,res) =>{
    Machine.find({},"id name",function(err,machines){
        if(err){
            console.log(err);
            res.send({error:err}); 
        }
        else{
            console.log("found machines");
            res.send(machines);
        }
        
    });
    
});
/*
 * {
 * id:"",
 * name:"",
 * type:"",
 * material:"",
 * status:"",
 * temprature:0
 * }
 * 
 */
app.get('/machine/:machineId', function(req,res) =>{
    Task.findOne({id:machineId},function(err,machine){
        if(err){
           console.log(err);
            res.send({error:err});  
        }
        else{
            console.log("found machine");
            res.send(machine);
        }
            
        });
    
});

app.delete('/machine/:machineId', function(req,res) =>{

    Task.findOne({id:machineId},function(err,machine){
        if(err){
           console.log(err);
            res.send({error:err});  
        }
        else{
            console.log("found machine");
            Machine.deleteOne({id:machineId}, function (err) {
            if{ 
            console.log(err);
            res.send({error:err});
            }
            else{
                //handle unmonitoring of machine
                console.log("disconnected machine");
            }
        });
            res.send(machine);
        }
            
        });

});

//server -> iiot server
app.get('/machine/monitor/:machineId',function(req,res,next){
    
   
});

app.get('/machine/unMonitor/:machineId',function(req,res,next){
    
});

//server -> auxilary
app.post('/slice/:taskId',function(req,res,next){
   
});

//socketio routes
socket.on("connection", socket => { 
    console.log("connected");
    
    
    socket.on("monitor",(data,res) => {
        socket.emit("new-client", socket.id, () => {
            console.log("New Consumer has joined " + data + " stream");
        });
    });
    socket.on("init-iiot-endpoint",(data,res) => {
        iiotendpoint[data] = socket;
        
        
    });
    socket.on("available",(data,res) => {
        
        
    });
    socket.on("busy",(data,res) => {
        
        
    });
    
    socket.on("getIiotData",(data,res) => {
       iiotendpoint[data.roomid].emit('getIiotdata');
       
        
    });
});


//module.exports = app;
httpServer.listen(port)
