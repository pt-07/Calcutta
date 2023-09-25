const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SecondBidSchema = new Schema({
  bid: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    default: "OnlyBid",
  },
});

const SecondBid = mongoose.model("bid", SecondBidSchema);

module.exports = SecondBid;
