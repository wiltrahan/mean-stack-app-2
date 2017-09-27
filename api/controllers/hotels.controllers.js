var dbconn = require("../data/dbconnection.js");
var ObjectId = require('mongodb').ObjectId;
var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {

  var db = dbconn.get();
  var collection = db.collection('hotels');

  var offset = 0;
  var count = 5;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  collection
    .find()
    .skip(offset)
    .limit(count)
    .toArray(function(err, docs) {
      console.log("Found Hotels", docs);
      res
        .status(200)
        .json(docs);
    });
};

module.exports.hotelsGetOne = function(req, res) {
  var db = dbconn.get();
  var collection = db.collection('hotels');

  var hotelId = req.params.hotelId;
  console.log('GET hotelId', hotelId);

  collection
    .findOne({
      _id : ObjectId(hotelId)
    }, function(err, doc) {
      res
        .status(200)
        .json( doc );
    });
};

module.exports.hotelsAddOne = function(req, res) {
  console.log("POST new hotel");
  var db = dbconn.get();
  var collection = db.collection('hotels');
  var newHotel;

  res
    .status(200)
    .json(req.body);
};
