const express   = require('express');
const router    = express.Router();
const Post = require('../models/posts');
const User = require('../models/users')


router.get('/', async (req,res) => {
    
    try{
        const foundPosts = await Post.find({}).populate('author');
        console.log(foundPosts, '<--------')
        res.render('posts/index.ejs', {
            posts: foundPosts
        })
    } catch(err){
        res.send(err)
    }

})
    
module.exports = router;