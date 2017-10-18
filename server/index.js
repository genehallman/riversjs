const Users = require('./api/users');
const Permissions = require('./api/permissions');
// const ServeHtml = require('./api/serveHtml');
const WebpackPlugin = require('./plugin');
const ApiManager = require('./api_manager');
const ObjectID = require('mongodb').ObjectID;

exports = module.exports = {
  api: {
    Users,
    Permissions
    // ServeHtml
  },
  ObjectID,
  WebpackPlugin,
  ApiManager
}