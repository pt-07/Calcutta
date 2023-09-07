const mongoose = require('mongoose');
const Schema = mongoose.Schema

const TeamSchema = new Schema({
    // array to show the names 
    team: {
        type: String
    }
});

const Team = mongoose.model('team', TeamSchema)

module.exports = Team;