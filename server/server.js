const { ObjectId } = require('mongodb')
const {connectToDb, getDb} = require('./db')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');
const Ninja = require('./models/ninja')
const Bid = require('./models/bid')
const Room = require('./models/room')

let db 

app.use(cors());

app.use(bodyParser.json());
app.use(express.json())

mongoose.connect( "mongodb+srv://pjt07016:MyWisc2025@cluster0.ev8tzxu.mongodb.net/")

connectToDb((err)=>{
    if(!err){
        app.listen(5000, () => {console.log("server started on port 5000")})
        db = getDb()
    }
    else{
        console.log("error connecting")
    }
})



app.post('/books', (req, res) =>{
    const book = req.body
    db.collection('books')
      .insertOne(book)
      .then(result =>{
        res.status(201).json(result)
      })
      .catch(err => {
        res.status(500).json({err : 'could not create new document'})
      })
})


//sending bids 

app.put('/bids/:id', function(req, res, next){

    Bid.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(bid){
        res.send(bid)
    });
});


//get the highest bid

app.get('/getBid', function(req,res,next){
    let ret = []
    db.collection('bids')
        .find()
        .forEach(bid => ret.push(bid))
        .then(() =>{
            res.status(200).json(ret)
        })
        .catch(()=>{
            res.status(500).json({error: 'Could not fetch'})
        })
})
//retrieving names from database

app.get('/getNinjas', function(req,res, next){
    let ret = []
    db.collection('ninjas')
        .find()
        .forEach(ninja => ret.push(ninja))
        .then(() =>{
            res.status(200).json(ret)
        })
        .catch(() =>{
            res.status(500).json({error : 'Could not fetch documents'})
        })
})

//posting names to DB
app.post('/ninjas', function(req, res, next){
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja)
    }).catch(next); 
});

//error handling middlewear
app.use(function(err, req, res, next){
    console.log(err)
    res.send({error: err.message})
});

