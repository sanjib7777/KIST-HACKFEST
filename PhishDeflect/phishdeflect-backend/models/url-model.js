const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        enum: ['predict', 'report'],
        required: true
    },
    result: {
        type: String,
        enum: ['phishing', 'not-phishing','accepted','rejected','pending'],
    }
});

module.exports = mongoose.model('url', urlSchema);
