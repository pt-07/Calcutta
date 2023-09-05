const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RoomSchema = new Schema({
    // array to show the names 
    names: {
        type: Array
    },
    //array to show the current team
    teams: {
        type: Array
    },
    teamResult : {
        type: Map
    }

});

const Room = mongoose.model('room', RoomSchema)

module.exports = Room;