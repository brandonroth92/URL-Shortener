var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var mongoUrl = process.env.MONGOLAB_URI;
var db; 

//Connects to MongoDB and returns database in global variable
exports.connect = function(callback) {
  MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/URLmicroservice', function(err, database) {
    if (err) { throw new Error('database failed to connect: ' + err) };
    db = database;
    callback();
  });
};

//Adds doc to collection and returns doc for response
exports.addAndReturn = function(callback, url) {
  var min = 1000;
  var max = 9999;
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  var newURL = 'https://brandonr-shorturl.herokuapp.com/' + num;
  var doc = {original_url: url, "short_url": newURL};
  
  var collection = db.collection('shorturl');
  
  collection.insert(doc, function(err, result) {
    if (err) throw err;
  });
    
  collection.find( { short_url: newURL }, { _id: 0, original_url: 1, short_url: 1 } ).toArray(function(err, result) {
    if (err) { 
      throw err;
    } else {
      callback(result[0]);
    }
  });
};

//Queries collection for doc and returns for redirect
exports.queryAndReturn = function(callback, shortURL) {
  var collection = db.collection('shorturl');
  
  collection.find( { short_url: shortURL }, { _id: 0, original_url: 1 }).toArray(function(err, result) {
    if (err) {
      throw err;
    } else {
      callback(result[0]);
    }
  });
};