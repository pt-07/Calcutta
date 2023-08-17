
const{MongoClient} = require('mongodb')

uri = "mongodb+srv://pjt07016:MyWisc2025@cluster0.ev8tzxu.mongodb.net/"

module.exports= {
    connectToDb: (cb) =>{
        MongoClient.connect(uri)
        .then((client) => {
            dbConnection = client.db()
            return cb()
        })
        .catch(err =>{
            console.log(err)
            return cb(err)
        })
    },
    getDb:() => dbConnection
}