'use strict';

var constant = function(_)
{
  return function(){return _;};
};

var _config = {};

var config = {
  get: function(key) {
    var args = (arguments.length === 1?
                [arguments[0]]:
                Array.apply(null, arguments));
    if (_config[key] !== void 0) {
      return _config[key].apply(this, args.slice(1));
    }
    return void 0;
  },
  set: function(key, _) {
    if (typeof _ === 'function') {
      _config[key] = _;
    }
    else {
      if (_ == null) {
        delete _config[key];
      }
      else {
        _config[key] = constant(_);
      }
    }
    return this;
  }
};

config.set('token', process.env.SLACK_API_TOKEN || function() {
  throw new Error('Slack token is not set!');
});

try
{
  var f = require('./.config.json');
  Object.keys(f).forEach(function(d)
  {
    config.set(d, f[d]);
  });
  config.file = '.config.json';
}
catch (e)
{
  delete config.file;
}
module.exports = config;
