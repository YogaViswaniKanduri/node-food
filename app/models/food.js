var mongoose = require('mongoose');

module.exports = mongoose.model('Food', {
    foodname: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: ''
    }
});