const express   = require('express');
const router    = express.Router();
const User      = require('../models/users');
const bcrypt    = require('bcryptjs');

router.get('/', (req,res) => {
    console.log('--------------------------')
    console.log('--------------------------')
    console.log('--------------------------')
    console.log('--------------------------')
    console.log('--------------------------')
    console.log('--------------------------')
    res.render('users/index.ejs', {
        
    });
})
router.post('/login', async (req, res) =>{
    try {
        const foundUser = await User.findOne({username: req.body.username});
        console.log(foundUser, ' foundUser');
    if(foundUser){
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
            req.session.userID = foundUser._id;
            req.session.username = foundUser.username;
            req.session.logged = true;
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

router.post('/register', async (req, res) => {
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    console.log(hashedPassword)
    req.body.password = hashedPassword;
    try {
        const createdUser = await User.create(req.body);
        console.log(createdUser, 'created user');
        req.session.userId = createUser._id;
        req.session.username = createdUser.username;
        req.session.logged = true;
        res.redirect('/');
    } catch (err){
        res.send(err)
    }
});



module.exports = router;