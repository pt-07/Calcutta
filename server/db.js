const { MongoClient } = require("mongodb");

uri = "mongodb+srv://jloverde:fuckyou123@cluster0.bhwgpkr.mongodb.net/";

module.exports = {
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
