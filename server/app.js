const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

const express = require('express');
const app = express();
const port = process.env.PORT || 4000
const cookieParser = require('cookie-parser');

// database connection
require('./db/conn');
//  
// const User = require('./models/schema');

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}



// middleware
// const auth = (res, req, next)=>{
//     console.log(`hello from middleware`);
//     next();
// };
app.use(cookieParser());
app.use(express.json());

// we link the touter files to make on router
app.use(require('./route/router'));


// server start
app.listen(port,()=>{
    console.log(`Server Started(${port})`);
});