// Do not expose your credentials in your code.
let atlasDB = "mongodb+srv://aainswo2:082302!@aaronainsworthcomp229.pkm792d.mongodb.net/carstore?retryWrites=true&w=majority";

// Database setup
let mongoose = require('mongoose');

module.exports = function(){

    mongoose.connect(atlasDB);
    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error:'));
    mongodb.once('open', ()=>{
        console.log('===> Connected to MongoDB.');
    })

    return mongodb;
}