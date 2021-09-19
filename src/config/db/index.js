const mongoose = require('mongoose');


async function connect(){
    try{
    await mongoose.connect('mongodb://localhost:27017/f8fullstack', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  
    });
    console.log('Connection success fully!!!');
    }
    catch(error){
        console.log("Connection faile:");
    }
    
}   
module.exports = { connect };