const express = require('express');
const router = express.Router();

const passport = require ('passport');

const jwt = require ('jsonwebtoken');

const Post = require ('../../models/Post')

const validatePostsInput = require('../../validation/posts');

router.post('/', (req,res) => {
    const {errors, isValid} = validatePostsInput (req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save()
        .then(post => res.json(post));
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if(post.user.toString() !== req.user.id){
                return res.status(401).json({ notauthorized : 'User not authorized'});
            }
            else{
                post.delete();
                return res.json('Success');
            }
                })
        .catch(err => res.status(404).json(err));
});

router.post('/like/:id', passport.authenticate('jwt', {session :false}), (req,res) => {
    Post.findById(req.params.id)
        .then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({ alreadyliked: 'User already liked this post.'})
            }
            else{
                // Add the user id to the likes array
                post.likes.unshift({ user: req.user.id });
                post.save()
                    .then(post => res.json(post));
            }
        })
});

router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req,res) => {
    Post.findById(req.params.id)
        .then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                return res.sttus(400).json({ notliked: 'User has no yet liked this post.'})
            }
            else{
                // Get remove index
                const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
// slice out of array
                post.likes.splice(removeIndex, 1);
            }
            post.save()
                .then(post => res.json(post));
        })
});

router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req,res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
        .then(post => {
            if(!post) {
                errors.noprofile = 'There is no post with that id';
                res.status(404).json(errors);
            }
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            };

            // Add to comments array
            post.comments.unshift(newComment);

            // Save
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
});


router.delete('/comment/:id/:comment_id',
    passport.authenticate('jwt', { session: false }),
    (req,res) => {
        Post.findById(req.params.id)
            .then(post => {
                if(!post) {
                    errors.noprofile = 'There is no post with that id';
                    res.status(404).json(errors);
                }
                // Check if comment exists
                if(post.comments.filter(comment =>
                    comment._id.toString() === req.params.comment_id).length === 0){
                    return res.status(404).json({ commennotexists: 'Comment does not exist'});
                }
                // Get remove index
                const removeIndex = post.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id);

                // Splice it out of array
                post.comments.splice(removeIndex, 1);

                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });


router.get('/test', (req,res) => res.json({msg: "Post Works!"}));

//Get all posts sorted by date.
router.get('/' , (req,res) => {
    Post.find().sort({ date: -1 });
});

//find posts by id.
router.get('/:id', (req,res) => {
    Post.findById(req.params.id);
});




module.exports = router;

