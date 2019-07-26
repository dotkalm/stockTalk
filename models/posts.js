const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: String,
    comments : [Comment],
    bearish : true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post