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
        //console.log(foundPosts, '<--------')
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
            User.findById(req.body.author._id, (err, foundUser) => {
                foundUser.posts.push(foundPosts)
                console.log(req.body)
                //foundUser.bearish.push(foundPosts)
                foundPosts.author = foundUser;
                foundPosts.save();
                foundUser.save((err, savedUser) => {
                    res.redirect('/posts')
                })
            })
            // console.log(foundPosts, 'created a post');
            
        }
    })
});
router.post('/:id', async (req, res)=>{
    try {
        req.body.author = req.session.user
        console.log('1')
        const commentCreate = await Comment.create(req.body)
        console.log(req.body, '<----- REQ BODY')
        const findGuy = await User.findById(req.body.author._id)
        console.log('3')
        findGuy.comments.push(commentCreate)
        commentCreate.createdBy = findGuy
        findGuy.save()
        const findPost = await Post.findById(req.params.id)
        findPost.comments.push(commentCreate);
        // findPost.createdBy = req.session.user.username
        findPost.save()

        console.log('#############################')
        console.log(req.body, '<----------REQ.BODY')
        console.log('#############################')
        console.log(findPost.comments, '<----------findpost')
        res.redirect(`/posts/${req.params.id}`)
        
    } catch(err){
        res.send(err)
    }
})
    // Comment.create(req.body, (err, createdComment)=>{
    //     if(err){
    //         res.send(err);
    //     } else {
            
            // res.redirect(`/posts/${req.params.id}`);
            // Post.findById(req.body.postId, (err, foundPosts) =>{
            //     console.log(foundPosts, '<--- foundPost in comment create route')
            //     foundPosts.comments.push(createdComment);
            //     foundPosts.save((err, savedComment ) => {
            //         console.log(savedPost, 'this is savedPost');
                    
            //     });
            // });
//         }
//     });
// });
router.get('/:id', async (req,res) => {
    try{
        const foundPosts = await Post.findById(req.params.id).populate('author').populate({
            path: 'comments.createdBy',
            model: 'User'
        })
        console.log(foundPosts)
        res.render('posts/show.ejs', {
            showPost: foundPosts
        })
    } catch(err){
        console.log(err)
    }
})
    
    module.exports = router;
