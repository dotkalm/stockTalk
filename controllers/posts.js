const Post = require('../models/posts');
const User = require('../models/users')
const mongoose = require('mongoose');

router.get('/'), async (req,res) => {
    try{
        const foundPosts = await Post.find({}).populate('author');
        console.log(foundPosts, '<--------')
        res.render('photos/index.ejs', {
            posts: foundPosts
        })
    } catch(err){
        res.send(err)
    }

}
    
module.exports = router;