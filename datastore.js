const mongoose = require('mongoose');
//const passportLocalMongoose = require('passport-local-mongoose');
mongoose.connect('mongodb://localhost:27017/app', {useNewUrlParser: true, useUnifiedTopology: true});

function primer()
{
    IdStore.create({id:1000},function (err, small) {
  if (err) return handleError(err); else console.log(small);});
    //UserDetails.register({username:"user1",active:false},"user1");
    User.create({username:"user1",password:"user1"}, function (err, small) {
  if (err) return handleError(err); else console.log(small);});
    Person.create({username:"user1",personname:"",admin:false}, function (err, small) {
  if (err) return handleError(err); else console.log(small);});
    //UserDetails.register({username:"admin",active:false},"admin");
    User.create({username:"admin",password:"admin"}, function (err, small) {
  if (err) return handleError(err); else console.log(small);});
    Person.create({username:"admin",personname:"",admin:true}, function (err, small) {
  if (err) return handleError(err); else console.log(small);});
    
    Machine.create({id:"machine1",name:"machine1",type:"FDM",material:"PLA",url:"http://192.168.0.1:5000"}, function (err, small) {
  if (err) return handleError(err); else console.log(small);});
    
    Task.create({id:"task1",name:"task1",owner:"user1",type:"FDM",material:"PLA",infill:40,model:"./test1.stl",state:"pending"}, function (err, small) {
  if (err) return handleError(err); else console.log(small);});
}
console.log("init");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
});

const IdStoreSchema = new Schema({
    id: Number,
});
const PersonSchema = new Schema({
    username: String,
    personname: String,
    admin: Boolean,
});
// Export Model
//User.plugin(passportLocalMongoose);

const MachineSchema = new Schema({
    id: String,
    name: String,
    type: String,
    material: String,
    url: String,
});

const TaskSchema = new Schema({
    id: String,
    name: String,
    owner: String,
    type: String,
    material: String,
    infill: Number,
    model: String,
    state: String,
});
console.log("schema");
User = mongoose.model('User', UserSchema, 'Users');
Person = mongoose.model('Person', PersonSchema, 'persons');
Machine = mongoose.model('Machine', MachineSchema, 'machines');
Task = mongoose.model('Task', TaskSchema, 'tasks');
IdStore = mongoose.model('IdStore', IdStoreSchema, 'idstore');


//console.log("primer");
//primer();
console.log("finish");
module.exports = User;
module.exports = Person;
module.exports = Machine;
module.exports = Task;
