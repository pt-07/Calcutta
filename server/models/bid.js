const mongoose = require('mongoose');
const Schema = mongoose.Schema

const BidSchema = new Schema({
    bid: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        default: "OnlyBid"
    }
});

const Bid = mongoose.model('bid', BidSchema)

module.exports = Bid;