
# covannan

covannan is dead simple constructor injection that know how to load dependencies for you.

## Installation

```
npm install covannan
```
## Example

```js
/* app.js */
var covannan = require('covannan')();

// you can set value as a string, object, array
covannan.set('rootPath', __dirname);

// or set value as a function
// sugar: no need to thinking about dependencies here.
covannan.set('user', require('./lib/user'));
covannan.set('auth', require('./lib/auth'));


/* .lib/user/index.js */
module.exports = function (auth) {
  // here in our user module, we depend on auth
  // convannan will inject auth module for us 
  auth.login();
}

// .lib/auth/index.js
module.exports = function () {
  return {
    login: function() { /* do login */ }
  }
}

```

## Usage
```js
covannan.set(name, value);
covannan.get(name);
```
## Constructor Injection
if value is a function, covannan will auto resolve dependencies and passing them to contructor as arguments.

```js
covannan.set('cal.add', function(a,b) { return a+b });
covannan.set('a', 1);
covannan.set('b', 2);

covannan.get('cal.add'); // 3 
```

# License