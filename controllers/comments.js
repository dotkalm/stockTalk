const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
const User = require('../models/users');
const Comment = require('../models/comments')

router.get('/', (req, res) =>{
    console.log(req.session, ' req.session in index or article')
    Comment.find({}, (err, found))
});

router.post('/', (req, res)=>{
    Comment.create(req.body, (err, createdComment)=>{
        if(err){
            res.send(err);
        } else {
            console.log(req.body)
            Post.findById(req.body.postId, (err, foundPosts) =>{
                console.log(foundPosts, '<--- foundPost in comment create route')
                foundPosts.comments.push(createdComment);
                foundPosts.save((err, savedComment ) => {
                    console.log(savedPost, 'this is savedPost');
                    res.redirect('/posts');
                });
            });
        }
    });
});

module.exports = router
