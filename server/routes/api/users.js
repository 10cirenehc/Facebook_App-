

const express = require('express');
const router = express.Router();

//deals with avatar for the user
const gravatar = require('gravatar');
//encrypt data
const bcrypt = require('bcryptjs');

/*load user model. The .. goes up one level in the directory. Goes up two levels to routes and accesses models
then User
 */
const User = require ('../../models/User');

//import passport
const passport = require ('passport');

//Load keys
const keys = require ('../../config/keys');

//Web token
const jwt = require ('jsonwebtoken');

//validation
const validateLoginInput = require('../../validation/login');
const validateRegisterInput = require ('../../validation/register');

router.get('/test', (req,res) => res.json({msg: "Users Works!"}));

// @route GET api/users/login
// @desc Login User / return JMT token
// @access Public

router.post ('/login', (req,res) => {
    const { errors, isValid } = validateLoginInput(req.body);
// Check Validation
    if(!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    //Find user by email

    User.findOne({ email: email})
        .then (user => {
            //Check for user
            if (!user) {
                return res.status(404).json({errors: 'User not found'});
            }
            //Check password
            bcrypt.compare (password, user.password)
                .then (isMatch =>{
                    if (isMatch) {

                        /*The payload is the section of the token that will hold the piece of data that we will be
                        using back an forth between the client and the server to keep the user authenticated.
                         */
                        const payload = {id: user.id, name: user.name, avatar: user.avatar};

                        //sign
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    //Have to add Bearer keyword because it lets system know what type of validation process
                                    token: 'Bearer ' + token
                                });
                            });
                    }
                    else {
                        errors.password = 'Password Invalid';
                        return res.status(400).json(errors);
                    }
                });
        });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session:false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

// @route GET api/users/register
// @desc Register a user
// @access Public

//(req, res) are parameters for function and => signals start of function.
router.post('/register', (req,res) => {

    const {errors, isValid} = validateRegisterInput(req.body);

    if (!isValid){
        return res.status(400).json(errors);
    }
    //We have access to method findOne because of mongoose, finding one match.
    User.findOne ({ email: req.body.email})
    //If it is successful (.then) Very good way of managing events. It is a promise to run the code encapsulated.
        .then(user => {
            if(user){
                //Telling the browser whether it is successful. Returning status 400. The number is specific.
                //Include JSON string email already exists in the response.
                return res.status(400).json({ email: 'Email already exists'});
            }
            else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // size of image
                    r: 'pg', //rating
                    d: 'mm' //  default image
                    // the avatar variable will have the url of the image of avatar.
                });

                //creating new User obbject
                const newUser = new User({
                    //getting these fields from the body of the request.
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password

                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {

                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))

                    })
                });
            }
        });
});

module.exports = router;

