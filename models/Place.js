const mongoose = require('mongoose');

const PlaceShema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    }
});

const Place = mongoose.model('Place', PlaceShema);

module.exports = Place;