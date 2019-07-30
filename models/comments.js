
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    body: String,
    bearish: Boolean,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    timeStamp: { type: Date, default: Date.now}
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment 