var express = require('express');
var cors = require('cors');
var router = express.Router();
//var dataStore = require('./datastore');
//var iotGateway = require('./iotgateway');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Printer App' });
});

router.post('/addPrinter',function(req,res,next){
    console.log("received request to add printer:" + req.printer-id);
    
    const options = {
        hostname: req.link,
        port: req.port,
        path: '/connect',
        method: 'GET'}
        
    const req = https.request(options, res => {
    
        res.on('data', d => {
        
            
        });
    });
});

router.get('/monitor/{id}',function(req,res,next){
    
    
    
});
/*router.get('/request', function(req,res,next){
    console.log("received");
    res.send([{id:"15",name:"z",attributes:[{attributeName:"print-task-name",attributeType:"static",attributeValue:"taks1"},
                                                    {attributeName:"estimated-time",attributeType:"dynamic",attributeValue:"20"}]},
                        {id:"13",name:"tevo",attributes:[{attributeName:"print-task-name",attributeType:"static",attributeValue:"taks1"},
                                                              {attributeName:"estimated-time",attributeType:"dynamic",attributeValue:"50"}]}]
);
})

router.get('/request/{id}',function(req,res,next){

})

router.post('/createRequest',function(req,res,next){
    var task = req.body;
    console.log(task);
    res.send("");
    
})

router.post('/request/{id}/formRequest',function(req,res,next){

    
})

router.get('/machines',function(req,res,next){
    console.log("received1");
    res.send([{id:"12",name:"horse",attributes:[{attributeName:"printer-id",attributeType:"static",attributeValue:"printer1"},
                                                          {attributeName:"estimated-time",attributeType:"dynamic",attributeValue:"20"}]},
                              {id:"13",name:"ship",attributes:[{attributeName:"printer-id",attributeType:"static",attributeValue:"printer2"},
                                                                    {attributeName:"estimated-time",attributeType:"dynamic",attributeValue:"50"}]}]
        );
})

router.get('/machine/{id}',function(req,res,next){

})

router.get('/machine/{id}/{attributeName}',function(req,res,next){

    
})

router.post('/addMachine',function(req,res,next){

    
})

router.delete('/removeMachine/{id}',function(req,res,next){

    
})
*/


module.exports = router;
