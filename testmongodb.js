var dbClient = require('mongodb').MongoClient;
console.log('--> mongoClient : ', dbClient);
var assert = require('assert');
var url = 'mongodb://localhost:27017/gretajs'; // Connection URL
// Use connect method to connect to the server
dbClient.connect(url, { useNewUrlParser: true },
 function(err, client) {
 assert.equal(null, err);
 console.log("Successfully connected to server");
 global.db = client.db('gretajs');
 console.log('global.db : ' , global.db);
 client.close();
});