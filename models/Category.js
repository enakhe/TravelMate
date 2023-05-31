const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now(),
    }
})


const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;