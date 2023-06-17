const express = require('express');

const port = 8089;

const app = express();

const db = require('./config/mongodb');

app.use(express.urlencoded());

const passport = require('passport');
const pass_mid = require('./config/passport-jwt-strategy');
const session = require('express-session');

app.use(session({
    name : 'admin',
    secret : 'api',
    saveUninitialized : false,
    resave : false,
    cookie:{
        maxAge : 100*100*60
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/adminroter'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    else{
        console.log("server is running in port:",port);
    }
})