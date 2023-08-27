const mongoose = require('mongoose');
const Schema = mongoose.Schema

const BidSchema = new Schema({
    bid: {
        type: Number
    }
});

const Bid = mongoose.model('bid', BidSchema)

module.exports = Bid;