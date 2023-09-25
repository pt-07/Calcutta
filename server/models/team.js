const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  team: {
    type: Number,
    default: "None",
  },
});

const Team = mongoose.model("team", TeamSchema);

module.exports = Team;
