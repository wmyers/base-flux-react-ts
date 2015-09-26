var BBPromise = require('bluebird');
var crypto = require('crypto');
var querystring = require('query-string');

var self = {
  getAvatarUrl: function(email, params) {
    var baseUrl = 'http://www.gravatar.com/avatar/';
    var qs = '';
    if(params){
      qs = "?" + querystring.stringify(params);
    }
    return baseUrl + crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex') + qs;
  },
  getAvatarUrlAsync: function(email, params) {
    return new BBPromise(function(resolve, reject){
      resolve(self.getAvatarUrl(email, params));
    })
  }
};

module.exports = self;
