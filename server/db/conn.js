const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config({path:'./config.env'});


// database connetion from online
const DB = process.env.DB_NAME;
// databas connection from offline
// const DB = process.env.DB_NAME_OFFLINE;

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log(`Database connected`)
}).catch((err)=> console.log(`No connection`));