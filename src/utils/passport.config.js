// passport-config.js
require('dotenv').config()
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const userService = require('../services/user.service')


const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.APP_SECRET,
};

module.exports = passport=>passport.use(   
    new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
        try {
            var user= await userService.FindById(jwtPayload.sub);
            if(user){
                return done(null, user);
            }
            else{
                return done(null,false)
            }
        } catch (error) {
            return done(error, false);
        }
    })
);