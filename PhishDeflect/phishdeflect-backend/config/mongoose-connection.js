const mongoose = require('mongoose');  
// const dbgr = require('debug')('development:mongoose'); 


mongoose.connect('mongodb+srv://phishdeflect:phishdeflect123@cluster0.ehm9qy6.mongodb.net/phishdeflect')
.then(function(){
    // dbgr("connected")
    console.log("connected")    
})
.catch(function(err){
    // dbgr(err);
    console.log(err)
})
module.exports = mongoose.connection