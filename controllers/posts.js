const express   = require('express');
const router    = express.Router();
const Post = require('../models/posts');
const User = require('../models/users')
const Comment = require('../models/comments')

const isLogged = (req,res,next) =>{
    if (!req.session.logged){
        res.redirect("/")
    } else {
        next()
    }
}


router.get('/', async (req,res) => {
    
    try{
        const foundPosts = await Post.find({}).populate('author');
        res.render('posts/index.ejs', {
            posts: foundPosts,
            message: req.session.message,
            user: req.session,

        })
    } catch(err){
        res.send(err)
    };
});

router.get('/new',isLogged, async (req, res) => {
    try{
        res.render('posts/new.ejs', {
            user: req.session
        });
    
    }  catch(err){
        res.send(err)
    };
});

router.post('/', isLogged, (req, res) => {
    req.body.author = req.session.user
    if(req.body.bearishCheckBox==='on'){
        req.body.bearishCheckBox = true;
        } else {
        req.body.bearishCheckBox = false;
    }
    Post.create(req.body, (err, foundPosts) => {
        if(err){
            res.send(err);
        } else {
            const makeSlug = foundPosts.body.slice(0, 150)
            const titleString = foundPosts.title
            const makeKebab = titleString.replace(/[^0-9a-zA-Z ]/g, '_').replace(/ /g, '-');
            foundPosts.kebabTitle = makeKebab;
            foundPosts.slug = makeSlug
            User.findById(req.body.author._id, (err, foundUser) => {
                foundUser.posts.push(foundPosts)
                foundPosts.author = foundUser;
                foundPosts.save();
                foundUser.save((err, savedUser) => {
                    res.redirect('/posts')
                })
            })
            
        }
    })
});
router.post('/:id', async (req, res)=>{
    try {
        req.body.author = req.session.user
        
        const commentCreate = await Comment.create(req.body)
        
        const findGuy = await User.findById(req.body.author._id)
        
        findGuy.comments.push(commentCreate)
        commentCreate.createdBy = findGuy
        findGuy.save()
        const findPost = await Post.findById(req.params.id)
        findPost.comments.push(commentCreate);
        findPost.save()

        res.redirect(`/posts/${findPost.kebabTitle}#comment`)
        
    } catch(err){
        res.send(err)
    }
})

router.get('/')
router.get('/:kebabtitle', async (req,res) => {
    try{
       
        const foundPosts = await Post.findOne({kebabTitle: req.params.kebabtitle}).populate('author').populate({
            path: 'comments.createdBy',
            model: 'User'
        })

        res.render('posts/show.ejs', {
            showPost: foundPosts,
            userId: req.session.userID
        })
    } catch(err){
        res.send(err)
    }
})
    
router.delete('/:id', async (req, res) => {

    try {

        const deletedPost = await Post.findOneAndDelete({_id: req.params.id});
        
        res.redirect('/posts');
        
    } catch(err){
        res.send(err)
    }

});

    module.exports = router;
