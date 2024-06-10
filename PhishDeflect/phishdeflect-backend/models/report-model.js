const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({

  status: {
    type: String,
    required: true,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
    },
    
    message: {
        type: String,
        required: true,
        max: 1024
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    url:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'url'
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('report', reportSchema);
