
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    body: String,
    bearish: Boolean,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment 