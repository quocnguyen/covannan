var argsList = require('args-list');
var isFunction = require('lodash.isFunction');

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

  return covannan;
}