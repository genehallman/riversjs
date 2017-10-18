var dev = require('node-dev');
var minimist = require('minimist');

function getFirstNonOptionArgIndex(args) {
  for (var i = 2; i < args.length; i++) {
    if (args[i][0] != '-') return i;
  }
  return args.length;
}

function removeValueArgs(args, names) {
  var i = 0;
  var removed = [];
  while (i < args.length) {
    if (~names.indexOf(args[i])) {
      removed = removed.concat(args.splice(i, 2));
    } else {
      i++;
    }
  }
  return removed;
}


var serve = exports = module.exports = function() {
  var nodeArgs = []; // removeValueArgs(process.argv, ['-r', '--require']);

  var scriptIndex = getFirstNonOptionArgIndex(process.argv);
  var script = __dirname + "/../server/server.js";
  var scriptArgs = []; // process.argv.slice(scriptIndex + 1);
  var devArgs = []; //process.argv.slice(2, scriptIndex);

  var opts = minimist(devArgs, {
    boolean: ['all-deps', 'deps', 'dedupe', 'poll', 'respawn', 'notify'],
    string:  ['graceful_ipc'],
    default: { deps: true, notify: true, graceful_ipc: "" },
    unknown: function (arg) {
      nodeArgs.push(arg);
    }
  });

  dev(script, scriptArgs, nodeArgs, opts);
}