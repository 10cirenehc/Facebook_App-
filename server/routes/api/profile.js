const express = require('express');
const router = express.Router();

const passport = require ('passport');

const jwt = require ('jsonwebtoken');


const Profile = require('../../models/Profile');
const User = require('../../models/Profile');

const validateProfileInput = require('../../validation/profile');

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if(!isValid) {
        return res.status(400).json(errors);
    }
    //Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.highschool) profileFields.highschool = req.body.highschool;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    // Social
    profileFields.social ={};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            console.log("entered")
            if(profile) {
                //Update
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    {new: true}
                ).then(profile => res.json(profile));
            } else {
                //Create

                // Check if handle exists
                Profile.findOne({ handle: profileFields.handle })
                    .then(profile => {
                        if(profile) {
                            errors.handle = 'That handle already exists';
                            res.status(400).json(errors);
                        }

                        //Save Profile
                        new Profile(profileFields).save()
                            .then(profile => res.json(profile));
                    })
            }
        });
});

router.delete ('/', passport.authenticate('jwt' , {session:false}), (req,res) => {
    Profile.findOneAndRemove({ user: req.user_id})
        .then(()=> {
            // After removing the profile, I also delete the user object
            User.findOneAndRemove({user : req.user.id})
                .then(() => res.json({ success: true }))
                .catch(err => res.status(404).json(err));
        })
        .catch(err => res.status(404).json(err));
});


//@route GET api/profile/handle/:handle
//@desc  get profile by handle
//@access Public
router.get('/handle/:handle', (req, res) => {

    const errors = {};

    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

//@route  GET api/profile
//@desc return the profile of the logged in user
//@access Public
router.get('/', passport.authenticate('jwt', { session:false }),(req,res) => {
    const errors = {};

    Profile.findOne({ user : req.user.id })
        .then(profile => {
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err));
});

router.get('/test', (req,res) => res.json({msg: "Profile Works!"}));

router.get('/user/:user_id' , (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.params.user_id })
    .then(profile => {
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
        }
        res.json(profile)
    })
    .catch(err => res.status(404).json(err));
});

router.get('/all' , (req,res) => {
    Profile.find()
    .then(profile=> {
        res.json(profile)
    })
});




module.exports = router;

