const express           = require('express');
const bodyParser        = require('body-parser');
const methodOverride    = require('method-override');
const session           = require('express-session');
const app               = express();


require('./db/db');
// require our controller, Which is the router object
const commentsController    = require('./controllers/comments');
const postsController       = require('./controllers/posts');
const usersController       = require('./controllers/users');


app.use(session({
    secret: 'SUE!, WHERE ARE YOU?!',
    resave: false,
    saveUninitialized: false

}));
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));

// app.use('/comments', commentsController);
app.use('/posts', postsController);
app.use('/users', usersController);

app.get('/', (req, res) => {
    res.render('index.ejs', {
        message: req.session.message,
        user: req.session,
        onlineUser: req.session.logged
    });
});

app.listen(8080, () => {
    console.log('listening on port 8080');
});