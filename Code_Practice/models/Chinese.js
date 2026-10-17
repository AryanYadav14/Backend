const mongoose = require('mongoose');

const dishName = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Spicy: {
        type: String,
        required: true,
        enum: ['less', 'moderate', 'very spicy']
    },
    price: {
        type: Number,
        required: true
    }
});

const Chinese = mongoose.model('Chinese', dishName);

module.exports = Chinese;