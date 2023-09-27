const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Ninja = require("./models/ninja");
const Bid = require("./models/bid");
const Team = require("./models/team");
const BidTeam = require("./models/bidTeam");

let db;

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://jloverde:fuckyou123@cluster0.bhwgpkr.mongodb.net/"
);

// connects to data base
connectToDb((err) => {
  if (!err) {
    app.listen(5000, () => {
      console.log("server started on port 5000");
    });
    db = getDb();
  } else {
    console.log("error connecting");
  }
});

// Working posting bid funciton
app.post("/bids", function (req, res, next) {
  const { name, bid } = req.body;

  const newBid = new Bid({
    name,
    bid,
  });

  newBid
    .save()
    .then(function (createdBid) {
      res.status(201).send(createdBid);
    })
    .catch(next);
});

// delets all the bids in the database
app.delete("/bids", function (req, res, next) {
  Bid.deleteMany({})
    .then(function () {
      res.status(200).send("All bids have been cleared.");
    })
    .catch(next);
});

// take it out of the array
app.put("/teams/:id", (req, res) => {
  Team.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (
    team
  ) {
    res.send(team);
  });
});

app.get("/teams", (req, res) => {
  db.collection("teams")
    .findOne({})
    .then((doc) => {
      res.status(200).json(doc);
    });
});

// creates the array of teams in MongoDB
app.post("/teams", (req, res) => {
  const teams = req.body.teams; // assuming the request body has a 'teams' property
  db.collection("teams")
    .insertMany(teams) // Use insertMany for an array of teams
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "could not create new documents" });
    });
});

app.post("/bidTeam", function (req, res, next) {
  BidTeam.create(req.body)
    .then(function (bidteam) {
      res.send(bidteam);
    })
    .catch(next);
});

//putting bids, will change bid if there and will create bid if not there

app.put("/bids/:name", function (req, res, next) {
  console.log("Received PUT request for bid:", req.params.name);
  const bidName = req.params.name;
  Bid.findOneAndUpdate({ name: bidName }, req.body, { new: true })
    .then(function (bid) {
      res.send(bid);
    })
    .catch(next);
});

//get the highest bid (currently just gets each bid document from the collection)

app.get("/getBid", function (req, res, next) {
  Bid.find({ name: "OnlyBid" }).then(function (bid) {
    res.send(bid);
  });
});
// retrieving names from database

app.get("/getNinjas", function (req, res, next) {
  let ret = [];
  db.collection("ninjas")
    .find()
    .forEach((ninja) => ret.push(ninja))
    .then(() => {
      res.status(200).json(ret);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch documents" });
    });
});

//posting names to DB
app.post("/ninjas", function (req, res, next) {
  Ninja.create(req.body)
    .then(function (ninja) {
      res.send(ninja);
    })
    .catch(next);
});

//error handling middlewear (tutorial stuff)
app.use(function (err, req, res, next) {
  console.log(err);
  res.send({ error: err.message });
});
