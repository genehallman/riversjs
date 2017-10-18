const MongoClient = require('mongodb').MongoClient;
const hash = require('object-hash');

// Connection URL
const url = 'mongodb://localhost:27017/foo';
var db = null;
var subscriptions = {};

MongoClient.connect(url, (err, _db) => { db = err ? null : _db });

const DB = exports = module.exports = (context, collectionName) => ({
  find: (query, projection) => {
    return db.collection(collectionName).find(query, projection);
  },
  subscribe: (query, projection) => {
    subscriptions[hash(query)] = context;
    return DB.find(query, projection);
  },
  insert: (docs) => {
    return db.collection(collectionName).insert(docs);
  },
  update: (filter, updateOps) => {
    return db.collection(collectionName).updateMany(filter, updateOps);
  },
  delete: (filter) => {
    return db.collection(collectionName).deleteMany(filter);
  }

});