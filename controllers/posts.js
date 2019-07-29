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

    // router.post('/', await (req, res) {
    //     console.log(req.body, 'req.body')
    //     Post.create(req.body, (err, foundPosts) )
    // })
     
    
    module.exports = router;
