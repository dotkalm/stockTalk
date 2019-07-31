const express   = require('express');
const router    = express.Router();
const Post = require('../models/posts');
const User = require('../models/users');
const bcrypt    = require('bcryptjs');

router.get('/', async (req,res) => {
    try{
        const foundUsers = await User.find({})
        .populate('posts');
        console.log(foundUsers, '<------ found users')
        res.render('users/index.ejs', {
            user: req.session,
            users: foundUsers
        })
    } catch(err){
        res.send(err);
    };
})
router.post('/login', async (req, res) =>{
    try {
        const foundUser = await User.findOne({username: req.body.username});
        // console.log(foundUser, ' foundUser');
    if(foundUser){
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
            req.session.userID = foundUser._id;
            req.session.username = foundUser.username;
            req.session.logged = true;
            req.session.user = foundUser
            res.redirect('/posts')


        } else {

            req.session.message = "Username or Password incorrect";
            res.redirect('/');
        }
        } else {
            req.session.message = "Username or Password incorrect";
            res.redirect('/')
    }
    } catch (err){
        res.send(err);
    }
});

router.get('/register', async (req, res) => {
    
    try {
        res.render('users/register.ejs')
    } catch(err){
        res.send(err)
    }
    
});

router.post('/register', async (req, res) => {

    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    req.body.password = hashedPassword;
    try {
        const createdUser = await User.create(req.body);
        // console.log(createdUser, 'created user');
        req.session.userId = createdUser._id;
        req.session.username = createdUser.username;
        req.session.logged = true;
        req.session.user = createdUser
        console.log(req.session)
        res.redirect('/');
    } catch (err){
        // console.log(err)
        res.send(err)
    }
});

router.get('/logout', (req, res) => {
    console.log('hitting the LOGOUT ROUTE')
    req.session.destroy((err) => {
        console.log('i am hitting this route')
        if(err){
            res.send(err);
        } else {
            res.redirect('/'); 
        }
    })
})



router.get('/:id', async (req,res) => {
    try{
        const foundUser = await User.findById(req.params.id).populate('posts');
        res.render('users/show.ejs', {
            user: req.session,
            showUser: foundUser
        })
    } catch(err){
        res.send(err)
    }
})

module.exports = router;