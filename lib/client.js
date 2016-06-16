var request = require('client-request')

function Client (options) {
  /* las options se reciben solo en los test*/
  this.options = options || {}
  this.endpoint = this.options.endpoint || 'http://api.tvmaze.com'
}

Client.prototype.shows = function (cb) {
  var uri = this.endpoint + '/shows'

  request({
    uri: uri,
    method: 'GET',
    json: true
  }, function (err, res, body) {
    if (err) return cb(err)

    if (res.statusCode !== 200) return cb(new Error('An error ocurred in the request'))

    cb(null, body)
  })
}

module.exports = Client
