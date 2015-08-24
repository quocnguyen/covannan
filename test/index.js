
var assert = require('assert');
var covannan = require('..')();

describe('covannan', function(){
  it('should able to set value', function(){
    covannan.set('foo', 'bar');
    assert.equal(covannan.get('foo'), 'bar');
  });

  it('should auto inject dependencies', function(){
    covannan.set('add', function(a, b){
      return a+b;
    });

    covannan.set('a', 1);
    covannan.set('b', 2);

    assert.equal(covannan.get('add'), 3);
  });

  it('throw exception if dependency missing', function(){
    covannan.set('magic', function(god){
      return god.makeMagicHappend();
    });
    assert.throws(function(){
      covannan.get('magic');
    }, Error);
  })
});