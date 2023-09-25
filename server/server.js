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
const SecondBid = require("./models/bidTeam");

let db;

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());
try {
  mongoose.connect(
    "mongodb+srv://jloverde:fuckyou123@cluster0.bhwgpkr.mongodb.net/"
  );
} catch (err) {
  console.log("hi");
}

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

//updates team to remove the team that is currently being bidded on from the array (NOT WORKING)
app.put("/teams/:id", (req, res) => {
  Team.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (
    team
  ) {
    res.send(team);
  });
});

app.get("/getTeamId", (req, res) => {
  db.collection("teams")
    .findOne({}) // find any document
    .then((doc) => {
      res.status(200).json(doc);
    });
});

//gets the array of teams to choose a random one
app.get("/teams", (req, res) => {
  db.collection("teams")
    .findOne({}) // find any document
    .then((doc) => {
      res.status(200).json(doc);
    });
});

//initially adds all the teams
app.post("/teams", (req, res) => {
  const teams = req.body;
  db.collection("teams")
    .insertOne(teams)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "could not create new document" });
    });
});

//no longer being used
app.post("/bidTeam", function (req, res, next) {
  BidTeam.create(req.body)
    .then(function (bidteam) {
      res.send(bidteam);
    })
    .catch(next);
});

//sending bids
//IN USE sends bids, updates bids
app.put("/bids/:id", function (req, res, next) {
  Bid.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (bid) {
    res.send(bid);
  });
});

//gets the only bid in the collection
app.get("/getBid", function (req, res, next) {
  Bid.find({ name: "OnlyBid" }).then(function (bid) {
    res.send(bid);
  });
});
//retrieving names from database

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

//error handling middlewear
app.use(function (err, req, res, next) {
  console.log(err);
  res.send({ error: err.message });
});
