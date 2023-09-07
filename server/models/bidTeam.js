const mongoose = require('mongoose');
const Schema = mongoose.Schema

const BidTeamSchema = new Schema({
    team:{
        type: String
    },
    bid:{
        type: Number
    }
})

const BidTeam = mongoose.model('bidteam', BidTeamSchema)

module.exports = BidTeam;