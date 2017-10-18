const fs = require('fs');
const path = require('path');
const VirtualModulePlugin = require('virtual-module-webpack-plugin');
const handlebars = require('handlebars');

var actionsSource = fs.readFileSync(path.join(__dirname, '../templates/serve/actions.jsx.hbs'), 'utf-8');
var actionsTemplate = handlebars.compile(actionsSource);
var reducersSource = fs.readFileSync(path.join(__dirname, '../templates/serve/reducers.jsx.hbs'), 'utf-8');
var reducersTemplate = handlebars.compile(reducersSource);

function RiversPlugin(options) {
}

RiversPlugin.prototype.apply = function(compiler) {
  var routes = require(process.cwd() + '/api/routes.js');
  var actionsFile = new VirtualModulePlugin({
    moduleName: './ui/actions.jsx',
    contents: actionsTemplate({routes})
  });
  var reducersFile = new VirtualModulePlugin({
    moduleName: './ui/reducers.jsx',
    contents: reducersTemplate({routes})
  });
  actionsFile.apply(compiler);
  reducersFile.apply(compiler);
};

module.exports = RiversPlugin;
