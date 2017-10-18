var db = require('./db.js');

var contexts = [];

const ApiManager = exports = module.exports = {
  contexts,
  bind: (socket) => {
    var routes = require(process.cwd() + '/api/routes.js');
    var context = {socket, db: db.bind(ApiManager, context)};
    
    ApiManager.contexts.push(context);

    socket.on('action', (actionGroup, action, ...args) => {
      routes[actionGroup][action].call(ApiManager, context, ...args);
    });

    socket.on('disconnect', function() {
      Object.keys(routes).map(k => 'disconnect' in routes[k] ? routes[k].disconnect.call(ApiManager, context) : null);
      const index = ApiManager.contexts.indexOf(context);
      if (index >= 0) {
        ApiManager.contexts.splice(index, 1);
      }
    });

    setTimeout(() => {
      Object.keys(routes).map(k => 'connect' in routes[k] ? routes[k].connect.call(ApiManager, context) : null);
    }, 10);
  }
};
