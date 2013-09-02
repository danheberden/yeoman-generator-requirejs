'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var AppGenerator = module.exports = function AppGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.options = options || {};

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AppGenerator, yeoman.generators.NamedBase);

AppGenerator.prototype.askFor = function askFor() {

  var cb = this.async();

  // welcome message
  var welcome =
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |' + chalk.red('--(o)--') + '|   .--------------------------.' +
  '\n   `---------´  |    ' + chalk.yellow.bold('Welcome to Yeoman') + ',    |' +
  '\n    ' + chalk.yellow('(') + ' _' + chalk.yellow('´U`') + '_ ' + chalk.yellow(')') + '   |   ' + chalk.yellow.bold('ladies and gentlemen!') + '  |' +  '\n    /___A___\\   \'__________________________\'' +
  '\n     ' + chalk.yellow('|  ~  |') +
  '\n   __' + chalk.yellow('\'.___.\'') + '__' +
  '\n ´   ' + chalk.red('`  |') + '° ' + chalk.red('´ Y') + ' `\n';

  console.log(welcome);
  console.log('This comes with requirejs, jquery, and grunt all ready to go');

  if (this.options.promptDefaults) {
     this.appname = this.options.promptDefaults.appname;
     this.appdescription = this.options.promptDefaults.appdescription;
     cb();
     return;
   }

  var prompts = [{
    name: 'appname',
    message: 'What is the name of your app?',
    default: this.appname
  }, {
    name: 'appdescription',
    message: 'Description:',
    default: 'An awesome requirejs app'
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.appname = props.appname;
    this.appdescription = props.appdescription;


    cb();
  }.bind(this));
};

AppGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

AppGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

AppGenerator.prototype.bower = function bower() {
  this.template('_bower.json', 'bower.json');
};

AppGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
};

AppGenerator.prototype.configs = function jshint() {
  this.copy('jshintrc', '.jshintrc');
  this.copy('editorconfig', '.editorconfig');
}

AppGenerator.prototype.docs = function docs() {
  this.copy('CONTRIBUTING.md', 'CONTRIBUTING.md');
  this.template('README.md', 'README.md');
};

AppGenerator.prototype.app = function app() {
  this.directory('app', 'app');
  this.directory('test', 'test');
  this.template('index.htm', 'index.htm');
};
