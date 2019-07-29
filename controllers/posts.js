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
    req.body.author = req.session.user
    Post.create(req.body, (err, foundPosts) => {
        if(err){
            res.send(err);
        } else {
            User.findById(req.body.author._id, (err, foundUser) => {
                foundUser.posts.push(foundPosts)
                foundPosts.author = foundUser;
                foundPosts.save();
                foundUser.save((err, savedUser) => {
                    res.redirect('/posts')
                })
            })
            console.log(foundPosts, 'created a post');
            
        }
    })
});

router.get('/:id', async (req,res) => {
    try{
        const foundPosts = await Post.findById(req.params.id).populate('author').populate('comments');
        res.render('posts/show.ejs', {
            showPost: foundPosts
        })
    } catch(err){
        res.send(err)
    }
})
    
    module.exports = router;
