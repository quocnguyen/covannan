var argsList = require('args-list');
var isFunction = require('lodash.isFunction');
var glob = require('glob');
var path = require('path');

module.exports = function() {
  var deps = [];
  var covannan = {};

  covannan.set = function(name, value) {
    deps[name] = value;
  }

  covannan.get = function(name) {
    if ( ! deps[name]) {
      throw new Error(name + ' was missing');
    }

    if (isFunction(deps[name])) {
      return covannan.inject(deps[name]);
    }

    return deps[name];
  }

  covannan.inject = function(fn) {
    var args = argsList(fn)
      .map(function(dependency){
        return covannan.get(dependency);
      });
      return fn.apply(null, args);
  }

  covannan.autoload = function(pattern, options) {
    var files = glob.sync(pattern, {
      realpath: true,
      cwd: process.env.NODE_PATH || path.dirname(module.parent.filename)
    });

    files.forEach(function(file){
      var name = path.basename(file, path.extname(file));
      if ( name === 'index') {
        name = path.dirname(file).split(path.sep).pop();
      }

      covannan.set(name, require(file));
    });
  }

  return covannan;
}
