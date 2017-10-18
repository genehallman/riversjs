var fs = require('fs');
var path = require('path');
var handlebars = require('handlebars');
var cp = require('child_process');

var fs = require('fs');
var path = require('path');

var dirs = [
  '',
  '/api/',
  '/ui/',
  '/ui/scss/',
  '/ui/components/',
  '/static/',
  '/static/images/'

];

var templates = [
  'api_routes.js.hbs',
  'api_messages.js.hbs',
  'ui_app.jsx.hbs',
  'ui_scss_style.scss.hbs',
  'package.json.hbs',
  '.babelrc.hbs',
  'webpack.config.js.hbs',
  'README.md.hbs',
  '.gitignore.hbs'
];


var generate = exports = module.exports = function (project_name) {
  if (!project_name) {
    throw new Error('Project name must be specified');
  }
  var data = { project_name };
  
  dirs.forEach(d => fs.mkdirSync(project_name + d));
  
  templates.forEach(t => {
    var source = fs.readFileSync(__dirname + '/../templates/generate/' + t, 'utf-8');
    var template = handlebars.compile(source);
    var res = template(data);
    fs.writeFileSync(project_name + '/' + t.replace(/_/g,'/').replace(/\.hbs$/, ''), res, 'utf-8');
  });
  
  fs.readdirSync(__dirname + '/../templates/generate/images').forEach(i => {
    fs.writeFileSync(project_name+'/static/images/'+i, fs.readFileSync(__dirname + '/../templates/generate/images/' + i));
  })


  cp.spawn('npm', ['i'], { env: process.env, cwd: './'+project_name+'/', stdio: 'inherit' });
  cp.spawn('npm', ['link', 'rivers'], { env: process.env, cwd: './'+project_name+'/', stdio: 'inherit' });

};
