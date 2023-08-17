const { ObjectId } = require('mongodb')
const {connectToDb, getDb} = require('./db')
const express = require('express')
const app = express()

let db 
app.use(express.json())
connectToDb((err)=>{
    if(!err){
        app.listen(5000, () => {console.log("server started on port 5000")})
        db = getDb()
    }
    else{
        console.log("error connecting")
    }
})


app.get('/api', (req, res) => {
    db.collection('books')
    .find() //cursor 
    res.json({mssg: "hello"})
} )

app.get('names/:id', (req, res) => {
    req.params.id
    db.collection('books')
     .findOne({_id: ObjectId(req.params.id)})
     .then(doc =>{
        res.status(200).json(doc)
     })
     .catch(err=>{
        res.status(500).json({error: 'could not fetch document'})
     })
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