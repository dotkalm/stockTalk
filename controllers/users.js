const express   = require('express');
const router    = express.Router();
const User      = require('../models/users');
const bcrypt    = require('bcryptjs');

router.post('login', async (req, res) =>{

    try {
        const foundUser = await User.findOne({username: req.body.username});
        console.log(foundUser, ' foundUser');


    if(foundUser){

        if(bcrypt.compareSync(req.body.password, foundUser.password)){
            req.session.userID = foundUser._id;
            req.session.username = foundUser.username;
            req.session.logged = true;

            res.redirect('/models')

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



//router.post('/register', async (req))