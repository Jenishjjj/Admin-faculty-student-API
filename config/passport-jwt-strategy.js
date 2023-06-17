const passport = require('passport');
const Admin = require('../model/Admin');
const faculty = require('../model/Faculty');
const jwtStrategy = require('passport-jwt').Strategy;

const ExtractStrategy = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest : ExtractStrategy.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'jj'
}

passport.use(new jwtStrategy(opts,async (user,done)=>{
    let data =await Admin.findOne({email:user.data.email});
    if(data){
        if(data.password == user.data.password){
            return done(null,data);
        }
        else{
            return done(null,false);
        }
    }
    else{
        return done(null,false);
    }
}))

passport.use('faculty',new jwtStrategy(opts,async (user,done)=>{
    let data = await faculty.findOne({email:user.data.email});
    if(data){
        if(data.password == user.data.password){
            return done(null,data);
        }
        else{
            return done(null,false);
        }
    }
    else{
        return done(null,false);
    }
}))

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser(async (id,done)=>{
    let data = await Admin.findById(id);
    if(data){
        return done(null,data);
    }
    else{
        let facultyData = await faculty.findById(id);
        if(facultyData){
            return done(null,facultyData);
        }
        else{
            done(null,false);
        }
    }
})

passport.setUseraAuthenticate = (req,res,next)=>{
    if(req.isAuthenticate()){
        if(req.user.role=='Admin'){
            req.locals.admin=req.user;
        }
        else{
            req.locals.faculty=req.user;
        }
    }
}

module.exports = passport;