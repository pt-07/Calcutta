const { MongoClient } = require("mongodb"); // allows us to connect to

let dbConnection;
let uri =
  "mongodb+srv://jloverde:7P1ECq7Q2SbZ1n0Y@cluster0.bhwgpkr.mongodb.net/";
// connects to the atlas database
module.exports = {
  // async task
  connectToDb: (cb) => {
    MongoClient.connect(uri)
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
