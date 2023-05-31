const mongoose = require('mongoose');

const TransactionShema = mongoose.Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

    places: [{
        type: Schema.Types.ObjectId,
        ref: "Place"
    }],

    date: {
        type: String,
        default: Date.now()
    },
})

const Transaction = mongoose.model('Transaction', TransactionShema);

module.exports = Transaction;