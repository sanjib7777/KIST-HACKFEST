const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    },
    Picture: {
        type: String,
        default: 'default.jpg'
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message'
    }],
    urls: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'url'
    }],
    points: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('user', userSchema);
