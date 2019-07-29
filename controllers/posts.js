const express   = require('express');
const router    = express.Router();
const Post = require('../models/posts');
const User = require('../models/users')


router.get('/', async (req,res) => {
    
    try{
        const foundPosts = await Post.find({}).populate('author');
        console.log(foundPosts, '<--------')
        res.render('posts/index.ejs', {
            posts: foundPosts,
            message: req.session.message,
            user: req.session
        })
    } catch(err){
        res.send(err)
    };
});

router.get('/new', async (req, res) => {
    try{
        res.render('posts/new.ejs', {
            user: req.session
        });
    
    }  catch(err){
        res.send(err)
    };
});

router.post('/', (req, res) => {
    
    Post.create(req.body, (err, foundPosts) => {
        if(err){
            res.send(err);
        } else {
            console.log(foundPosts, 'created a post');
            res.redirect('/posts', {
                user: req.session
            })
        }
    })
});
     
    
    module.exports = router;
