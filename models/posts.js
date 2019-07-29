const mongoose = require('mongoose');
const Comment = require('../models/comments');

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: String,
    comments : ['Comment'],
    bearish : Boolean,
    // author:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post