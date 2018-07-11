//imports strategy object from the passport-JWT library.
const JwtStrategy = require('passport-jwt').Strategy;

/*This object is the one that reads the header from the HTTP Requests and parses it in such a way that we can request
some of the fields contained in the header object.
 */
const ExtractJwt = require('passport-jwt').ExtractJwt;

/*Since we are going to be checking that the data contained in the header has a correspondence with the database, we
also import the incumbent objects that will allow us to verify that information.
 */
const mongoose = require('mongoose');
const User = mongoose.model('users');

//import the secret keyword to decrypt the token.
const keys = require('./keys');

/*
The validation process requires to receive both the token and the secret key but they should be contained in a single
object with a particular format. Therefore we create the opts object. It will contain two fields jwtFromRequest and
secretOrKey. We can see that the first value contains the token that we extracted from the header by using the
ExtractJwt object; and the second value has the secret key contained in our keys.js file.
 */
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if(user) { return done(null, user); }
                    return done(null, false);
                }).catch(err => console.log(err));
        })
    );
};