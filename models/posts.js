const mongoose = require('mongoose');
const Comment = require('../models/comments');

const postSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    kebabTitle: String,
    body: String,
    slug: String,
    comments : ['Comment'],
    bearishCheckBox : Boolean,
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    timeStamp: { type: Date, default: Date.now}
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post