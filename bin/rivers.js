#!/usr/bin/env node
var generate = require('../scripts/generate.js');
var serve = require('../scripts/serve.js');
var commands = {generate, serve};
var argv = require('optimist').argv;
var command = argv._.shift();

var res = commands[command](...argv._);
