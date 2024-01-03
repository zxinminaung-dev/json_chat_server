// passport-config.js
require('dotenv').config()
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const {findByUserId} = require('../database/json.database')
const secretKey = process.env.APP_SECRET; // Replace with your secret key

const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
};

module.exports = passport=>passport.use(   
    new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
        try {
            var user= await findByUserId(jwtPayload.sub);
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