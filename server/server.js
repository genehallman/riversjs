var URL = require('url');
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime-types');
var handlebars = require('handlebars');
var socketio = require('socket.io');
var express = require('express');
var sslRedirect = require('heroku-ssl-redirect');
var webpack = require('webpack');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");

var ApiManager = require('./api_manager.js');

var serve = exports = module.exports = function() {
  var project_name = path.basename(process.cwd());
  var htmlPageSource = fs.readFileSync(path.join(__dirname, '../templates/serve/index.html.hbs'), 'utf-8');
  var htmlPageTemplate = handlebars.compile(htmlPageSource);
  var htmlPageRes = new Buffer(htmlPageTemplate({project_name}));
  var webpackConfig = require(path.join(process.cwd(), 'webpack.config.js'));
  var compiler = webpack(webpackConfig);
  var app = express();

  if (process.env.NODE_ENV != 'production') {

    // development
    app.use(webpackDevMiddleware(compiler, {
      publicPath: "/static/js/",
      stats: {colors: true}
    }));
    app.use(webpackHotMiddleware(compiler, {
      'log': console.log,
      'path': '/__webpack_hmr',
      'heartbeat': 2000
    }));
    app.use('/static', express.static(path.join(process.cwd(), 'static')));

  } else {

    // production
    app.use(sslRedirect());
    app.use(express.static(path.join(process.cwd(), 'build')));

  }
  app.use(function (req, res, next) {
    console.log(req.url);
    var mt = mime.lookup(req.url);
    if ((mt === false || mt == "text/html") && req.accepts('html')) {
      res.set('Content-Type', 'text/html');
      res.send(htmlPageRes);
    } else {
      res.status(404);
      res.end();
    }
  });

  var server = http.createServer(app);
  var port = process.env.PORT || 8081;

  var io = socketio({}).listen(server);
  io.on('connection', ApiManager.bind);

  console.log("Running on port:", port);
  console.log("Socket Url:", process.env.SOCKET_URL || "<default>");
  server.listen(port);
}

serve();