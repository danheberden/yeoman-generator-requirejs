'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var fs = require('fs');

var AppGenerator = module.exports = function AppGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.hookFor('requirejs', {
    as: 'app', 
    options: { 
      options: {
        'skip-install': true,
        promptDefaults: {
          appname: 'my-weather-app',
          appdescription: 'A `yo requirejs` demo app'
        }
      },
    } 
  });

  this.on('end', function () {
    fs.createReadStream(this._sourceRoot + '/index.htm').pipe(fs.createWriteStream(this.env.cwd + '/index.htm'));
    fs.createReadStream(this._sourceRoot + '/main.js').pipe(fs.createWriteStream(this.env.cwd + '/app/main.js'));  
    this.bowerInstall([
      'weather'
    ], { 
      save: true 
    }, function(){});

    this.installDependencies({ skipInstall: false });
  });

  var count = 0;
  var done = function(paths) {
    if ( count < 2 ) {
      count++;
      return;
    }
    console.log(['', '', '', 'Used `yo requirejs` to build a sample application and ',
    'populated index.html and app/main.js for you. All you',
    'need to do is `grunt preview` and open up',
    'http://localhost:8000 to see it in action. <3z'].join('\n'));
  };
  this.on('npmInstall:end', done);
  this.on('bowerInstall:end', done);
    
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AppGenerator, yeoman.generators.NamedBase);
